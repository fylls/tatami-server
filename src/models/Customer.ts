import { Schema, model } from "mongoose"

const ObjectId = Schema.Types.ObjectId

interface ICustomer {
	name: string
	email: string
	bootcamps: typeof ObjectId[]
	created_at?: Date
}

const customerSchema = new Schema<ICustomer>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		bootcamps: [{ type: ObjectId, ref: "bootcamps" }],
		created_at: { type: Date, default: Date.now },
	},
	{ versionKey: false }
)

export = model<ICustomer>("customers", customerSchema)

// c = {
// 	id: "507f1f77bcf86cd799439011",
// 	name: "peppino",
// 	email: "peppino@gmail.com",
// 	bootcamps: [
// 		"507f1f77bcf86cd799439011",
// 		"507f1f77bcf86cd799439011",
// 		"507f1f77bcf86cd799439011",
// 	],
// 	created_at: "2022-05-14T19:47:01+0000",
// }
