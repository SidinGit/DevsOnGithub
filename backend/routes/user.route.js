import express from "express"
import { getUserProfileAndRepos } from "../controllers/user.controller.js"


const router = express.Router()

router.get("/profile/:username", getUserProfileAndRepos)
//todo: GET likes(who liked our profile)
//todo: POST like a profile(like someone's profile)

export default router