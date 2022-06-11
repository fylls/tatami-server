import { Request, Response, Router } from "express"
import { Affiliate } from "../../utils/types"
import { isId } from "../../utils/helpers"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/affiliates/:affiliateID
 * @desc        return affiliate object given ID
 * @access      public
 * @params      :affiliateID
 *
 */

router.get("/:affiliateID", async (req: Request, res: Response) => {
	try {
		// get parameter
		const affiliateID = req.params.affiliateID
		if (!affiliateID) return res.status(400).json("affiliateID is missing")
		if (!isId(affiliateID)) return res.status(400).json("invalid id")

		// search for specific course by affiliateID
		const affiliate = await Affiliate.findById(affiliateID)
		if (!affiliate) return res.status(400).json("affiliate not found")

		// return asked course
		return res.json(affiliate)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
