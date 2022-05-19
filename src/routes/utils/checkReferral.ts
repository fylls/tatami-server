import { Request, Response, Router } from "express"
import { checkReferral } from "../../utils"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami/utils/checkReferral/:refCode
 * @desc        if the referral code is still valid it returns true, otherwise it returns false
 * @access      public
 * @params      refCode
 *
 */

router.get("/checkReferral/:refCode", async (req: Request, res: Response) => {
	// extract parameters
	const code = req.params.refCode

	// check if req.body is present
	if (!code) return res.status(400).json("referral code is missing")

	// implementation on /utils
	return res.send(await checkReferral(code))
})
