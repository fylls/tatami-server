import { Schema, model } from "mongoose"
import { IAffiliate } from "./_"
import { AFFILIATE_ARRAY } from "../const"

const ObjectId = Schema.Types.ObjectId

const affiliateSchema = new Schema<IAffiliate>(
	{
		type: { type: String, default: "affiliate" },
		isActive: { type: Boolean, required: true },
		username: { type: String, required: true, unique: true },
		name: { type: String },
		email: { type: String, required: true, unique: true },
		category: { type: String, required: true, enum: AFFILIATE_ARRAY }, //TODO Strangely does not work
		code: { type: String, required: true, unique: true },
		notes: { type: String },
		cut: { type: Number, required: true, min: 0, max: 1, default: 0 },
		discount: { type: Number, required: true, default: 0 },
		upfrontCost: { type: Number, default: 0 },
		amountOwed: { type: Number, default: 0 },
		totalRevenue: { type: Number, default: 0 },
		totalPaid: { type: Number, default: 0 },
		students: [{ type: ObjectId, ref: "students" }],
		lastPaid: { type: Date },
	},
	{ versionKey: false, timestamps: true }
)

export = model<IAffiliate>("affiliates", affiliateSchema)

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
