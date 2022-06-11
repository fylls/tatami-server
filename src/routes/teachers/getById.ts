import { Request, Response, Router } from "express"
import { Teacher } from "../../utils/types"
import { isId } from "../../utils/helpers"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/teachers/:teacherID
 * @desc        return teacher object given ID
 * @access      public
 * @params      :teacherID
 *
 */

router.get("/:teacherID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const teacherID = req.params.teacherID
		if (!teacherID) return res.status(400).json("teacherID is missing")
		if (!isId(teacherID)) return res.status(400).json("invalid id")

		// search for specific course by ID
		const teacher = await Teacher.findById(teacherID)
		if (!teacher) return res.status(400).json("teacher not found")

		// return asked course
		return res.json(teacher)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
