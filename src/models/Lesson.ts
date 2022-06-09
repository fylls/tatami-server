import { Schema, model } from "mongoose"
import { ILesson } from "./_"
import { GAME_ARRAY } from "../const"

const ObjectId = Schema.Types.ObjectId

const lessonSchema = new Schema<ILesson>(
	{
		type: "Lesson",
		when: { type: Date, required: true },
		title: { type: String, required: true },
		game: { type: String, required: true, enum: GAME_ARRAY },
		maxStudents: { type: Number, required: true },
		course: { type: ObjectId, ref: "courses" },
		teacher: { type: ObjectId, ref: "teachers" },
		students: [{ type: ObjectId, ref: "students" }],
	},
	{ versionKey: false, timestamps: true }
)

export = model<ILesson>("lessons", lessonSchema)

/*

EXAMPLE

{
	id: "507f1f77bcf86cd799439011",
    when: "2022-05-14T19:47:0+0000",
    game: "lol",
    title: "lesson 1",
    maxStudents: 20,
	course: "507f1f77bcf86cd799439011",
    teacher: "0x4f5f07wba5ds5fc4f8r9wa",
	students: [
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
	],
	createdAt: "2022-05-14T19:47:01+0000",
}

*/
