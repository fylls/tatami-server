import { Request, Response, Router } from "express"
import { Teacher } from "../../models/_"

// express router
const router = Router()
export default router

// TODO implement private route
// please don't use this route, by design we prefer to keep the teacher in the DB

/**
 *
 * @route   api.tatami.gg/teacher/:teacherID
 * @desc    delete teacher by code
 * @access  private
 * @params  :teacherID
 *
 */

router.delete("/:teacherID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const teacherID = req.params.teacherID
		if (!teacherID) return res.status(400).json("teacherID is missing")

		// check if Teacher exists
		const teacher = await Teacher.findOne({ code: teacherID })
		if (!teacher) return res.status(404).json("Teacher not found")

		// remove teacher
		await teacher.remove()
		return res.json("teacher removed")
	} catch (error: any) {
		return res.status(500).send(error.message)
	}
})
