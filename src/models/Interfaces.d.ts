interface ICoach {
	name: string
	email: string
	discord?: string
	bootcamps?: typeof ObjectId[]
	img?: string
	created_at?: Date
}

interface ILecture {
	bootcamp: typeof ObjectId
	title: string
	description: string
	when?: Date
	created_at?: Date
}

interface IBootcamp {
	title: string
	description: string
	price: number
	coach: typeof ObjectId
	students?: typeof ObjectId[]
	lectures?: ILecture[]
	img?: string
	created_at?: Date
}

interface IStudent {
	name: string
	email: string
	bootcamps?: typeof ObjectId[]
	created_at?: Date
}

export { ICoach, ILecture, IBootcamp, IStudent }
