import express, { Application, Request, Response, json } from "express"
import { connectDB, DB_NAME } from "./db"
import stripeRoute from "./routes/stripe"
import dotenv from "dotenv"
import cors from "cors"

const app: Application = express()

// server configs
dotenv.config()
app.use(cors())
app.use(json())

// home API route
app.get("", (req: Request, res: Response) =>
	res.sendFile(__dirname + "/public/home.html")
)

// stripe
app.use("/stripe", stripeRoute)

const PORT = process.env.PORT || 3000

const startServer = async () => {
	try {
		await connectDB()
		console.log(`successfully connected to DATABASE: ${DB_NAME}`)
		app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
	} catch (err) {
		console.log(`Unable to connect with Database: ${err}`)
		startServer()
	}
}

startServer()
