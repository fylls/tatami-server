import { Schema, model } from "mongoose"
import { ITeacher } from "./_interfaces"
import { LANGUAGE_ARRAY, GAME_ARRAY } from "../const"

const ObjectId = Schema.Types.ObjectId

const teacherSchema = new Schema<ITeacher>(
	{
		name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		languages: [{ type: String, required: true, enum: LANGUAGE_ARRAY }],
		games: [{ type: String, required: true, enum: GAME_ARRAY }],
		lessons: [{ type: ObjectId, ref: "lessons" }],
		image: { type: String },
		stripe: { type: String },
		discord: { type: String },
		youtube: { type: String },
		fiverr: { type: String },
		metafy: { type: String },
		twitch: { type: String },
	},
	{ versionKey: false, timestamps: true }
)

export = model<ITeacher>("teachers", teacherSchema)

/*

EXAMPLE

c = {
	id: "507f1f77bcf86cd799439011",
	name: "Inti Rodriguez",
    username: "sagittarius",
    languages: ["english", "spanish"],
    games: ["lol"],
	email: "jeff@gmail.com",
	discord: "jeff#6969",
    youtube: "yt.com/jeff",
    twitch: "t.tv/jeff",
	imgage: "https://lol.com/image",
    lessons: [
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
		"507f1f77bcf86cd799439011",
	],
	created_at: "2022-05-14T19:47:01+0000",
}

*/
