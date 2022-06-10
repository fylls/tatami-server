// dependencies
import { Request, Response, Router } from "express"
import { Course, ICourse } from "../../models/_"
import { courseOptional, validationResult } from "../validator"

// express router
const router = Router()
export default router

/**
 *
 * @route       PUT api.tatami.gg/courses/:courseID
 * @desc        update course in database
 * @access      private
 * @opt         { slug, game, title, description, lessons, students, info, thumbnail, image }
 *
 */

// TODO implement a way to make this route private

router.put(
	"/:courseID",
	courseOptional,
	async (req: Request, res: Response) => {
		// check errors in request body
		const errors = validationResult(req.body)
		if (!errors.isEmpty()) return res.status(400).json(errors.array())

		// get parameter & return error if missing
		const courseID = req.params.courseID
		if (!courseID) return res.status(400).json("courseID is missing")

		// search for course by ID & return error if  not found
		const oldCourse = await Course.findOne({ courseID })
		if (!oldCourse) return res.status(400).json("course not found")

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

		try {
			// build object
			const courseObj: ICourse = {
				type: "Course",
				slug: slug || oldCourse.slug,
				game: game || oldCourse.game,
				title: title || oldCourse.title,
				description: description || oldCourse.description,
				lessons: lessons || oldCourse.lessons,
				students: students || oldCourse.students,
				info: info || oldCourse.info,
				thumbnail: thumbnail || oldCourse.thumbnail,
				image: image || oldCourse.image,
			}

			// update object
			const updatedCourse = await Course.findByIdAndUpdate(
				courseID,
				{ $set: courseObj },
				{ new: true }
			)

			// return course
			return res.json(updatedCourse)
		} catch (error: any) {
			console.error(error.message)
			return res.status(500).send("server error")
		}
	}
)
