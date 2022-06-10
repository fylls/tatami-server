import { Request, Response, Router } from "express"
import { Lesson } from "../../models/_"

// express router
const router = Router()
export default router

// TODO implement private route

/**
 *
 * @route   api.tatami.gg/lessons/:lessonID
 * @desc    delete lesson by ID
 * @access  private
 * @params  :lessonID
 *
 */

router.delete("/:lessonID", async (req: Request, res: Response) => {
	try {
		// get parameter & return error if missing
		const lessonID = req.params.lessonID
		if (!lessonID) return res.status(400).json("lessonID is missing")

		// check if Lesson exists
		const lesson = await Lesson.findById(lessonID)
		if (!lesson) return res.status(404).json("Lesson not found")

		// remove Lesson
		await lesson.remove()
		return res.json("lesson removed")
	} catch (error: any) {
		return res.status(500).send(error.message)
	}
})
