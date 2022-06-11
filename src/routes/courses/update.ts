// dependencies
import { Request, Response, Router } from "express"
import { Course, ICourse } from "../../utils/types"
import { courseOptional, validationResult } from "../../utils/validators"
import { isId, checkBody } from "../../utils/helpers"

// express router
const router = Router()
export default router

// TODO implement a way to make this route private

/**
 *
 * @route       PUT api.tatami.gg/courses/:courseID
 * @desc        update course in database
 * @access      private
 * @opt         { slug, game, title, description, lessons, students, info, thumbnail, image }
 *
 */

router.put(
	"/:courseID",
	courseOptional,
	async (req: Request, res: Response) => {
		// check errors in body
		const errors = validationResult(req)
		if (!errors.isEmpty()) return res.status(400).json(errors.array())
		if (checkBody(req.body)) return res.status(400).json("empty body")

		// get parameter
		const courseID = req.params.courseID
		if (!courseID) return res.status(400).json("courseID is missing")
		if (!isId(courseID)) return res.status(400).json("invalid id")

		// search for course by ID
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
				type: "course",
				slug: slug ?? oldCourse.slug,
				game: game ?? oldCourse.game,
				title: title ?? oldCourse.title,
				description: description ?? oldCourse.description,
				lessons: lessons ?? oldCourse.lessons,
				students: students ?? oldCourse.students,
				info: info ?? oldCourse.info,
				thumbnail: thumbnail ?? oldCourse.thumbnail,
				image: image ?? oldCourse.image,
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
			return res.status(500).send(error.message)
		}
	}
)
