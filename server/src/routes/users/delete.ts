"use strict";

import express, {Request, Response} from "express";
import {
    STATUS_NO_CONTENT,
} from "../../constants/data";
import {UserService} from "../../services/UserService";
import {RedisService} from "../../services/RedisService";
import {authMiddleware} from "../../middlewares/authMiddleware";
import {UserRepository} from "../../repositories/UserRepository";

const service = new UserService(new UserRepository)
const redisClient = new RedisService().createClient()

const router = express.Router()

router.delete("/api/v1/users/:id", [
    authMiddleware
], async (req: Request, res: Response) => {
    const { id } = req.params
    await service
        .setId(id)
        .deleteUser()
    await redisClient.del("users")
    const cacheKey = "user_" + id
    await redisClient.del(cacheKey)
    res.status(STATUS_NO_CONTENT).send(); // No content response
})

export { router as deleteUserRouter }