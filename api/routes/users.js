import { Router } from "express";
import { extractId, jsonBodyParser } from "../middlewares/index.js";
import handlers from "./handlers/index.js";

const userRouter = Router()

userRouter.post('/', jsonBodyParser, handlers.registerUserHandler)
userRouter.post('/auth', jsonBodyParser, handlers.authenticateUserHandler)
userRouter.get('/', extractId, handlers.retrieveUserHandler)

export default userRouter