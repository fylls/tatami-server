// dependencies
import { Application } from "express"

// affiliates routes
import addAffiliateRoute from "./routes/affiliates/add"
import checkReferralRoute from "./routes/affiliates/checkReferral"
import deleteAffiliateRoute from "./routes/affiliates/delete"
import GetAllAffiliatesRoute from "./routes/affiliates/getAll"
import GetDiscountRoute from "./routes/affiliates/getDiscount"
import GetOneAffiliateRoute from "./routes/affiliates/getOne"
import updateAffiliateRoute from "./routes/affiliates/update"

// courses routes
import addCourseRoute from "./routes/courses/add"
import deleteCourseRoute from "./routes/courses/delete"
import getAllCoursesRoute from "./routes/courses/getAll"
import getOneCoursesRoute from "./routes/courses/getOne"
import updateCourseRoute from "./routes/courses/update"

// lessons routes
import addLessonRoute from "./routes/lessons/add"
import deleteLessonRoute from "./routes/lessons/delete"
import getAllLessonsRoute from "./routes/lessons/getAll"
import getOneLessonRoute from "./routes/lessons/getOne"
import updateLessonRoute from "./routes/lessons/update"

// teachers routes
import addTeacherRoute from "./routes/teachers/add"
import deleteTeacherRoute from "./routes/teachers/delete"
import getAllTeachersRoute from "./routes/teachers/getAll"
import getOneTeacherRoute from "./routes/teachers/getOne"
import updateTeacherRoute from "./routes/teachers/update"

// students routes

// authentication

// stripe

const implementRoutes = (app: Application): void => {
	app.get("", (req, res) => res.send("Tatami API endpoint"))

	app.use("/affiliates", addAffiliateRoute)
	app.use("/affiliates", checkReferralRoute)
	app.use("/affiliates", deleteAffiliateRoute)
	app.use("/affiliates", GetAllAffiliatesRoute)
	app.use("/affiliates", GetDiscountRoute)
	app.use("/affiliates", GetOneAffiliateRoute)
	app.use("/affiliates", updateAffiliateRoute)

	app.use("/courses", addCourseRoute)
	app.use("/courses", deleteCourseRoute)
	app.use("/courses", getAllCoursesRoute)
	app.use("/courses", getOneCoursesRoute)
	app.use("/courses", updateCourseRoute)

	app.use("/lessons", addLessonRoute)
	app.use("/lessons", deleteLessonRoute)
	app.use("/lessons", getAllLessonsRoute)
	app.use("/lessons", getOneLessonRoute)
	app.use("/lessons", updateLessonRoute)

	app.use("/teachers", addTeacherRoute)
	app.use("/teachers", deleteTeacherRoute)
	app.use("/teachers", getAllTeachersRoute)
	app.use("/teachers", getOneTeacherRoute)
	app.use("/teachers", updateTeacherRoute)

	// app.use("/student", XXX)
	// app.use("/student", XXX)

	// app.use("/signIn", XXX)
	// app.use("/SignUp", XXX)

	// app.use("/stripe", XXX)
	// app.use("/stripe", XXX)
}

export { implementRoutes }
