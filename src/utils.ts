import mongoose from "mongoose"
import { Influencer } from "./models/_database"

// check if 2 objects are equal between fields
const objEqual = (x: any, y: any): boolean => {
	return JSON.stringify(x) === JSON.stringify(y)
}

// translate string to mongodb "ObjectId" type
const stringToId = (str: string): mongoose.Types.ObjectId => {
	return new mongoose.Types.ObjectId(str)
}

// get database name
const getDbName = (uri: string): string => {
	return uri.substring(uri.lastIndexOf("/") + 1, uri.lastIndexOf("?"))
}

// make sure emails string is formatted correctly
const checkMail = (email: string): boolean => {
	let re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/
	return email.match(re) ? true : false
}

// if the referral code is still valid it returns true, otherwise it returns false
const checkReferral = async (code: string): Promise<boolean> => {
	const influencer = await Influencer.findOne({ code })
	if (influencer && influencer.isActive) return true
	return false
}

// return discount related to referral code. returns 0 if no discount
const getDiscount = async (code: string): Promise<number> => {
	const influencer = await Influencer.findOne({ code })
	if (influencer && influencer.isActive) return influencer.discount
	else return 0
}

// returns how much student has to pay. It cost less with a valid referral code
const getAmount = async (cost: number, code: string): Promise<number> => {
	const discount = await getDiscount(code)
	if (discount === 0) return cost
	else return Math.round(cost * (1 - discount))
}

// used by stripe (code at https://cutt.ly/stripedocs)
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

// returns in an array all the args of a function
// prettier-ignore
const getFunctionArgs = (func: any): string[] => {
	const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1]
	return args
		.split(",")
		.map( (arg: any) => { return arg.replace(/\/\*.*\*\//, "").trim()})
		.filter(function (arg: any) {return arg})
}

// check if all environment variables are defined
// TODO is there a more elegant way to implement it?
const checkEnv = (
	PORT: any,
	NODE_ENV: string,
	LIVE_URI: string,
	TEST_URI: string,
	LIVE_KEY: string,
	TEST_KEY: string
): void => {
	if (!(PORT && NODE_ENV && LIVE_URI && TEST_URI && LIVE_KEY && TEST_KEY)) {
		console.log("check your .env file!\n")
		if (!NODE_ENV) return console.log("NODE_ENV is missing\n")
		if (!LIVE_URI) console.log("LIVE_URI (mongo) is missing\n")
		if (!TEST_URI) console.log("TEST_URI (mongo) is missing\n")
		if (!LIVE_KEY) console.log("LIVE_KEY (stripe)is missing\n")
		if (!TEST_KEY) console.log("TEST_KEY (stripe) is missing\n")
		if (!PORT) console.log("PORT is missing\n")
	}
}

export {
	objEqual,
	checkEnv,
	getDbName,
	checkMail,
	stringToId,
	checkReferral,
	getDiscount,
	getAmount,
	stripeResponse,
}
