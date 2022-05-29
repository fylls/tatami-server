import { Request, Response, Router } from "express"
import { Affiliate } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/affiliates
 * @desc        return array with all the affiliates
 * @access      public
 * @params      refCode
 *
 */

router.get("", async (req: Request, res: Response) => {
	try {
		const affiliate = await Affiliate.find()
		return res.json(affiliate)
	} catch (err: any) {
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})
