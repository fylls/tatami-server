// this file helps frontend developers use and understand the APIs
import axios from "axios"
import { NODE_ENV } from "../const"
import { ICourse, IInfluencer } from "../models/_interfaces"

// prettier-ignore
const PROXY = (NODE_ENV === "live") ? "https://api.tatami.gg" : "http://localhost:6969"

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
	} catch (err) {
		console.log(err)
	}
}

// courses API
const getAllCourses = async (): Promise<ICourse[] | null> => {
	try {
		return await axios.get(`${PROXY}/utils/courses`)
	} catch (err) {
		console.log(err)
		return null
	}
}

const getOneCourse = async (courseID: string): Promise<ICourse | null> => {
	try {
		return await axios.get(`${PROXY}/utils/courses/${courseID}`)
	} catch (err) {
		console.log("err")
		return null
	}
}

// referrals API
const getAllReferrals = async (): Promise<IInfluencer[] | null> => {
	try {
		return await axios.get(`${PROXY}/referrals`)
	} catch (err) {
		console.log(err)
		return null
	}
}

const GetOneReferral = async (refCode: string): Promise<IInfluencer | null> => {
	try {
		return await axios.get(`${PROXY}/referrals/${refCode}`)
	} catch (err) {
		console.log("err")
		return null
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
