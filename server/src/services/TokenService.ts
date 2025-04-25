"use strict";

import jwt from "jsonwebtoken"
import {config} from "dotenv"
config()
export class TokenService {
    #userId: string = ""
    #userEmail: string = ""
    #userRole: string = ""
    /**
     * Get token
     * @return {string}
     */
    get getToken() {
        return jwt.sign({
            id: this.getUserId,
            email: this.getUserEmail(),
            role: this.getUserRole()
        }, process.env.JWT_SECRET!, {
            expiresIn: 180
        })
    }
    /**
     * Set user id
     * @param {strings} userId
     * @return {this}
     */
    setUserId(userId: string) {
        this.#userId = userId;
        return this
    }
    /**
     * get user id
     * @return {number}
     */
    getUserId() {
        return this.#userId
    }
    /**
     * Set user email
     * @param {string} userEmail
     * @return {this}
     */
    setUserEmail(userEmail: string) {
        this.#userEmail = userEmail
        return this
    }
    /**
     * get user email
     * @return {string}
     */
    getUserEmail() {
        return this.#userEmail
    }
    /**
     * Set user role
     * @param {string} userRole
     * @return {this}
     */
    setUserRole(userRole: string) {
        this.#userRole = userRole
        return this
    }
    /**
     * Get user role
     * @return {string}
     */
    getUserRole() {
        return this.#userRole
    }
}