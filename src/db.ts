// dependencies
import mongoose from "mongoose"
import dotenv from "dotenv"

//TODO figure a way to put ONLY one dotenv, create a file with all the constants

// environment
dotenv.config()
const URI = process.env.MONGO_URI ?? ""
if (!URI) console.log("URI is missing")

// opening
const connectDB = async () => {
	await mongoose.connect(URI)
	console.log(`successfully connected to DATABASE`)
}

// closing
const shoutDownDB = async () => {
	mongoose.connection.close(() =>
		console.log(`closing connection with DATABASE `)
	)
}

export { connectDB, shoutDownDB }
