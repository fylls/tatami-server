// dependencies
import express, { Application, json } from "express"
import { implementRoutes } from "./routing"
import { connectDB } from "./db"
import { PORT } from "./utils/constants"
import cors from "cors"

// server configs
const app: Application = express()
app.use(cors())
app.use(json())
implementRoutes(app)

// listening
const startServer = async () => {
	try {
		await connectDB()
		app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
	} catch (error: any) {
		console.log(`Unable to connect with DATABASE: ${error}`)
	}
}

// starting logic
startServer()

// export
export { app }
