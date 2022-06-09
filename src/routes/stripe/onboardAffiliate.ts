import { STRIPE_KEY } from "../../const"
import { Request, Response, Router } from "express"
import Stripe from "stripe"

const router = Router()
export default router

const stripe = new Stripe(STRIPE_KEY, { apiVersion: "2020-08-27" })

/**
 *
 * @route       POST api.tatami.gg/stripe/onboardAffiliate
 * @desc        handles payment to coaches & influencers
 * @access      private
 * @body
 *
 */

// TODO to implement
