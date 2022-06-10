// dependencies
import { Request, Response, Router } from "express"
import { Affiliate, IAffiliate } from "../../models/_"
import { affiliateOptional, validationResult } from "../validator"
import { isId, checkBody } from "../../utils"

// express router
const router = Router()
export default router

// TODO implement a way to make this route private
// TODO questa è la route trattata

/**
 *
 * @route       PUT api.tatami.gg/affiliates/:affiliateID
 * @desc        update affiliate in database
 * @access      private
 * @opt         { isActive, username, name, email, category, code, notes, cut, discount, upfrontCost, amountOwed, totalRevenue, totalPaid, students, lastPaid }
 *
 */

router.put(
	"/:affiliateID",
	affiliateOptional,
	async (req: Request, res: Response) => {
		try {
			// check errors
			const errors = validationResult(req)
			if (!errors.isEmpty()) return res.status(400).json(errors.array())
			if (checkBody(req.body)) return res.status(400).json("empty body")

			// get parameter
			const affiliateID = req.params.affiliateID
			if (!affiliateID) return res.status(400).json("affiliateID missing")
			if (!isId(affiliateID)) return res.status(400).json("invalid id")

			// search for affiliate by ID
			const oldAffiliate = await Affiliate.findById(affiliateID)
			if (!oldAffiliate) return res.status(400).json("not found")

			// destructure body object
			const {
				isActive,
				username,
				name,
				email,
				category,
				code,
				notes,
				cut,
				discount,
				upfrontCost,
				amountOwed,
				totalRevenue,
				totalPaid,
				students,
				lastPaid,
			} = req.body

			// build object
			const affiliateObj: IAffiliate = {
				type: "affiliate",
				isActive: isActive ?? oldAffiliate.isActive,
				username: username ?? oldAffiliate.username,
				name: name ?? oldAffiliate.name,
				email: email ?? oldAffiliate.email,
				category: category ?? oldAffiliate.category,
				code: code ?? oldAffiliate.code,
				notes: notes ?? oldAffiliate.notes,
				cut: cut ?? oldAffiliate.cut,
				discount: discount ?? oldAffiliate.discount,
				upfrontCost: upfrontCost ?? oldAffiliate.upfrontCost,
				amountOwed: amountOwed ?? oldAffiliate.amountOwed,
				totalRevenue: totalRevenue ?? oldAffiliate.totalRevenue,
				totalPaid: totalPaid ?? oldAffiliate.totalPaid,
				students: students ?? oldAffiliate.students,
				lastPaid: lastPaid ?? oldAffiliate.lastPaid,
			}

			// update object
			const updatedAffiliate = await Affiliate.findByIdAndUpdate(
				affiliateID,
				{ $set: affiliateObj },
				{ new: true }
			)

			// return affiliate
			return res.json(updatedAffiliate)
		} catch (error: any) {
			console.error(error.message)
			return res.status(500).send(error.message)
		}
	}
)
