import { Request, Response, Router } from "express"
import { Student } from "../../models/_"

// express router
const router = Router()
export default router

// TODO implement private route
// please don't use this route, by design we prefer to keep the student in the DB

/**
 *
 * @route   api.tatami.gg/student/:studentID
 * @desc    delete student by code
 * @access  private
 * @params  :studentID
 *
 */

router.delete("/:studentID", async (req: Request, res: Response) => {
	try {
		// get parameter & return error if missing
		const studentID = req.params.studentID
		if (!studentID) return res.status(400).json("studentID is missing")

		// check if Student exists
		const student = await Student.findOne({ code: studentID })
		if (!student) return res.status(404).json("student not found")

		// remove restaurant
		await Student.remove()
		return res.json("student removed")
	} catch (error: any) {
		return res.status(500).send("server error")
	}
})
