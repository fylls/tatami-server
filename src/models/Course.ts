import { Schema, model } from "mongoose"
import { ICourseInfo, ICourse } from "./_"
import { GAME_ARRAY } from "../const"

const ObjectId = Schema.Types.ObjectId

const courseInfoSchema = new Schema<ICourseInfo>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ versionKey: false, timestamps: true }
)

const courseSchema = new Schema<ICourse>(
	{
		type: { type: String, default: "course" },
		slug: { type: String, required: true, unique: true },
		game: { type: String, required: true, enum: GAME_ARRAY },
		title: { type: String, required: true },
		description: { type: String, required: true },
		lessons: [{ type: ObjectId, ref: "lessons" }],
		students: [{ type: ObjectId, ref: "students" }],
		info: [{ type: courseInfoSchema, required: true }],
		thumbnail: String,
		image: String,
	},
	{ versionKey: false, timestamps: true }
)

export = model<ICourse>("courses", courseSchema)

/* 

EXAMPLE

b = {
	id: "507f1f77bcf86cd799439011",
	slug: "lol-masterclass",
	game: "lol",
	title: "LoL masterclass",
	description: "here is a test",
	lessons: [
		"0x227b4ii9s793339018",
		"0xf44b88sss795539031",
		"0xxf44bfJJss79KKsK22",
	],
    students: [
		"st227b4ii9s793339018",
		"stf44b88sss795539031",
		"sta344bfJJss79KKsK22",
	],
	info: [
		{
			title: "lesson 1",
			description: "test",
		},
		{
			title: "lesson 2",
			description: "test",
		},
	],
    thumbnail: "https://lol.com/image",
	img: "https://lol.com/image",
	created_at: "2022-05-14T19:47:01+0000",
}

*/
