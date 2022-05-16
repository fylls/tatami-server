import { Schema, model } from "mongoose"

const ObjectId = Schema.Types.ObjectId

interface ICoach {
	name: string
	email: string
	discord?: string
	bootcamps?: typeof ObjectId[]
	img?: string
	created_at?: Date
}

const coachSchema = new Schema<ICoach>(
	{
		name: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		discord: { type: String, required: true },
		bootcamps: [{ type: ObjectId, ref: "bootcamps" }],
		img: String,
		created_at: { type: Date, default: Date.now },
	},
	{ versionKey: false }
)

export = model<ICoach>("coaches", coachSchema)

// c = {
// 	id: "507f1f77bcf86cd799439011",
// 	name: "peppino",
// 	email: "peppino@gmail.com",
// 	discord: "peppino#6969",
// 	bootcamps: [
// 		"507f1f77bcf86cd799439011",
// 		"507f1f77bcf86cd799439011",
// 		"507f1f77bcf86cd799439011",
// 	],
// 	img: "https://lol.com/image",
// 	created_at: "2022-05-14T19:47:01+0000",
// }
