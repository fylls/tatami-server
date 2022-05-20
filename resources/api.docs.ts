// this file helps frontend developers use and understand the APIs
import axios from "axios"
const PROXY = "https://api.tatami.gg" // "http://localhost:6969"

// stripe API

const buyCourse = async (
	name: string,
	email: string,
	courseID: string,
	payment_method_id: string,
	payment_intent_id: string,
	referral?: string
): Promise<any> => {
	try {
		const payload = {
			name,
			email,
			courseID,
			payment_method_id,
			payment_intent_id,
			referral,
		}
		return await axios.post(`${PROXY}/stripe/buyCourse`, payload)
	} catch (error) {
		console.log(error)
	}
}

// courses API

const getAllCourses = async (refCode: string): Promise<boolean> => {
	try {
		return await axios.get(`${PROXY}/utils/checkReferral/${refCode}`)
	} catch (err) {
		console.log("err")
		return false
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
