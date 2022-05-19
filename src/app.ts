// dependencies
import express, { Application, Request, Response, json } from "express"
import { connectDB } from "./db"
import dotenv from "dotenv"
import cors from "cors"

// init server
const app: Application = express()
const PORT = process.env.PORT || 3000

// server configs
dotenv.config()
app.use(cors())
app.use(json())

// home route
app.get("/", (req: Request, res: Response) => res.send("Tatami API endpoint"))

// routes
import stripeRoute from "./routes/stripe"
import checkReferralRoute from "./routes/checkReferral"
import getStudentPerCourseRoute from "./routes/studentsPerCourse"

// routes implemented
app.use("/stripe", stripeRoute)
app.use("/utils", checkReferralRoute)
app.use("/utils", getStudentPerCourseRoute)

// listening
const startServer = async () => {
	try {
		await connectDB()
		app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
	} catch (err) {
		console.log(`Unable to connect with DATABASE: ${err}`)
	}
}

startServer()
