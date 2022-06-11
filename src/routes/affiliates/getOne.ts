import { Request, Response, Router } from "express"
import { Affiliate } from "../../models/_"

// express router
const router = Router()
export default router

/**
 *
 * @route       GET api.tatami.gg/affiliates/:username
 * @desc        return affiliate object given username
 * @access      public
 * @params      username
 *
 */

router.get("/:username", async (req: Request, res: Response) => {
	try {
		// get parameter
		const username = req.params.username
		if (!username) return res.status(400).json("username is missing")

		// search for specific course by username
		const affiliate = await Affiliate.findOne({ username })
		if (!affiliate) return res.status(400).json("affiliate not found")

		// return asked course
		return res.json(affiliate)
	} catch (error: any) {
		console.error(error.message)
		return res.status(500).send(error.message)
	}
})
