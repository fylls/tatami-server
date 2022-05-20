import { Schema, model } from "mongoose"
import { ITeacher } from "./_interfaces"

const ObjectId = Schema.Types.ObjectId

const coachSchema = new Schema<ITeacher>(
	{
		name: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		cohorts: [{ type: ObjectId, ref: "cohorts" }],
		discord: String,
		youtube: String,
		twitch: String,
		img: String,
	},
	{ versionKey: false,  timestamps: true}
)

export = model<ITeacher>("teachers", coachSchema)

/*

EXAMPLE

c = {
	id: "507f1f77bcf86cd799439011",
	name: "jeff",
    name: "jeff",
	email: "jeff@gmail.com",
	discord: "jeff#6969",
    youtube: "yt.com/jeff",
    twitch: "t.tv/jeff",
	img: "https://lol.com/image",
    cohorts: [
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
	],
	created_at: "2022-05-14T19:47:01+0000",
}

*/
