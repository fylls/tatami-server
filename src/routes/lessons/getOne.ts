import { Request, Response, Router } from "express"
import { Lesson } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/lessons/:lessonID
 * @desc        return Lesson object given referral code
 * @access      public
 * @params      lessonID
 *
 */

router.get("/:lessonID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const lessonID = req.params.lessonID

		// return error if missing
		if (!lessonID) return res.status(400).json("lessonID is missing")

		// search for specific course by ID
		const lesson = await Lesson.findOne({ lessonID })

		// return error if not found
		if (!lesson) return res.status(400).json("Lesson not found")

		// return asked course
		return res.json(lesson)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
