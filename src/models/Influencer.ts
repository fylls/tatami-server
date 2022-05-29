import { Schema, model } from "mongoose"
import { IInfluencer } from "./_interfaces"
import { INFLUENCER_ARRAY } from "../const"

const ObjectId = Schema.Types.ObjectId

const influencerSchema = new Schema<IInfluencer>(
	{
		isActive: { type: Boolean, required: true },
		username: { type: String, required: true, unique: true },
		name: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		type: { type: String, required: true, enum: INFLUENCER_ARRAY },
		code: { type: String, required: true, unique: true },
		notes: { type: String },
		cut: { type: Number, required: true, min: 0, max: 1, default: 0 },
		discount: { type: Number, required: true, default: 0 },
		upfrontCost: { type: Number, required: true, default: 0 },
		amountOwed: { type: Number, required: true, default: 0 },
		totalRevenue: { type: Number, required: true, default: 0 },
		totalPaid: { type: Number, required: true, default: 0 },
		students: [{ type: ObjectId, ref: "students" }],
		lastPaid: { type: Date, required: true },
	},
	{ versionKey: false, timestamps: true }
)

export = model<IInfluencer>("influencers", influencerSchema)

/*

EXAMPLE

{
	_id: { $oid: "62879e3664e63a9c5da28643" },
    isActive: true,
	username: "tatami",
    name : "tatami team"
	email: "team@tatami.gg",
	type: "tatami",
	code: "TATAMI20",
    notes: "don't pay your taxes lol",
	cut: 0,
	discount: 1000,
	students: [],
	upfrontCost: 0,
	amountOwed: 0,
    totalRevenue: 0,
    totalPaid: 0
}

*/
