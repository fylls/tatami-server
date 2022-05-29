// this file helps frontend developers use and understand the APIs
import axios from "axios"
import { NODE_ENV } from "../const"
import { ICourse, IAffiliate } from "../models/_"

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
		return await axios.get(`${PROXY}/courses`)
	} catch (err) {
		console.log(err)
		return null
	}
}

const getOneCourse = async (courseID: string): Promise<ICourse | null> => {
	try {
		return await axios.get(`${PROXY}/courses/${courseID}`)
	} catch (err) {
		console.log("err")
		return null
	}
}

// affiliates API
const getAllAffiliates = async (): Promise<IAffiliate[] | null> => {
	try {
		return await axios.get(`${PROXY}/affiliates`)
	} catch (err) {
		console.log(err)
		return null
	}
}

const GetOneAffiliate = async (refCode: string): Promise<IAffiliate | null> => {
	try {
		return await axios.get(`${PROXY}/affiliates/${refCode}`)
	} catch (err) {
		console.log("err")
		return null
	}
}

// utils API
const checkAffiliateCode = async (refCode: string): Promise<boolean> => {
	try {
		return await axios.get(`${PROXY}/utils/checkCode/${refCode}`)
	} catch (err) {
		console.log("err")
		return false
	}
}

const getAffiliateDiscount = async (refCode: string): Promise<number> => {
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
