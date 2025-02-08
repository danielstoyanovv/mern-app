"use strict";

import {Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import {
    MESSEGE_ERROR,
    STATUS_BAD_REQUEST
} from "../constants/data"
export async function existsUserMiddleware(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const existsUser = await User.findOne({ 'email': email }, 'email').exec();
    if (existsUser && existsUser.email) {
        return res.status(STATUS_BAD_REQUEST).json({
            status: MESSEGE_ERROR,
            data: [],
            message: "User already exists"
        })
    }
    next();
}