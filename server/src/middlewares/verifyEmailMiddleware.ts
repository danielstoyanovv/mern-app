"use strict";

import {Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import {
    STATUS_BAD_REQUEST
} from "../constants/data"
import {UserManager} from "../utils/UserManager";

export const verifyEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { email } = req.body;
    const user = await User
    .findById(id)
    .exec()
    if (user.email !== email) {
        const manager = new UserManager()
            .setEmail(email)
        const existsUser = await manager.emailExists()
        if (existsUser) {
            return res.status(STATUS_BAD_REQUEST).json({error: "User already exists"})
        }        
    }
    next();
}