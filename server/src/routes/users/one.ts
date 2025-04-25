"use strict";

import express, {Request, Response} from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../../constants/data";
import {UserService} from "../../services/UserService";
import {RedisService} from "../../services/RedisService";
import {getCachedUserMiddleware} from "../../middlewares/getCachedUserMiddleware";


const service = new UserService()
const redisClient = new RedisService().createClient()

const router = express.Router()

router.get("/api/v1/users/:id", [
    getCachedUserMiddleware
], async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await service
        .setId(id)
        .getUser()
    const cacheKey = "user_" + id
    await redisClient.setEx(cacheKey, 600, JSON.stringify(user)); // Cache data for 10 minutes
    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: user,
        message: ""
    })

})

export { router as oneUsersRouter }