import { Request, Response, Router } from "express"
import { Influencer } from "../../models/_database"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/referrals/:username
 * @desc        return influencer object given referral code
 * @access      public
 * @params      username
 *
 */

router.get("/:username", async (req: Request, res: Response) => {
	try {
		// get parameter
		const username = req.params.username

		// return error if missing
		if (!username) return res.status(400).json("username is missing")

		// search for specific course by ID
		const influencer = await Influencer.findOne({ username })

		// return error if  not found
		if (!influencer) return res.status(400).json("influencer not found")

		// return asked course
		return res.json(influencer)
	} catch (err: any) {
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})
