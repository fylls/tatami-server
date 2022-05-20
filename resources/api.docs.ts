// this file helps frontend developers use and understand the APIs
import axios from "axios"
const PROXY = "https://api.tatami.gg" // "http://localhost:6969"

// stripe API

const buyCourse = async (
	referral: string,
	name: string,
	email: string,
	courseID: string
): Promise<any> => {
	try {
		const payload = { referral, name, email, courseID }
		const res = await axios.post(`${PROXY}/stripe/buyCourse`, payload)
	} catch (error) {
		console.log(error)
	}
}

// utils API

const checkReferral = async (refCode: string): Promise<boolean> => {
	try {
		return await axios.get(`${PROXY}/utils/checkReferral/${refCode}`)
	} catch (err) {
		console.log("err")
		return false
	}
}

const getDiscount = async (refCode: string): Promise<number> => {
	try {
		return await axios.get(`${PROXY}/utils/getDiscount/${refCode}`)
	} catch (err) {
		console.log("err")
		return 0
	}
}

const getStudentPerCourse = async (courseID: string): Promise<number> => {
	try {
		return await axios.get(`${PROXY}/utils/students/${courseID}`)
	} catch (err) {
		console.log("err")
		return 0
	}
}
