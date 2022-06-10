import { Request, Response, Router } from "express"
import { Teacher } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/teachers/:teacherID
 * @desc        return teacher object given ID
 * @access      public
 * @params      teacherID
 *
 */

router.get("/:teacherID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const teacherID = req.params.teacherID

		// return error if missing
		if (!teacherID) return res.status(400).json("teacherID is missing")

		// search for specific course by ID
		const teacher = await Teacher.findById(teacherID)

		// return error if  not found
		if (!teacher) return res.status(400).json("teacher not found")

		// return asked course
		return res.json(teacher)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send("server error")
	}
})
