import { Request, Response, Router } from "express"
import { Affiliate } from "../../models/_"
import { isId } from "../../utils/helpers"
// express router
const router = Router()
export default router

// TODO implement private route
// please don't use this route, by design we prefer to keep the influencer inactive

/**
 *
 * @route       DELETE api.tatami.gg/affiliates/:affiliateID
 * @desc        delete affiliate by ID
 * @access      private
 * @params      :affiliateID
 *
 */

router.delete("/:affiliateID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const affiliateID = req.params.affiliateID
		if (!affiliateID) return res.status(400).json("affiliateID is missing")
		if (!isId(affiliateID)) return res.status(400).json("invalid id")

		// check if affiliate exists
		const affiliate = await Affiliate.findById(affiliateID)
		if (!affiliate) return res.status(404).json("affiliate not found")

		// remove affiliate
		await affiliate.remove()
		return res.json("affiliate removed")
	} catch (error: any) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})
