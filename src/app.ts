// dependencies
import express, { Application, Request, Response, json } from "express"
import { connectDB } from "./db"
import dotenv from "dotenv"
import cors from "cors"

// init server
const app: Application = express()
const PORT = process.env.PORT || 6969

// server configs
dotenv.config()
app.use(cors())
app.use(json())

// home route
app.get("/", (req: Request, res: Response) => res.send("Tatami API endpoint"))

// routes
import buyCourseRoute from "./routes/stripe/buyCourse"
import checkReferralRoute from "./routes/utils/checkReferral"
import getDiscountRoute from "./routes/utils/studentsPerCourse"
import getStudentPerCourseRoute from "./routes/utils/studentsPerCourse"
import getAllCoursesRoute from "./routes/courses/getAll"
import getOneCourseRoute from "./routes/courses/getOne"

// stripe routes
app.use("/stripe", buyCourseRoute)

// utils routes
app.use("/utils", checkReferralRoute)
app.use("/utils", getDiscountRoute)
app.use("/utils", getStudentPerCourseRoute)

// courses routes
app.use("/courses", getAllCoursesRoute)
app.use("/courses", getOneCourseRoute)

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
