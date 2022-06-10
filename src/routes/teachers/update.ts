// dependencies
import { Request, Response, Router } from "express"
import { Teacher, ITeacher } from "../../models/_"
import { teacherOptional, validationResult } from "../validator"

// express router
const router = Router()
export default router

// TODO implement a way to make this route private

/**
 *
 * @route       PUT api.tatami.gg/teachers/:teacherID
 * @desc        update teacher to database
 * @access      private
 * @opt         { when, title, game, maxStudents, course, teacher, students }
 *
 */

router.put(
	"/:teacherID",
	teacherOptional,
	async (req: Request, res: Response) => {
		// check errors in request body
		const errors = validationResult(req)
		if (!errors.isEmpty()) return res.status(400).json(errors.array())

		// get parameter & return error if missing
		const teacherID = req.params.teacherID
		if (!teacherID) return res.status(400).json("teacherID is missing")

		// search for teacher by ID & return error if  not found
		const oldTeacher = await Teacher.findOne({ teacherID })
		if (!oldTeacher) return res.status(400).json("teacher not found")

		// destructure body object
		const {
			name,
			username,
			description,
			email,
			languages,
			games,
			lessons,
			image,
			stripe,
			discord,
			youtube,
			fiverr,
			metafy,
			twitch,
		} = req.body

		try {
			// build object
			const teacherObj: ITeacher = {
				type: "teacher",
				name: name ?? oldTeacher.name,
				username: username ?? oldTeacher.username,
				description: description ?? oldTeacher.description,
				email: email ?? oldTeacher.email,
				languages: languages ?? oldTeacher.languages,
				games: games ?? oldTeacher.games,
				lessons: lessons ?? oldTeacher.lessons,
				image: image ?? oldTeacher.image,
				stripe: stripe ?? oldTeacher.stripe,
				discord: discord ?? oldTeacher.discord,
				youtube: youtube ?? oldTeacher.youtube,
				fiverr: fiverr ?? oldTeacher.fiverr,
				metafy: metafy ?? oldTeacher.metafy,
				twitch: twitch ?? oldTeacher.twitch,
			}

			// update object
			const updatedTeacher = await Teacher.findByIdAndUpdate(
				teacherID,
				{ $set: teacherObj },
				{ new: true }
			)

			// return teacher
			return res.json(updatedTeacher)
		} catch (error: any) {
			console.error(error.message)
			return res.status(500).send(error.message)
		}
	}
)
