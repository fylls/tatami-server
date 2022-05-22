import { Request, Response, Router } from "express"
import { Influencer } from "../../models/_database"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/referrals/:refCode
 * @desc        return influencer object given referral code
 * @access      public
 * @params      refCode
 *
 */

router.get("/:refCode", async (req: Request, res: Response) => {
	try {
		// get parameter
		const refCode = req.params.refCode

		// return error if missing
		if (!refCode) return res.status(400).json("refCode is missing")

		// search for specific course by ID
		const influencer = await Influencer.findOne({ code: refCode })

		// return error if  not found
		if (!influencer) return res.status(400).json("courses not found")

		// return asked course
		return res.json(influencer)
	} catch (err: any) {
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})
