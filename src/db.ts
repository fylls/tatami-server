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

// closing
const shoutDownDB = async () => {
	mongoose.connection.close(() => console.log(`closing connection with DB `))
}

export { connectDB, shoutDownDB }
