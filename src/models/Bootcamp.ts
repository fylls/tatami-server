import { Schema, model } from "mongoose"

const ObjectId = Schema.Types.ObjectId

interface IBootcamp {
	coach: typeof ObjectId
	students: typeof ObjectId[]
	when: Date
	img?: string
	created_at?: Date
}

const bootcampSchema = new Schema<IBootcamp>(
	{
		coach: { type: ObjectId, ref: "coaches" },
		students: [{ type: ObjectId, ref: "customers" }],
		when: { type: Date, required: true },
		img: String,
		created_at: { type: Date, default: Date.now },
	},
	{ versionKey: false }
)

export = model<IBootcamp>("bootcamps", bootcampSchema)

// b = {
//     id: "507f1f77bcf86cd799439011",
// 	coach: "507f1f77bcf86cd799439011",
// 	students: [
// 		"507f1f77bcf86cd799439011",
// 		"507f1f77bcf86cd799439011",
// 		"507f1f77bcf86cd799439011",
// 	],
// 	when: "2022-05-14T19:47:01+0000",
// 	img: "https://lol.com/image",
// 	created_at: "2022-05-14T19:47:01+0000",
// }
