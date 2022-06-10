import { Request, Response, Router } from "express"
import { Course } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/courses/:courseID
 * @desc        return course object given specific ID
 * @access      public
 * @params      courseID
 *
 */

router.get("/:courseID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const courseID = req.params.courseID

		// return error if missing
		if (!courseID) return res.status(400).json("courseID is missing")

		// search for specific course by ID
		const course = await Course.findById(courseID)

		// return error if  not found
		if (!course) return res.status(400).json("courses not found")

		// return asked course
		return res.json(course)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send("server error")
	}
})
