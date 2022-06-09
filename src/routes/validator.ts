// dependencies
import { body, validationResult } from "express-validator"
import { AFFILIATE_ARRAY, GAME_ARRAY } from "../const"
import { containsOnlyCourseInfos, containsOnlyStrings } from "../utils"

const affiliateMandatory = [
	body("isActive").isBoolean(),
	body("email").isEmail(),
	body("code").isString(),
	body("name").optional({ checkFalsy: true }).isString(),
	body("notes").optional({ checkFalsy: true }).isString(),
	body("username")
		.isString()
		.custom(x => !/\s/.test(x))
		.withMessage("No spaces are allowed in the username"),
	body("cut")
		.isFloat({ min: 0, max: 1 })
		.withMessage("cut must be a number between 0 and 1"),
	body("discount")
		.isFloat({ min: 0 })
		.withMessage("discount must be an integer >= 0"),
	body("category")
		.optional({ checkFalsy: true })
		.isString()
		.custom(x => !AFFILIATE_ARRAY.includes(x))
		.withMessage("category must be a string defined in AFFILIATE_ARRAY"),
	body("upfrontCost")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("upfrontCost must be a number between 0 and 1"),
	body("amountOwed")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("amountOwed must be a number between 0 and 1"),
	body("totalRevenue")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("totalRevenue must be a number between 0 and 1"),
	body("totalPaid")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("totalPaid must be a number between 0 and 1"),
	body("students")
		.optional({ checkFalsy: true })
		.custom(arr => !containsOnlyStrings(arr))
		.withMessage("students must be an array of objectIDs"),
	body("lastPaid")
		.optional({ checkFalsy: true })
		.isDate()
		.withMessage("lastPaid must be a date"),
]

const affiliateOptional = [
	body("isActive").optional({ checkFalsy: true }).isBoolean(),
	body("email").optional({ checkFalsy: true }).isEmail(),
	body("code").optional({ checkFalsy: true }).isString(),
	body("name").optional({ checkFalsy: true }).isString(),
	body("notes").optional({ checkFalsy: true }).isString(),
	body("username")
		.optional({ checkFalsy: true })
		.isString()
		.custom(x => !/\s/.test(x))
		.withMessage("No spaces are allowed in the username"),
	body("cut")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0, max: 1 })
		.withMessage("cut must be a number between 0 and 1"),
	body("discount")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("discount must be an integer >= 0"),
	body("category")
		.optional({ checkFalsy: true })
		.isString()
		.custom(x => !AFFILIATE_ARRAY.includes(x))
		.withMessage("category must be a string defined in AFFILIATE_ARRAY"),
	body("upfrontCost")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("upfrontCost must be a number between 0 and 1"),
	body("amountOwed")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("amountOwed must be a number between 0 and 1"),
	body("totalRevenue")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("totalRevenue must be a number between 0 and 1"),
	body("totalPaid")
		.optional({ checkFalsy: true })
		.isFloat({ min: 0 })
		.withMessage("totalPaid must be a number between 0 and 1"),
	body("students")
		.optional({ checkFalsy: true })
		.custom(arr => !containsOnlyStrings(arr))
		.withMessage("students must be an array of objectIDs"),
	body("lastPaid")
		.optional({ checkFalsy: true })
		.isDate()
		.withMessage("lastPaid must be a date"),
]

const courseMandatory = [
	body("title").isString(),
	body("description").isString(),
	body("thumbnail").isString(),
	body("image").isString(),
	body("slug")
		.isString()
		.custom(x => !/\s/.test(x))
		.withMessage("No spaces are allowed in the slug"),
	body("game")
		.isString()
		.custom(x => !GAME_ARRAY.includes(x))
		.withMessage("game must be a string defined in GAME_ARRAY"),
	body("lessons")
		.optional({ checkFalsy: true })
		.custom(arr => !containsOnlyStrings(arr))
		.withMessage("lessons must be an array of objectIDs"),
	body("students")
		.optional({ checkFalsy: true })
		.custom(arr => !containsOnlyStrings(arr))
		.withMessage("students must be an array of objectIDs"),
	body("info")
		.optional({ checkFalsy: true })
		.custom(x => !containsOnlyCourseInfos(x))
		.withMessage("info must be an array of objectIDs"),
]

const courseOptional = [
	body("title").optional({ checkFalsy: true }).isString(),
	body("description").optional({ checkFalsy: true }).isString(),
	body("thumbnail").optional({ checkFalsy: true }).isString(),
	body("image").optional({ checkFalsy: true }).isString(),
	body("slug")
		.optional({ checkFalsy: true })
		.isString()
		.custom(x => !/\s/.test(x))
		.withMessage("No spaces are allowed in the slug"),
	body("game")
		.optional({ checkFalsy: true })
		.isString()
		.custom(x => !GAME_ARRAY.includes(x))
		.withMessage("game must be a string defined in GAME_ARRAY"),
	body("lessons")
		.optional({ checkFalsy: true })
		.custom(arr => !containsOnlyStrings(arr))
		.withMessage("lessons must be an array of objectIDs"),
	body("students")
		.optional({ checkFalsy: true })
		.custom(arr => !containsOnlyStrings(arr))
		.withMessage("students must be an array of objectIDs"),
	body("info")
		.optional({ checkFalsy: true })
		.custom(x => !containsOnlyCourseInfos(x))
		.withMessage("info must be an array of objectIDs"),
]

export {
	affiliateMandatory,
	affiliateOptional,
	courseMandatory,
	courseOptional,
	validationResult,
}
