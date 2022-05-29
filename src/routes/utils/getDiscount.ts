import { Request, Response, Router } from "express"
import { getDiscount } from "../../utils"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/utils/getDiscount/:refCode
 * @desc        get discount amount from referral code
 * @access      public
 * @params      refCode
 *
 */

router.get("/getDiscount/:refCode", async (req: Request, res: Response) => {
	try {
		// extract parameters
		const code = req.params.refCode

		// check if req.body is present
		if (!code) return res.status(400).json("referral code is missing")

		// implementation on /utils
		return res.json(await getDiscount(code))
	} catch (err: any) {
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})
