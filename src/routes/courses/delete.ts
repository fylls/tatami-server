import { Request, Response, Router } from "express"
import { Course } from "../../utils/types"
import { isId } from "../../utils/helpers"

// express router
const router = Router()
export default router

// TODO implement private route
// please don't use this route, by design we prefer to keep the influencer inactive

/**
 *
 * @route   api.tatami.gg/courses/:courseID
 * @desc    delete affiliate by code
 * @access  private
 * @params  :courseID
 *
 */

router.delete("/:courseID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const courseID = req.params.courseID
		if (!courseID) return res.status(400).json("courseID is missing")
		if (!isId(courseID)) return res.status(400).json("invalid id")

		// check if course exists
		const course = await Course.findById(courseID)
		if (!course) return res.status(404).json("course not found")

		// remove course
		await course.remove()
		return res.json("course removed")
	} catch (error: any) {
		return res.status(500).send(error.message)
	}
})
