"use strict";

import { Request, Response } from "express"
const bcrypt = require("bcrypt")
import {RedisServerService} from "../services/RedisServerService";
import {
    MESSEGE_SUCCESS,
    MESSEGE_ERROR,
    MESSEGE_INTERNAL_SERVER_ERROR,
    STATUS_OK,
    STATUS_PATCH,
    STATUS_NO_CONTENT,
    STATUS_CREATED,
    STATUS_INTERNAL_SERVER_ERROR
} from "../constants/data"
require('dotenv').config();
import {LoggerService} from "../services/LoggerService";
import {UserManager} from "../utils/UserManager";

const API_PREFIX = process.env.API_PREFIX || "api"
const API_VERSION = process.env.API_VERSION || "v1"
const redisClient = new RedisServerService().getRedisClient
const logger = new LoggerService().createLogger()
const manager = new UserManager()
export const getUsers = async ( req: Request,  res: Response) => {
    try {
        const limit: any = req.query.limit ?? null
        const users = manager
            .setLimit(limit)
            .getUsers()
        users.then(async result => {
            req.query.limit != undefined ?
                await redisClient.del("users") : await redisClient.setEx("users", 600, JSON.stringify(result));
            res.status(STATUS_OK).json({
                status: MESSEGE_SUCCESS,
                data: {
                    result,
                    "total": result.length
                },
                message: ""
            })
        })
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}

export const createUser = async ( req: Request,  res: Response) => {
    try {
        const { email, role } = req.body;
        /* We Crypt the user's password  */
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await manager
            .setEmail(email)
            .setRole(role)
            .setPassword(password)
            .createUser()
            await redisClient.del("users")
        const resourcesURI = "/" + API_PREFIX + "/" + API_VERSION + "/users/" + user._id
        res.status(STATUS_CREATED).json({
            status: MESSEGE_SUCCESS,
            data: resourcesURI,
            message: "Successfully registration"
        });
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await manager
            .setId(id)
            .getUser()
        const cacheKey = "user_" + id
        await redisClient.setEx(cacheKey, 600, JSON.stringify(user)); // Cache data for 10 minutes
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: user,
            message: ""
        })
    } catch (error) {
        logger.error(error)
        return res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        })

    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await manager
            .setId(id)
            .deleteUser()
        await redisClient.del("users")
        const cacheKey = "user_" + id
        await redisClient.del(cacheKey)
        res.status(STATUS_NO_CONTENT).send(); // No content response
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        })

    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        /* We Crypt the user's password  */
        const password = await bcrypt.hash(req.body.password, 10);
        const { email, role  } = req.body;
        const user = await manager
            .setId(id)
            .setEmail(email)
            .setRole(role)
            .setPassword(password)
            .updateUser()
        await redisClient.del("users")
        const cacheKey = "user_" + id
        await redisClient.del(cacheKey)
        res.status(STATUS_PATCH).json({
            status: MESSEGE_SUCCESS,
            data: user,
            message: ""
        })
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        })

    }
}