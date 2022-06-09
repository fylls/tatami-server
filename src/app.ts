// dependencies
import express, { Application, Request, Response, json } from "express"
import { connectDB } from "./db"
import { PORT } from "./const"
import cors from "cors"

// server initialization
const app: Application = express()

// server configs
app.use(cors())
app.use(json())

// home route
app.get("/", (req: Request, res: Response) => res.send("Tatami API endpoint"))

// routes
//import buyCourseRoute from "./routes/stripe/buyCourse"
//import onboardAffiliateRoute from "./routes/stripe/onboardAffiliate"
import checkReferralRoute from "./routes/affiliates/checkReferral"
import getDiscountRoute from "./routes/affiliates/getDiscount"
import getStudentPerCourseRoute from "./routes/lessons/studentPerLesson"
import getAllCoursesRoute from "./routes/courses/getAll"
import getOneCourseRoute from "./routes/courses/getOne"
import getAllReferralsRoute from "./routes/affiliates/getAll"
import getOneReferralRoute from "./routes/affiliates/getOne"

// stripe routes
// app.use("/stripe", buyCourseRoute)
//app.use("/stripe", onboardAffiliateRoute)

// utils routes
app.use("/utils", checkReferralRoute)
app.use("/utils", getDiscountRoute)
app.use("/utils", getStudentPerCourseRoute)

// courses routes
app.use("/courses", getAllCoursesRoute)
app.use("/courses", getOneCourseRoute)

// affiliate routes
app.use("/affiliates", getAllReferralsRoute)
app.use("/affiliates", getOneReferralRoute)

// listening
const startServer = async () => {
	try {
		await connectDB()
		app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
	} catch (err: any) {
		console.log(`Unable to connect with DATABASE: ${err}`)
	}
}

startServer()
