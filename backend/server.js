import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"


dotenv.config()
const app =  express()

app.use(cors())

app.get("/", (req,res) => {
    res.send("server is running")
})

app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)

app.listen(5000,(req,res) => {
    console.log("server is running at http://localhost:5000")
})