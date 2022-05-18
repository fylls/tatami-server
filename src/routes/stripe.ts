import { Request, Response, Router } from "express"
import Student from "../models/Student"
import Course from "../models/Course"
import Stripe from "stripe"

// TODO fixa sto schifo

// express router (app)
const router = Router()

// stripe
const SECRET_KEY = process.env.SECRET_KEY ?? ""
if (!SECRET_KEY) console.log("stripe key is missing")
const stripe = new Stripe(SECRET_KEY, { apiVersion: "2020-08-27" })

// all tatami offers
const getAmount = (item: string): number => {
	if (item === "bootcamp") return 4000 // 40€
	else return 0
}

// this functions handles the payment of 40€
router.post("/bootcamp", async (req: Request, res: Response) => {
	const { item, name, mail, bootcamp_id } = req.body

	// search for user
	let user = await Student.findOne({ email: mail })

	// user not found: create e new one
	if (!user) {
		const newUser = new Student({
			name: name,
			email: mail,
			bootcamps: [bootcamp_id],
		})
		await newUser.save()
	}

	// update
	user = await Student.findOne({ email: mail })

	if (user) {
		// search for bootcamp, check for its existence
		const bootcamp = await Bootcamp.findById(bootcamp_id)
		if (!bootcamp) return res.status(404).json("bootcamp not found")

		// user found: add bootcamp to user, check for duplicate
		if (!user.bootcamps.includes(bootcamp_id)) {
			user.bootcamps.unshift(bootcamp_id)
			await user.save()
		}

		// bootcamp found: add user to bootcamp, check for duplicate
		if (!bootcamp.students.includes(user.id)) {
			bootcamp.students.unshift(user.id)
			await bootcamp.save()
		}

		// stripe stuff
		const paymentIntent = await stripe.paymentIntents.create({
			customer: user.id,
			setup_future_usage: "off_session",
			amount: getAmount(item),
			currency: "eur",
			automatic_payment_methods: { enabled: true },
		})

		res.send({ clientSecret: paymentIntent.client_secret })
	}
})

export default router
