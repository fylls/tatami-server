import { Request, Response, Router } from "express"
import { Course, ICourse } from "../../models/_"
import { courseMandatory, validationResult } from "../validator"

// express router
const router = Router()
export default router

/**
 *
 * @route       POST api.tatami.gg/courses
 * @desc        adds course to database
 * @access      private
 * @body        { slug, game, title, description,thumbnail, image }
 *
 */

// TODO implement a way to make this route private

router.post("/", courseMandatory, async (req: Request, res: Response) => {
	// check errors in request body
	const errors = validationResult(req.body)
	if (!errors.isEmpty()) return res.status(400).json(errors.array())

	// destructure body object
	const {
		slug,
		game,
		title,
		description,
		lessons,
		students,
		info,
		thumbnail,
		image,
	} = req.body

	// build object
	const courseObject: ICourse = {
		type: "Course",
		slug,
		game,
		title,
		description,
		thumbnail,
		image,
	}

	// handy logic for DB administrator (not reachable via frontend)
	if (lessons) courseObject.lessons = lessons
	if (students) courseObject.students = students
	if (info) courseObject.info = info

	// create affiliate
	try {
		const newCourse = new Course(courseObject)
		await newCourse.save()
		res.json(newCourse)
	} catch (err) {
		res.status(500).send("Server Error")
	}
})
