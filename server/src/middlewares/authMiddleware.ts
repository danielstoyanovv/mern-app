"use strict";

import {Request, Response, NextFunction } from "express";
import {TokenManager} from "../utils/TokenManager";
import {LoggerService} from "../services/LoggerService";
import {BadRequestError} from "../errors/bad-request-error";

const tokenManager = new TokenManager()
const logger = new LoggerService().createLogger()
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || false
    if (!token) throw new BadRequestError("Token is missing in this request!")

    if (token) {
        try {
            const currentToken = tokenManager
                .setToken(token)
            const expired = currentToken.isExpired()
            if (expired) throw new BadRequestError("Invalid or expired token.")
            const isAdmin = currentToken.includesAdmin()
            if (!isAdmin) throw new BadRequestError("Invalid or expired token, admins access required.")
        } catch(error) {
            logger.error(error)
        }
    }
    next();
}
