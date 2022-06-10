import mongoose from "mongoose"
import Lesson from "./Lesson"
import Course from "./Course"
import Affiliate from "./Affiliate"
import Student from "./Student"
import Teacher from "./Teacher"

const ObjectId = mongoose.Types.ObjectId

/*================ teachers ================*/

interface ITeacher {
	type: "Teacher"
	name?: string
	username: string
	description: string
	email: string
	languages: string[]
	games: string[]
	lessons?: typeof ObjectId[]
	image?: string
	stripe?: string
	discord?: string
	youtube?: string
	fiverr?: string
	metafy?: string
	twitch?: string
	updatedAt?: Date
	createdAt?: Date
}

/*================ students ================*/

interface IStudent {
	type: "Student"
	name: string
	email: string
	lessons: typeof ObjectId[]
	updatedAt?: Date
	createdAt?: Date
	// TODO subscription info into student ?
}

/*==================== courses ====================*/

interface ICourseInfo {
	title: string
	description: string
}

interface ICourse {
	type: "Course"
	slug: string
	game: string
	title: string
	description: string
	image: string
	thumbnail: string
	info?: ICourseInfo[]
	lessons?: typeof ObjectId[]
	students?: typeof ObjectId[]
	updatedAt?: Date
	createdAt?: Date
}

/*==================== lessons ====================*/

interface ILesson {
	type: "Lesson"
	when: Date
	title: string
	game: string
	maxStudents: number
	course: typeof ObjectId
	teacher: typeof ObjectId
	students?: typeof ObjectId[]
	updatedAt?: Date
	createdAt?: Date
}

/*==================== affiliates ====================*/

interface IAffiliate {
	type: "Affiliate"
	isActive: boolean
	username: string
	name?: string
	email: string
	category: string
	code: string
	notes?: string
	cut: number
	discount: number
	upfrontCost?: number
	amountOwed?: number
	totalRevenue?: number
	totalPaid?: number
	students?: typeof ObjectId[]
	lastPaid?: Date
	updatedAt?: Date
	createdAt?: Date
}

/*======================================================*/

export {
	Teacher,
	ITeacher,
	Student,
	IStudent,
	Course,
	ICourse,
	ICourseInfo,
	Lesson,
	ILesson,
	Affiliate,
	IAffiliate,
}
