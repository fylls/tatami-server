// dependencies
import mongoose from "mongoose"
import { MONGO_URI, DB_NAME } from "./utils/constants"

// opening
const connectDB = async () => {
	await mongoose.connect(MONGO_URI)
	console.log(`successfully connected to DB: ${DB_NAME}`)
}

// closing
const shoutDownDB = async () => {
	mongoose.connection.close(() =>
		console.log(`closing connection to DB: ${DB_NAME}`)
	)
}

export { connectDB, shoutDownDB }
