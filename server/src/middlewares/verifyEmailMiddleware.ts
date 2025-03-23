"use strict";

import {Request, Response, NextFunction } from "express";
import {
    STATUS_BAD_REQUEST
} from "../constants/data"
import {UserService} from "../services/UserService";

const service = new UserService()

export const verifyEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { email } = req.body;
    const user = await service
        .setId(id)
        .getUser()
    if (user.email !== email) {
        const manager = new UserService()
            .setEmail(email)
        const existsUser = await manager.emailExists()
        if (existsUser) {
            return res.status(STATUS_BAD_REQUEST).json({error: "User already exists"})
        }        
    }
    next();
}