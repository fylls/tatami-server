import { Request, Response, Router } from "express"
import { Teacher, ITeacher } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/teachers
 * @desc        return array with all the teachers
 * @access      public
 * @params      refCode
 *
 */

router.get("", async (req: Request, res: Response) => {
	try {
		const teacherArray: ITeacher[] = await Teacher.find()
		return res.json(teacherArray)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send("server error")
	}
})
