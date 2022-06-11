import { Request, Response, Router } from "express"
import { Lesson, ILesson } from "../../models/_"
import { LessonMandatory, validationResult } from "../../utils/validators"

// express router
const router = Router()
export default router

// TODO implement a way to make this route private

/**
 *
 * @route       POST api.tatami.gg/Lessons
 * @desc        adds Lesson to database
 * @access      private
 * @body        { when, title, game, maxStudents, course, teacher, students }
 *
 */

router.post("", LessonMandatory, async (req: Request, res: Response) => {
	// check errors in body
	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(400).json(errors.array())

	// destructure body object
	// prettier-ignore
	const { when, title, game, maxStudents, course, teacher, students } = req.body

	// build object
	const lessonObject: ILesson = {
		type: "lesson",
		when,
		title,
		game,
		maxStudents,
		course,
		teacher,
	}

	// handy logic for DB administrator (not reachable via frontend)
	if (students) lessonObject.students = students

	// create Lesson
	try {
		const newLesson = new Lesson(lessonObject)
		await newLesson.save()
		return res.json(newLesson)
	} catch (error: any) {
		return res.status(500).send(error.message)
	}
})
