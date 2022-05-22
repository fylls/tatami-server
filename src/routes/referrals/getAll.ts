import { Request, Response, Router } from "express"
import { Influencer } from "../../models/_database"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/referrals
 * @desc        return array with all the influencers
 * @access      public
 * @params      refCode
 *
 */

router.get("", async (req: Request, res: Response) => {
	try {
		const influencers = await Influencer.find()
		return res.json(influencers)
	} catch (err: any) {
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})
