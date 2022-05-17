import { Schema, model } from "mongoose"
import { ILecture, IBootcamp } from "./Interfaces"

const ObjectId = Schema.Types.ObjectId

const lectureSchema = new Schema<ILecture>(
	{
		bootcamp: { type: ObjectId, ref: "bootcamps" },
		title: { type: String, required: true },
		description: { type: String, required: true },
		when: { type: Date, required: true },
	},
	{ versionKey: false }
)

const bootcampSchema = new Schema<IBootcamp>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, default: 4000 },
		coach: { type: ObjectId, ref: "coaches" },
		students: [{ type: ObjectId, ref: "students" }],
		lectures: [{ type: lectureSchema, required: true }],
		img: String,
	},
	{ versionKey: false }
)
export = model<IBootcamp>("bootcamps", bootcampSchema)

/*

EXAMPLE 

b = {
	id: "507f1f77bcf86cd799439011",
	title: "bootcamp test",
	description: "test",
	price: 4000,
	coach: "507f1f77bcf86cd799439011",
	students: ["0x227bcfsss793339011", "0xf44bcfsss795539011"],
	lectures: [
		{
			id: "0xf77bcf86cd799439011",
			bootcamp: "507f1f77bcf86cd799439011",
			title: "bootcamp test",
			description: "test",
			when: "2022-05-14T19:47:01+0000",
			created_at: "2022-05-14T19:47:01+0000",
		},
	],
	img: "https://lol.com/image",
	created_at: "2022-05-14T19:47:01+0000",
}

*/
