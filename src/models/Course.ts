import { Schema, model } from "mongoose"
import { ILectureInfo, ICourse } from "./_"
import { gameArray } from "../utils"

const ObjectId = Schema.Types.ObjectId

const lectureInfoSchema = new Schema<ILectureInfo>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ versionKey: false }
)

const courseSchema = new Schema<ICourse>(
	{
		slug: { type: String, required: true, unique: true },
		game: { type: String, enum: gameArray },
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, default: 4000 },
		currentCohort: { type: Number },
		cohorts: [{ type: ObjectId, ref: "cohorts" }],
		info: [{ type: lectureInfoSchema, required: true }],
		thumbnail: String,
		img: String,
		created_at: { type: Date, default: Date.now },
	},
	{ versionKey: false }
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
	price: 4000,
	currentCohort: 3,
	cohorts: [
		"0x227b4ii9s793339018",
		"0xf44b88sss795539031",
		"0Kxf44bfJJss79KKsK22",
	],
	info: [
		{
			title: "lecture 1",
			description: "test",
		},
		{
			title: "lecture 2",
			description: "test",
		},
	],
    thumbnail: "https://lol.com/image",
	img: "https://lol.com/image",
	created_at: "2022-05-14T19:47:01+0000",
}

*/