import { Request, Response, Router } from "express"
import { validateEmail, getAmount, BASE_COACH } from "../utils"
import Student from "../models/Student"
import Influencer from "../models/Influencer"
import Course from "../models/Course"
import Cohort from "../models/Cohort"
import Stripe from "stripe"
import dotenv from "dotenv"

// environment
dotenv.config()

// express router
const router = Router()
export default router

// stripe
const SECRET_KEY = process.env.SECRET_KEY ?? ""
if (!SECRET_KEY) console.log("stripe key is missing")
const stripe = new Stripe(SECRET_KEY, { apiVersion: "2020-08-27" })

/**
 *
 * @route       POST api.tatami/stripe/course
 * @desc        handles payment in backend and saves
 * @access      public
 * @body        { referral, name, email, course_id }
 *
 */

router.post("/course", async (req: Request, res: Response) => {
	const { referral, name, email, course_id } = req.body

	// check if req.body is present
	if (!(name & email & course_id))
		return res.status(400).json("name, email or course_id is missing")

	// validate email format
	if (!validateEmail(email))
		return res.status(400).json("email is not formatter correctly")

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
		const course = await Course.findById(course_id)
		if (!course) return res.status(404).json("course not found")

		if (user && course) {
			// stripe handles the payment
			const paymentIntent = await stripe.paymentIntents.create({
				customer: user.id,
				receipt_email: email,
				amount: await getAmount(course.basePrice, referral),
				currency: "eur",
				automatic_payment_methods: { enabled: true },
			})

			/*========================================================================================*/
			// the following code executes IF & ONLY IF the payment goes through
			/*========================================================================================*/

			// searching for last cohort
			let last_cohort_id = course.cohorts[course.cohorts.length - 1]
			let last_cohort = await Cohort.findById(last_cohort_id)

			// check number of students in course
			const numberOfStudents = course.students.length

			// this code will execute if there is no cohort (E.G. first person that pays on website)
			if (!last_cohort) {
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
			if (last_cohort && numberOfStudents % 20 === 0) {
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
			if (last_cohort && numberOfStudents % 20 !== 0) {
				// check duplicates and add student to cohort
				if (!last_cohort.students.includes(user.id))
					last_cohort.students.push(user.id)

				// save cohort in DB
				await last_cohort.save()

				// check duplicates and add student to course
				if (!course.students.includes(user.id))
					course.students.push(user.id)

				// save course in DB
				await course.save()
			}

			// update last_cohort_id
			last_cohort_id = course.cohorts[course.cohorts.length - 1]

			// info object
			const infoObj = {
				cohort: last_cohort_id,
				referral: referral,
				watched: [],
				updated_at: new Date(),
			}

			// check duplicate and add info to student
			const index = user.info
				.map(x => x.cohort.valueOf())
				.indexOf(last_cohort_id)
			if (!index) user.info.push(infoObj)

			// save student in DB
			await user.save()

			// find influencer (has to exist since it has been checked before)
			const i = await Influencer.findOne({ code: referral })

			// update influencer, check for duplicate
			if (i && !i.students.includes(user.id)) {
				i.students.push(user.id)
				i.amountOwed = i.amountOwed + course.basePrice * i.cut
				await i.save()
			}

			res.send({ clientSecret: paymentIntent.client_secret })
		}
	} catch (err) {
		console.log(err)
	}
})
