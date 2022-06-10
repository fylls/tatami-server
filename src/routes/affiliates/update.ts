// dependencies
import { Request, Response, Router } from "express"
import { Affiliate, IAffiliate } from "../../models/_"
import { affiliateOptional, validationResult } from "../validator"

// express router
const router = Router()
export default router

/**
 *
 * @route       PUT api.tatami.gg/affiliates/:refCode
 * @desc        adds affiliate to database
 * @access      private
 * @opt         { isActive, username, name, email, category, code, notes, cut, discount, upfrontCost, amountOwed, totalRevenue, totalPaid, students, lastPaid }
 *
 */

// TODO implement a way to make this route private

router.put(
	"/:refCode",
	affiliateOptional,
	async (req: Request, res: Response) => {
		// check errors in request body
		const errors = validationResult(req.body)
		if (!errors.isEmpty()) return res.status(400).json(errors.array())

		// get parameter & return error if missing
		const refCode = req.params.refCode
		if (!refCode) return res.status(400).json("refCode is missing")

		// search for affiliate by ID & return error if  not found
		const oldAffiliate = await Affiliate.findOne({ refCode })
		if (!oldAffiliate) return res.status(400).json("affiliate not found")

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

		try {
			// build object
			const affiliateObj: IAffiliate = {
				type: "Affiliate",
				isActive: isActive || oldAffiliate.isActive,
				username: username || oldAffiliate.username,
				name: name || oldAffiliate.name,
				email: email || oldAffiliate.email,
				category: category || oldAffiliate.category,
				code: code || oldAffiliate.code,
				notes: notes || oldAffiliate.notes,
				cut: cut || oldAffiliate.cut,
				discount: discount || oldAffiliate.discount,
				upfrontCost: upfrontCost || oldAffiliate.upfrontCost,
				amountOwed: amountOwed || oldAffiliate.amountOwed,
				totalRevenue: totalRevenue || oldAffiliate.totalRevenue,
				totalPaid: totalPaid || oldAffiliate.totalPaid,
				students: students || oldAffiliate.students,
				lastPaid: lastPaid || oldAffiliate.lastPaid,
			}

			// update object
			const updatedAffiliate = await Affiliate.findByIdAndUpdate(
				refCode,
				{ $set: affiliateObj },
				{ new: true }
			)

			// return affiliate
			return res.json(updatedAffiliate)
		} catch (error: any) {
			console.error(error.message)
			return res.status(500).send("server error")
		}
	}
)
