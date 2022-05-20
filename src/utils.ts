import mongoose from "mongoose"
import { Influencer } from "./models/_database"

// translate string to mongodb "ObjectId" type
const stringToId = (str: string): mongoose.Types.ObjectId => {
	return new mongoose.Types.ObjectId(str)
}

// make sure emails string is formatted correctly
const checkMail = (email: string): boolean => {
	let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	return email.match(re) ? true : false
}

// if the referral code is still valid it returns true, otherwise it returns false
const checkReferral = async (code: string): Promise<boolean> => {
	const isValid = await Influencer.findOne({ code }) // influencer object
	return isValid ? true : false
}

// return discount related to referral code. returns 0 if no discount
const getDiscount = async (code: string): Promise<number> => {
	const influencer = await Influencer.findOne({ code })
	if (!influencer) return 0
	else return influencer.discount
}

// returns how much student has to pay. It cost less with a valid referral code
const getAmount = async (cost: number, code: string): Promise<number> => {
	const discount = await getDiscount(code)
	if (discount === 0) return cost
	else return cost - cost * discount
}

// used by stripe
// https://stripe.com/docs/payments/accept-a-payment-synchronously?html-or-react=react
const stripeResponse = (intent: any): any => {
	if (
		intent.status === "requires_action" &&
		intent.next_action.type === "use_stripe_sdk"
	) {
		return {
			requires_action: true,
			payment_intent_client_secret: intent.client_secret,
		}
	} else if (intent.status === "succeeded") return { success: true }
	else return { error: "Invalid PaymentIntent status" }
}

export {
	checkMail,
	stringToId,
	checkReferral,
	getDiscount,
	getAmount,
	stripeResponse,
}
