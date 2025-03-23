"use strict";

import { Request, Response } from "express"
import {config} from "dotenv"
config()
import {
    MESSEGE_SUCCESS,
    MESSEGE_ERROR,
    MESSEGE_INTERNAL_SERVER_ERROR,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_UNAUTHORIZED
} from "../constants/data"
import { TokenService } from "../services/TokenService";
import {LoggerService} from "../services/LoggerService";
import {UserService} from "../services/UserService";

const logger = new LoggerService().createLogger()
const service = new UserService()

export const loginUser = async ( req: Request,  res: Response) => {
    const { email, password, role } = req.body;
    const INVALID_EMAIL_PASSWORD = "Invalid email or password";
    try {
        const user = await service
            .setEmail(email)
            .getUserByEmail()
        if (!user) {
            return res.status(STATUS_UNAUTHORIZED).json({
                status: MESSEGE_ERROR,
                data: [] ,
                message: INVALID_EMAIL_PASSWORD 
            });
        }
        const bcrypt = require("bcrypt")
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(STATUS_UNAUTHORIZED).json({
                status: MESSEGE_ERROR,
                data: [],
                message: INVALID_EMAIL_PASSWORD
            });
        }
        if (user.role !== role) {
            return res.status(STATUS_UNAUTHORIZED).json({
                status: MESSEGE_ERROR,
                data: [],
                message: "Invalid role" 
            });
        }
        const token = new TokenService()
            .setUserId(user._id)
            .setUserEmail(email)
            .setUserRole(role)
            .getToken
        const data = {
            token: token,
            logged_user_id: user._id
        }
        res.json({
            status: MESSEGE_SUCCESS,
            data,
            message: ""
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