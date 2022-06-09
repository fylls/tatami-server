// dependencies
import { stringToId, checkEnv, getDbName } from "./utils"
import dotenv from "dotenv"

const GAME_ARRAY = [
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

const AFFILIATE_ARRAY = ["tatami", "e-girl", "streamer", "youtuber", "admin"]

const LANGUAGE_ARRAY = [
	"italian",
	"english",
	"spanish",
	"french",
	"portuguese",
	"german",
	"arabic",
]

// get all environment variables
dotenv.config()
const PORT = process.env.PORT ?? 6969
const NODE_ENV = process.env.NODE_ENV ?? ""
const LIVE_URI = process.env.LIVE_URI ?? ""
const TEST_URI = process.env.TEST_URI ?? ""
const LIVE_KEY = process.env.LIVE_KEY ?? ""
const TEST_KEY = process.env.TEST_KEY ?? ""

// check environment
checkEnv(PORT, NODE_ENV, LIVE_URI, TEST_URI, LIVE_KEY, TEST_KEY)
const MONGO_URI = NODE_ENV === "live" ? LIVE_URI : TEST_URI
const STRIPE_KEY = NODE_ENV === "live" ? LIVE_KEY : TEST_KEY

const MAX_STUDENTS = 20

const BASE_COACH = stringToId("62851068aea6ae0fc120f0c9") //TODO to remove

const DB_NAME = getDbName(MONGO_URI)

export {
	MAX_STUDENTS,
	BASE_COACH,
	GAME_ARRAY,
	AFFILIATE_ARRAY,
	LANGUAGE_ARRAY,
	NODE_ENV,
	MONGO_URI,
	DB_NAME,
	STRIPE_KEY,
	PORT,
}
