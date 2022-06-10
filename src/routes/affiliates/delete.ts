import { Request, Response, Router } from "express"
import { Affiliate } from "../../models/_"

// express router
const router = Router()
export default router

// TODO implement private route
// please don't use this route, by design we prefer to keep the influencer inactive

/**
 *
 * @route   api.tatami.gg/affiliates/:refCode
 * @desc    delete affiliate by code
 * @access  private
 * @params  :refCode
 *
 */

router.delete("/:refCode", async (req: Request, res: Response) => {
	try {
		// get parameter & return error if missing
		const refCode = req.params.refCode
		if (!refCode) return res.status(400).json("refCode is missing")

		// check if affiliate exists
		const affiliate = await Affiliate.findOne({ code: refCode })
		if (!affiliate) return res.status(404).json("affiliate not found")

		// remove restaurant
		await affiliate.remove()
		return res.json("affiliate removed")
	} catch (error: any) {
		return res.status(500).send("server error")
	}
})
