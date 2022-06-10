import { Request, Response, Router } from "express"
import { Student } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/students/:studentID
 * @desc        return student object given referral code
 * @access      public
 * @params      studentID
 *
 */

router.get("/:studentID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const studentID = req.params.studentID

		// return error if missing
		if (!studentID) return res.status(400).json("studentID is missing")

		// search for specific course by ID
		const student = await Student.findById(studentID)

		// return error if not found
		if (!student) return res.status(400).json("student not found")

		// return asked course
		return res.json(student)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send("server error")
	}
})
