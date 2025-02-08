"use strict";

import User from '../models/userModel'
import { Request, Response } from "express"
const bcrypt = require("bcrypt")
import {RedisServerService} from "../services/RedisServerService";
import {
    MESSEGE_SUCCESS,
    MESSEGE_ERROR,
    MESSEGE_INTERNAL_SERVER_ERROR,
    STATUS_OK,
    STATUS_PATH,
    STATUS_NO_CONTENT,
    STATUS_CREATED,
    STATUS_INTERNAL_SERVER_ERROR
} from "../constants/data"
require('dotenv').config();
const API_PREFIX = process.env.API_PREFIX || "api"
const API_VERSION = process.env.API_VERSION || "v1"

const redisClient = new RedisServerService().getRedisClient
export const getUsers = async ( req: Request,  res: Response) => {
    try {
        const limit = req.query.limit ?? null
        const users = await User
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
        req.query.limit != undefined ? await redisClient.del("users") : await redisClient.setEx("users", 600, JSON.stringify(users));
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: {
                users,
                "total" : users.length
            },
            message: ""
        })
    } catch (error) {
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
        redisClient.del("users")
        const user = await User.create({email, password, role})
        const resourcesURI = "/" + API_PREFIX + "/" + API_VERSION + "/users/" + user._id
        res.status(STATUS_CREATED).json({
            status: MESSEGE_SUCCESS,
            data: resourcesURI,
            message: "Successfully registration"
        });
    } catch (error) {
        console.log(error)
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
        const user = await User
            .findById(id)
            .exec()
        const cacheKey = "user_" + id
        await redisClient.setEx(cacheKey, 600, JSON.stringify(user)); // Cache data for 10 minutes
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: user,
            message: ""
        })
    } catch (error) {
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
        await User.findOneAndDelete({_id: id})
        await redisClient.del("users")
        const cacheKey = "user_" + id
        await redisClient.del(cacheKey)
        res.status(STATUS_NO_CONTENT).send(); // No content response
    } catch (error) {
        console.log(error)
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
        await User.findOneAndUpdate({_id: id}, {
            email, role, password
        })
        const user = await User
        .findById(id)
        .exec()
        await redisClient.del("users")
        const cacheKey = "user_" + id
        await redisClient.del(cacheKey)
        res.status(STATUS_PATH).json({
            status: MESSEGE_SUCCESS,
            data: user,
            message: ""
        })
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        })

    }
}