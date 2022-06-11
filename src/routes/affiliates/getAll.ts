import { Request, Response, Router } from "express"
import { Affiliate, IAffiliate } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/affiliates
 * @desc        return array with all the affiliates
 * @access      public
 * @params      :refCode
 *
 */

router.get("", async (req: Request, res: Response) => {
	try {
		const affiliateArray: IAffiliate[] | [] = await Affiliate.find()
		return res.json(affiliateArray)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
