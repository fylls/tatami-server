import { Schema, model } from "mongoose"
import { ICoach } from "./Interfaces"

const ObjectId = Schema.Types.ObjectId

const coachSchema = new Schema<ICoach>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		discord: { type: String, required: true },
		bootcamps: [{ type: ObjectId, ref: "bootcamps" }],
		img: String,
	},
	{ versionKey: false }
)

export = model<ICoach>("coaches", coachSchema)

/*

EXAMPLE

c = {
	id: "507f1f77bcf86cd799439011",
	name: "jeff",
	email: "jeff@gmail.com",
	discord: "jeff#6969",
	bootcamps: [
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
	],
	img: "https://lol.com/image",
	created_at: "2022-05-14T19:47:01+0000",
}

*/
