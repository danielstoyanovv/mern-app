"use strict";

import User from '../models/userModel'
import { Request, Response } from "express"
import {config} from "dotenv"
import {
    STATUS_SUCCESS,
    STATUS_ERROR,
    INTERNAL_SERVER_ERROR } from "../constants/data"
import { TokenService } from "../services/TokenService";
config()
export const loginUser = async ( req: Request,  res: Response) => {
    const { email, password, role } = req.body;
    const INVALID_EMAIL_PASSWORD = "Invalid email or password";
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                status: STATUS_ERROR, 
                data: [] ,
                message: INVALID_EMAIL_PASSWORD 
            });
        }
        const bcrypt = require("bcrypt")
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({
                status: STATUS_ERROR,
                data: [],
                message: INVALID_EMAIL_PASSWORD
            });
        }
        if (user.role !== role) {
            return res.status(401).json({ 
                status: STATUS_ERROR, 
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
            token: token
        }
        res.json({
            status: STATUS_SUCCESS, 
            data,
            message: ""
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            status: STATUS_ERROR, 
            data: [],
            message: INTERNAL_SERVER_ERROR
        });
    }
}