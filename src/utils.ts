import mongoose from "mongoose"

const MAX_VIRGINS = 20

//TODO  put this in DB
const referralArray = [
	"taverna",
	"influencer1",
	"influencer2",
	"influencer3",
	"influencer4",
]

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

function stringToId(str: string): any {
	const id = new mongoose.Types.ObjectId(str)
	return id
}

function validateEmail(email: string): boolean {
	let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	if (email.match(re)) return true
	else return false
}

export { gameArray, referralArray, validateEmail, stringToId, MAX_VIRGINS }
