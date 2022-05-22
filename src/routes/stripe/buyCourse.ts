import { Student, Course, Influencer, Cohort } from "../../models/_database"
import { BASE_COACH, MAX_STUDENTS, STRIPE_KEY } from "../../const"
import { stripeResponse, checkMail, getAmount } from "../../utils"
import { Request, Response, Router } from "express"
import Stripe from "stripe"

// express router
const router = Router()

// stripe init
const stripe = new Stripe(STRIPE_KEY, { apiVersion: "2020-08-27" })

/**
 *
 * @route       POST api.tatami.gg/stripe/buyCourse
 * @desc        handles payment in backend and saves
 * @access      public
 * @body        { payment_method_id, payment_intent_id, referral, name, email, courseID }
 *
 */

router.post("/buyCourse", async (req: Request, res: Response) => {
	const {
		payment_method_id,
		payment_intent_id,
		referral,
		name,
		email,
		courseID,
	} = req.body

	// check if req.body is present
	// referral is optional and does not create problem if wrong
	if (!(name && email && courseID))
		return res.status(400).json("missing parameters")

	// validate email format
	if (!checkMail(email))
		return res.status(400).json("email is not formatter correctly")

	/*===================================================================*/

	try {
		// search for user
		let user = await Student.findOne({ email })

		// if user is not found: create e new one
		if (!user) {
			const newUser = new Student({ name, email, info: [] })
			await newUser.save()
		}

		// update user
		user = await Student.findOne({ email })

		// search for course
		const course = await Course.findById(courseID)
		if (!course) return res.status(404).json("course not found")

		/*===================================================================*/

		if (user && course) {
			let int // stripe handles the payment (https://cutt.ly/stripedocs)

			const customer = await stripe.customers.create({
				description: user.id,
				email: user.email,
				name: user.name,
			})

			if (payment_method_id) {
				int = await stripe.paymentIntents.create({
					customer: customer.id,
					payment_method: payment_method_id,
					amount: await getAmount(course.basePrice, referral),
					receipt_email: user.email,
					currency: "eur",
					confirmation_method: "manual",
					confirm: true,
				})
			} else if (payment_intent_id) {
				int = await stripe.paymentIntents.confirm(payment_intent_id)
			}

			/*========================================================================================*/
			// the following code executes IF & ONLY IF the payment goes through
			/*========================================================================================*/

			// searching for last cohort
			let lastCohortID = course.cohorts[course.cohorts.length - 1]
			let lastCohort = await Cohort.findById(lastCohortID)

			// check number of students in course
			const numberOfStudents = course.students.length

			// this code will execute if there is no cohort (E.G. first person that pays on website)
			if (!lastCohort) {
				// new cohort object
				const newCohort = new Cohort({
					edition: 1,
					course: course.id,
					mainTeacher: BASE_COACH, //TODO this has to be made dynamic
					students: [user.id],
					lectures: [],
				})

				// save cohort in DB
				await newCohort.save()

				// check duplicate and add cohort
				if (!course.cohorts.includes(newCohort.id))
					course.cohorts.push(newCohort.id)

				// check duplicates and add students
				if (!course.students.includes(user.id))
					course.students.push(user.id)

				// save course in DB
				await course.save()
			}

			// if too many students: create a new cohort
			if (lastCohort && numberOfStudents % MAX_STUDENTS === 0) {
				// new cohort object
				const newCohort = new Cohort({
					edition: course.currentCohort + 1,
					course: course.id,
					mainTeacher: BASE_COACH, //TODO this has to be made dynamic
					students: [user.id],
					lectures: [],
				})

				// save cohort in DB
				await newCohort.save()

				// check duplicate and add cohort
				if (!course.cohorts.includes(newCohort.id))
					course.cohorts.push(newCohort.id)

				// check duplicates and add students
				if (!course.students.includes(user.id))
					course.students.push(user.id)

				// update current cohort number
				course.currentCohort = course.currentCohort + 1

				// save course in DB
				await course.save()
			}

			// else : this cohort exist: you just need to add the student
			if (lastCohort && numberOfStudents % 20 !== 0) {
				// check duplicates and add student to cohort
				if (!lastCohort.students.includes(user.id))
					lastCohort.students.push(user.id)

				// save cohort in DB
				await lastCohort.save()

				// check duplicates and add student to course
				if (!course.students.includes(user.id))
					course.students.push(user.id)

				// save course in DB
				await course.save()
			}

			// update lastCohortID
			lastCohortID = course.cohorts[course.cohorts.length - 1]

			/*===================================================================*/

			// info object
			const infoObj = {
				cohort: lastCohortID,
				referral: referral,
				watched: [],
				updatedAt: new Date(),
			}

			// check duplicate and add info to student
			const index = user.info
				.map(x => x.cohort.valueOf())
				.indexOf(lastCohortID)
			if (!index) user.info.push(infoObj)

			// save student in DB
			await user.save()

			/*===================================================================*/

			// find influencer (has to exist since it has been checked before)
			const i = await Influencer.findOne({ code: referral })

			// update influencer, check for duplicate
			if (i && i.isActive && !i.students.includes(user.id)) {
				i.students.push(user.id)
				i.amountOwed += course.basePrice * i.cut
				i.totalRevenue += course.basePrice
				await i.save()
			}

			// return stripe confirmation to client
			return res.send(stripeResponse(int))
		}
	} catch (err: any) {
		console.log(err)
		return res.send({ error: err.message })
	}
})

export default router
