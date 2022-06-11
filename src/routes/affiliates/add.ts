import { Request, Response, Router } from "express"
import { Affiliate, IAffiliate } from "../../models/_"
import { affiliateMandatory, validationResult } from "../../utils/validators"

// express router
const router = Router()
export default router

// TODO implement a way to make this route private

/**
 *
 * @route       POST api.tatami.gg/affiliates
 * @desc        adds affiliate to database
 * @access      private
 * @body        { isActive, username, email, category, code, cut, discount }
 * @opt         { name, notes,upfrontCost, amountOwed, totalRevenue, totalPaid, students, lastPaid }
 *
 */

router.post("", affiliateMandatory, async (req: Request, res: Response) => {
	try {
		// check errors in body
		const errors = validationResult(req)
		if (!errors.isEmpty()) return res.status(400).json(errors.array())

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

		// check duplicate using different indexes
		const i1 = await Affiliate.findOne({ username })
		const i2 = await Affiliate.findOne({ code })
		const i3 = await Affiliate.findOne({ email })
		if (i1 || i2 || i3) return res.status(500).send("already exists")

		// build object
		const affiliateObject: IAffiliate = {
			type: "affiliate",
			isActive,
			username,
			email,
			category,
			code,
			cut,
			discount,
		}

		// handy logic for DB administrator (not reachable via frontend)
		if (name) affiliateObject.name = name
		if (notes) affiliateObject.notes = notes
		if (upfrontCost) affiliateObject.upfrontCost = upfrontCost
		if (amountOwed) affiliateObject.amountOwed = amountOwed
		if (totalRevenue) affiliateObject.totalRevenue = totalRevenue
		if (totalPaid) affiliateObject.totalPaid = totalPaid
		if (students) affiliateObject.students = students
		if (lastPaid) affiliateObject.lastPaid = lastPaid

		// create affiliate
		const newAffiliate = new Affiliate(affiliateObject)
		await newAffiliate.save()
		return res.json(newAffiliate)
	} catch (error: any) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})
