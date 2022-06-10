import { Schema, model } from "mongoose"
import { IStudent } from "./_"

const ObjectId = Schema.Types.ObjectId

const studentSchema = new Schema<IStudent>(
	{
		type: { type: String, default: "student" },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		lessons: [{ type: ObjectId, ref: "courses" }],
	},
	{ versionKey: false, timestamps: true }
)

export = model<IStudent>("students", studentSchema)

/*

EXAMPLE

{
	id: "507f1f77bcf86cd799439011",
	name: "jeff",
	email: "jeff@gmail.com",
    lessons: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439011", "507f1f77bcf86cd799439011"]
	created_at: "2022-05-14T19:47:01+0000",
}

*/
