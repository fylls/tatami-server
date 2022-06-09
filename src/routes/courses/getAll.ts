import { Request, Response, Router } from "express"
import { Course, ICourse } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/courses
 * @desc        return array with all the available courses
 * @access      public
 *
 */

router.get("", async (req: Request, res: Response) => {
	try {
		const courseArray: ICourse[] = await Course.find()
		return res.json(courseArray)
	} catch (err: any) {
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})
