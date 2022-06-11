import { Request, Response, Router } from "express"
import { Lesson } from "../../utils/types"
import { isId } from "../../utils/helpers"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/lessons/:lessonID
 * @desc        return lesson object given ID
 * @access      public
 * @params      :lessonID
 *
 */

router.get("/:lessonID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const lessonID = req.params.lessonID
		if (!lessonID) return res.status(400).json("lessonID is missing")
		if (!isId(lessonID)) return res.status(400).json("invalid id")

		// search for specific course by ID
		const lesson = await Lesson.findById(lessonID)
		if (!lesson) return res.status(400).json("Lesson not found")

		// return asked course
		return res.json(lesson)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
