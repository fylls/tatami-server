import { Request, Response, Router } from "express"
import { Lesson, ILesson } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/lessons
 * @desc        return array with all the available lessons
 * @access      public
 *
 */

router.get("", async (req: Request, res: Response) => {
	try {
		const lessonArray: ILesson[] | [] = await Lesson.find()
		return res.json(lessonArray)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send("server error")
	}
})
