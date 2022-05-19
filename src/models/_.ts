import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId

/*=========================================*/
// DB: teachers

interface ITeacher {
	name: string
	description: string
	email: string
	discord?: string
	youtube?: string
	twitch?: string
	cohorts?: typeof ObjectId[]
	img?: string
	created_at?: Date
}

// TODO add new coach info (inspiration from TypeForm)
// languages, games, rank

/*=========================================*/
// DB: students

interface IStatus {
	cohort: typeof ObjectId
	watched: number[]
	updated_at: Date
}

interface IStudent {
	name: string
	email: string
	referral: string
	status: IStatus[]
	created_at?: Date
}

/*=========================================*/
// DB: courses

interface ILectureInfo {
	title: string
	description: string
}

interface ICourse {
	slug: string
	title: string
	game: string
	description: string
	price: number
	currentCohort: number
	cohorts: typeof ObjectId[]
	students: typeof ObjectId[]
	info?: ILectureInfo[]
	img?: string
	thumbnail: string
	created_at?: Date
}

/*=========================================*/
// DB: cohorts

interface ILecture extends ILectureInfo {
	teacher: typeof ObjectId
	liveStudents: typeof ObjectId[]
	when: Date
}

interface ICohort {
	edition: number
	course: typeof ObjectId
	mainTeacher: typeof ObjectId
	students: typeof ObjectId[]
	lectures: ILecture[]
	created_at?: Date
}

//TODO  define relationship between cohort and course

/*=========================================*/
// DB: cohorts

export { ITeacher, IStatus, IStudent, ILectureInfo, ICourse, ILecture, ICohort }
