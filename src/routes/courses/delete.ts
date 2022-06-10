import { Request, Response, Router } from "express"
import { Course } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route   api.tatami.gg/courses/:courseID
 * @desc    delete affiliate by code
 * @access  private
 * @params  :courseID
 *
 */

// TODO implement private route
// please don't use this route, by design we prefer to keep the influencer inactive

router.delete("/:courseID", async (req: Request, res: Response) => {
	try {
		// get parameter & return error if missing
		const courseID = req.params.courseID
		if (!courseID) return res.status(400).json("courseID is missing")

		// check if course exists
		const course = await Course.findById(courseID)
		if (!course) return res.status(404).json("course not found")

		// remove course
		await course.remove()
		return res.json("course removed")
	} catch (error: any) {
		return res.status(500).send("server error")
	}
})
