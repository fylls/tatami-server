import { Schema, model } from "mongoose"
import { ILecture, ICohort } from "./_"

const ObjectId = Schema.Types.ObjectId

const lectureSchema = new Schema<ILecture>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		teacher: { type: ObjectId, ref: "teachers" },
		liveStudents: [{ type: ObjectId, ref: "students" }],
		when: { type: Date, required: true },
	},
	{ versionKey: false }
)

const cohortSchema = new Schema<ICohort>(
	{
		edition: { type: Number, required: true },
		course: { type: ObjectId, ref: "courses" },
		mainTeacher: { type: ObjectId, ref: "teachers" },
		students: [{ type: ObjectId, ref: "students" }],
		lectures: [{ type: lectureSchema, required: true }],
		created_at: { type: Date, default: Date.now() },
	},
	{ versionKey: false }
)

export = model<ICohort>("cohorts", cohortSchema)

/*

EXAMPLE

c = {
	id: "507f1f77bcf86cd799439011",
	edition: 4,
	mainTeacher: "507f1f77bcf86cd799439011",
	students: [
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
	],
	lectures: [
		{
			title: "lecture 1",
			description: "test",
			teacher: "507f1f77bcf86cd799439011",
			liveStudents: [
				"507f1f77bcf86cd799439011",
				"507f1f77bcf86cd799439011",
				"507f1f77bcf86cd799439011",
			],
			when: "2022-05-14T19:47:0+0000",
		},
	],
	created_at: "2022-05-14T19:47:01+0000",
}

*/
