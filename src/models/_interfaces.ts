import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId

/*================ teachers ================*/

interface ITeacher {
	name: string
	username: string
	description: string
	email: string
	languages: string[]
	games: string[]
	lessons: typeof ObjectId[]
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
	slug: string
	game: string
	title: string
	description: string
	image?: string
	thumbnail?: string
	info: ICourseInfo[]
	lessons: typeof ObjectId[]
	students: typeof ObjectId[]
	updatedAt?: Date
	createdAt?: Date
}

/*==================== lessons ====================*/

interface ILesson {
	when: Date
	title: string
	game: string
	maxStudents: number
	course: typeof ObjectId
	teacher: typeof ObjectId
	students: typeof ObjectId[]
	updatedAt?: Date
	createdAt?: Date
}

/*==================== influencers ====================*/

interface IInfluencer {
	isActive: boolean
	username: string
	name: string
	email: string
	type: string
	code: string
	notes: string
	cut: number
	discount: number
	upfrontCost: number
	amountOwed: number
	totalRevenue: number
	totalPaid: number
	students: typeof ObjectId[]
	lastPaid?: Date
	updatedAt?: Date
	createdAt?: Date
}

/*======================================================*/

export { ITeacher, IStudent, ICourseInfo, ICourse, ILesson, IInfluencer }
