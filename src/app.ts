import express, { Application, Request, Response, json } from "express"
import stripeRoute from "./routes/stripe"
import { connectDB } from "./db"
import dotenv from "dotenv"
import cors from "cors"

const app: Application = express()

// server configs
dotenv.config()
app.use(cors())
app.use(json())

// home
app.get("/", (req: Request, res: Response) => res.send("Tatami API endpoint"))

// stripe
app.use("/stripe", stripeRoute)

const PORT = process.env.PORT || 3000

const startServer = async () => {
	try {
		await connectDB()
		app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
	} catch (err) {
		console.log(`Unable to connect with DATABASE: ${err}`)
	}
}

startServer()
