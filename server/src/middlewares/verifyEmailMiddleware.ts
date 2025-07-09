"use strict";

import {Request, Response, NextFunction } from "express";
import {UserService} from "../services/UserService";
import {BadRequestError} from "../errors/bad-request-error";
import {UserRepository} from "../repositories/UserRepository";

const service = new UserService(new UserRepository)

export const verifyEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { email } = req.body;
    const user = await service
        .setId(id)
        .getUser()
    if (user.email !== email) {
        const manager = new UserService(new UserRepository)
            .setEmail(email)
        const existsUser = await manager.emailExists()
        if (existsUser) {
            throw new BadRequestError("User exists!")
        }        
    }
    next();
}