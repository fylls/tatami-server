import { Request, Response, Router } from "express"
import { Student } from "../../utils/types"
import { isId } from "../../utils/helpers"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/students/:studentID
 * @desc        return student object given ID
 * @access      public
 * @params      :studentID
 *
 */

router.get("/:studentID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const studentID = req.params.studentID
		if (!studentID) return res.status(400).json("studentID is missing")
		if (!isId(studentID)) return res.status(400).json("invalid id")

		// search for specific course by ID
		const student = await Student.findById(studentID)
		if (!student) return res.status(400).json("student not found")

		// return asked course
		return res.json(student)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
