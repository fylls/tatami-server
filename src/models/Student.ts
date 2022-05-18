import { Schema, model } from "mongoose"
import { IStatus, IStudent } from "./_"
import { referralArray } from "../utils"

const ObjectId = Schema.Types.ObjectId

const statusSchema = new Schema<IStatus>(
	{
		cohort: { type: ObjectId, ref: "courses" },
		watched: [{ type: Number }],
		updated_at: { type: Date, default: Date.now() },
	},
	{ versionKey: false }
)

const studentSchema = new Schema<IStudent>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		referral: { type: String, enum: referralArray },
		status: [{ type: statusSchema }],
		created_at: { type: Date, default: Date.now() },
	},
	{ versionKey: false }
)

export = model<IStudent>("students", studentSchema)

/*

EXAMPLE

{
	id: "507f1f77bcf86cd799439011",
	name: "jeff",
	email: "jeff@gmail.com",
    status: [
        {
            cohort: "507f1f77bcf86cd799439011",
            watched: [1,2,3]
            updated_at: "2022-05-14T19:47:01+0000",
        },
    ]
	created_at: "2022-05-14T19:47:01+0000",
}

*/
