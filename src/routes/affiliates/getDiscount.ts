import { Request, Response, Router } from "express"
import { getDiscount } from "../../utils/helpers"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/affiliates/getDiscount/:refCode
 * @desc        get discount amount from referral code
 * @access      public
 * @params      :refCode
 *
 */

router.get("/getDiscount/:refCode", async (req: Request, res: Response) => {
	try {
		const code = req.params.refCode
		if (!code) return res.status(400).json("referral code is missing")
		return res.json(await getDiscount(code))
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
