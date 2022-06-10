import { Request, Response, Router } from "express"
import { Student, IStudent } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/students
 * @desc        return array with all the available students
 * @access      public
 *
 */

router.get("", async (req: Request, res: Response) => {
	try {
		const StudentArray: IStudent[] | [] = await Student.find()
		return res.json(StudentArray)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
