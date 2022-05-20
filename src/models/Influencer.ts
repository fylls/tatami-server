import { Schema, model } from "mongoose"
import { IInfluencer } from "./_interfaces"
import { INFLUENCER_ARRAY } from "../consts"

const ObjectId = Schema.Types.ObjectId

const influencerSchema = new Schema<IInfluencer>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		type: { type: String, required: true, enum: INFLUENCER_ARRAY },
		code: { type: String, required: true, unique: true },
		cut: { type: Number, required: true, min: 0, max: 1 },
		discount: { type: Number, required: true, min: 0, max: 1 },
		paymentMethod: { type: String },
		students: [{ type: ObjectId, ref: "students" }],
		upfrontCost: { type: Number, required: true, default: 0 },
		amountOwed: { type: Number, required: true, default: 0 },
	},
	{ versionKey: false, timestamps: true }
)

export = model<IInfluencer>("influencers", influencerSchema)

/*

EXAMPLE

{
	id: "507f1f77bcf86cd799439011",
	name: "Emma Langevin",
	email: "emma@langevin.com",
	type: "e-girl",
	code: "EMMA20%",
	cut: 0.1,
	discount: 0.20,
    paymentMethod: "don't pay your taxes lol",
    students: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439011"]
    upfrontCost: 0
    amountOwed: 40000
	created_at: "2022-05-14T19:47:01+0000",
}

*/
