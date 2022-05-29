import { Request, Response, Router } from "express"
import { Course } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/utils/students/:courseID
 * @desc        return how many students a course has given its ID
 * @access      public
 * @params      courseID
 *
 */

router.get("/students/:courseID", async (req: Request, res: Response) => {
	// extract parameters
	const course_id = req.params.courseID

	// check if req.body is present
	if (!course_id) return res.status(400).json("course_id is missing")

	// check ig course exists
	const course = await Course.findById(course_id)
	if (!course) return res.status(404).json("course not found")

	// return how many user are in course
	return res.json(course.students.length)
})
