import { Schema, model } from "mongoose"
import { IInfluencer } from "./_interfaces"
import { INFLUENCER_ARRAY } from "../const"

const ObjectId = Schema.Types.ObjectId

const influencerSchema = new Schema<IInfluencer>(
	{
		slug: { type: String, required: true },
		isActive: { type: Boolean, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		type: { type: String, required: true, enum: INFLUENCER_ARRAY },
		code: { type: String, required: true, unique: true },
		cut: { type: Number, required: true, min: 0, max: 1 },
		discount: { type: Number, required: true, min: 0, max: 1 },
		paymentMethod: { type: String },
		students: [{ type: ObjectId, ref: "students" }],
		upfrontCost: { type: Number, required: true, default: 0 },
		amountOwed: { type: Number, required: true, default: 0 },
		totalRevenue: { type: Number, required: true, default: 0 },
		totalPaid: { type: Number, required: true, default: 0 },
	},
	{ versionKey: false, timestamps: true }
)

export = model<IInfluencer>("influencers", influencerSchema)

/*

EXAMPLE

{
	_id: { $oid: "62879e3664e63a9c5da28643" },
	name: "tatami",
    slug : "tatami"
    isActive: true,
	email: "team@tatami.gg",
	type: "tatami",
	code: "TATAMI20",
	cut: 0,
	discount: 0.2,
	paymentMethod: "don't pay your taxes lol",
	students: [],
	upfrontCost: 0,
	amountOwed: 0,
    totalRevenue: 0,
    totalPaid: 0
}

*/
