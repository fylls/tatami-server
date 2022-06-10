// dependencies
import { Request, Response, Router } from "express"
import { Lesson, ILesson } from "../../models/_"
import { LessonOptional, validationResult } from "../../utils/validators"
import { isId, checkBody } from "../../utils/helpers"

// express router
const router = Router()
export default router

// TODO implement a way to make this route private

/**
 *
 * @route       PUT api.tatami.gg/lessons/:lessonID
 * @desc        adds Lesson to database
 * @access      private
 * @opt         { when, title, game, maxStudents, course, teacher, students }
 *
 */

router.put(
	"/:lessonID",
	LessonOptional,
	async (req: Request, res: Response) => {
		// check errors in body
		const errors = validationResult(req)
		if (!errors.isEmpty()) return res.status(400).json(errors.array())
		if (checkBody(req.body)) return res.status(400).json("empty body")

		// get parameter
		const lessonID = req.params.lessonID
		if (!lessonID) return res.status(400).json("lessonID is missing")
		if (!isId(lessonID)) return res.status(400).json("invalid id")

		// search for Lesson by ID
		const oldLesson = await Lesson.findOne({ lessonID })
		if (!oldLesson) return res.status(400).json("lesson not found")

		// destructure body object
		// prettier-ignore
		const { when, title, game, maxStudents, course, teacher, students } = req.body

		try {
			// build object
			const LessonObj: ILesson = {
				type: "lesson",
				when: when ?? oldLesson.when,
				title: title ?? oldLesson.title,
				game: game ?? oldLesson.game,
				maxStudents: maxStudents ?? oldLesson.maxStudents,
				course: course ?? oldLesson.course,
				teacher: teacher ?? oldLesson.teacher,
				students: students ?? oldLesson.students,
			}

			// update object
			const updatedLesson = await Lesson.findByIdAndUpdate(
				lessonID,
				{ $set: LessonObj },
				{ new: true }
			)

			// return lesson
			return res.json(updatedLesson)
		} catch (error: any) {
			console.error(error.message)
			return res.status(500).send(error.message)
		}
	}
)
