// dependencies
import mongoose from "mongoose"
import dotenv from "dotenv"

// environment
dotenv.config()
const NODE_ENV = process.env.NODE_ENV ?? ""
const URI = process.env.MONGO_URI ?? ""
if (!URI) console.log("URI is missing")

// opening
const connectDB = async () => await mongoose.connect(URI)
const DB_NAME = URI.substring(URI.lastIndexOf("/") + 1, URI.lastIndexOf("?"))

// closing
const shoutDownDB = async () => {
	mongoose.connection.close(() =>
		console.log(`closing connection with: ${DB_NAME} `)
	)
}

export { connectDB, shoutDownDB, DB_NAME }
