import { Request, Response, Router } from "express"
import { Teacher, ITeacher } from "../../models/_"
import { teacherMandatory, validationResult } from "../validator"

// express router
const router = Router()
export default router

// TODO implement a way to make this route private

/**
 *
 * @route       POST api.tatami.gg/Teachers
 * @desc        adds Teacher to database
 * @access      private
 * @body        { username, description,  email,  languages,  games,  image }
 * @opt         { name, lessons, stripe, discord, youtube, fiverr, metafy, twitch }
 *
 */

router.post("", teacherMandatory, async (req: Request, res: Response) => {
	// check errors in request body
	const errors = validationResult(req.body)
	if (!errors.isEmpty()) return res.status(400).json(errors.array())

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

	// build object
	const TeacherObject: ITeacher = {
		type: "Teacher",
		username,
		description,
		email,
		languages,
		games,
		image,
	}

	// handy logic for DB administrator (not reachable via frontend)
	if (name) TeacherObject.name = name
	if (lessons) TeacherObject.lessons = lessons
	if (stripe) TeacherObject.stripe = stripe
	if (discord) TeacherObject.discord = discord
	if (youtube) TeacherObject.youtube = youtube
	if (fiverr) TeacherObject.fiverr = fiverr
	if (metafy) TeacherObject.metafy = metafy
	if (twitch) TeacherObject.twitch = twitch

	// create teacher
	try {
		const newTeacher = new Teacher(TeacherObject)
		await newTeacher.save()
		return res.json(newTeacher)
	} catch (error: any) {
		return res.status(500).send("server error")
	}
})
