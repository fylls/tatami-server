import mongoose from "mongoose"
import Influencer from "./models/Influencer"

// translate string to mongodb "ObjectId" type
const stringToId = (str: string): mongoose.Types.ObjectId => {
	return new mongoose.Types.ObjectId(str)
}

// make sure emails string is formatted correctly
const validateEmail = (email: string): boolean => {
	let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	return email.match(re) ? true : false
}

// if the referral code is still valid it returns true, otherwise it returns false
const validateReferral = async (code: string): Promise<boolean> => {
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

const MAX_VIRGINS = 20

const BASE_COACH = stringToId("62851068aea6ae0fc120f0c9")

const gameArray = [
	"valorant",
	"lol",
	"cs:go",
	"pubg",
	"rainbow6siege",
	"rocketLeague",
	"apex",
	"warzone",
	"fortnite",
	"dota2",
	"tf2",
	"sc2",
]

const influencerArray = [
	"tatami",
	"e-girl",
	"streamer",
	"youtuber",
	"discord-admin",
	"reddit-admin",
	"facebook-page",
	"instagram-page",
]

export {
	validateEmail,
	stringToId,
	validateReferral,
	getDiscount,
	getAmount,
	MAX_VIRGINS,
	BASE_COACH,
	gameArray,
	influencerArray,
}
