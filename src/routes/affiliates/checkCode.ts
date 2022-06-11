import { Request, Response, Router } from "express"
import { checkReferral } from "../../utils/helpers"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/affiliates/checkCode/:refCode
 * @desc        if the referral code is still valid it returns true, otherwise it returns false
 * @access      public
 * @params      :refCode
 *
 */

router.get("/checkCode/:refCode", async (req: Request, res: Response) => {
	try {
		const code = req.params.refCode
		if (!code) return res.status(400).json("referral code is missing")
		return res.json(await checkReferral(code))
	} catch (error: any) {
		console.error(error)
		return res.status(500).send(error.message)
	}
})
