import { Request, Response, Router } from "express"
import { checkReferral } from "../../utils/helpers"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/referrals/checkCode/:refCode
 * @desc        if the referral code is still valid it returns true, otherwise it returns false
 * @access      public
 * @params      refCode
 *
 */

router.get("/checkCode/:refCode", async (req: Request, res: Response) => {
	try {
		// extract parameters
		const code = req.params.refCode

		// check if req.body is present
		if (!code) return res.status(400).json("referral code is missing")

		// implementation on /utils
		return res.json(await checkReferral(code))
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
