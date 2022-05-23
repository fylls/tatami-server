import { STRIPE_KEY } from "../../const"
import { Request, Response, Router } from "express"
import Stripe from "stripe"

const router = Router()
export default router

const stripe = new Stripe(STRIPE_KEY, { apiVersion: "2020-08-27" })

// Part 1: Simple express router to demo hosted onboarding
// this function creates an account and generates heir unique url for identification

/**
 *
 * @route       POST api.tatami.gg/stripe/buyCourse
 * @desc        handles payment in backend and saves
 * @access      public
 * @body        { payment_method_id, payment_intent_id, referral, name, email, courseID }
 *
 */

router.post("/onboardAffiliate", async (req, res) => {
	const data = req.body
	try {
		// 1: Create "blank" custom account

		// here you can fill what you have already collected
		const account = await stripe.accounts.create({
			type: "custom",
			email: "jenny.rosen@example.com", // influencer.email || ""
			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},
		})

		// 2: Create account link.
		const accountLink = await stripe.accountLinks.create({
			account: account.id,
			refresh_url: "https://example.com/reauth",
			return_url: "https://example.com/return",
			type: "account_onboarding",
			collect: "eventually_due",
		})

		res.send(accountLink)
	} catch (err) {
		console.log(err)
		res.status(400)
		res.send({ error: err })
		return
	}
})

// Part 2: Create custom account, add person to account
// "relationship.account_opener",
// "relationship.owner",
function now() {
	return Math.round(new Date().getTime() / 1000)
}

// router.post("/create-person", async (req, res) => {
// 	const data = req.body
// 	try {
// 		const person = await stripe.accounts.createPerson(data.account, {
// 			first_name: data.first_name,
// 			last_name: data.last_name,
// 			email: data.email,
// 			phone: data.phone,
// 			id_number: data.id_number,
// 			dob: {
// 				day: 1,
// 				month: 1,
// 				year: 1902,
// 			},
// 			address: {
// 				line1: data.line1,
// 				city: data.city,
// 				state: data.state,
// 				postal_code: data.postal_code,
// 			},
// 			relationship: {
// 				representative: data.representative,
// 				percent_ownership: data.percent_ownership,
// 				owner: data.owner,
// 				title: data.title,
// 			},
// 		})

// 		res.send(person)
// 	} catch (err) {
// 		console.log(err)
// 		res.status(400)
// 		res.send({ error: err })
// 		return
// 	}
// })

// router.post("/update-person-file", async (req, res) => {
// 	const data = req.body
// 	try {
// 		const person = await stripe.accounts.updatePerson(
// 			data.account,
// 			data.person,
// 			{
// 				verification: {
// 					document: {
// 						front: data.file,
// 					},
// 				},
// 			}
// 		)
// 		res.send(person)
// 	} catch (err) {
// 		console.log(err)
// 		res.status(400)
// 		res.send({ error: err })
// 		return
// 	}
// })
