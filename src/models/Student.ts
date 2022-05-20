import { Schema, model } from "mongoose"
import { IStudentInfo, IStudent } from "./_interfaces"

const ObjectId = Schema.Types.ObjectId

const statusSchema = new Schema<IStudentInfo>(
	{
		cohort: { type: ObjectId, ref: "courses" },
		referral: { type: String, required: true },
		watched: [{ type: Number }],
		updated_at: { type: Date, default: new Date() },
	},
	{ versionKey: false, timestamps: true }
)

const studentSchema = new Schema<IStudent>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		info: [{ type: statusSchema }],
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
    info: [
        {
            cohort: "507f1f77bcf86cd799439011",
            referral: "EMMA10%"
            watched: [1,2,3]
            updated_at: "2022-05-14T19:47:01+0000",
        },
    ]
	created_at: "2022-05-14T19:47:01+0000",
}

*/
