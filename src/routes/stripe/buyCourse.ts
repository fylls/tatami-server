import { BASE_COACH, MAX_STUDENTS, STRIPE_KEY } from "../../utils/constants"
import { Request, Response, Router } from "express"
import Stripe from "stripe"

// express router
const router = Router()
export default router

// stripe init
const stripe = new Stripe(STRIPE_KEY, { apiVersion: "2020-08-27" })

/**
 *
 * @route       POST api.tatami.gg/stripe/subscription
 * @desc        handles subscription in backend and saves user
 * @access      public
 * @body
 *
 */

// TODO to implement subscriptions
