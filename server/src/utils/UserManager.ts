"use strict";

import User from "../models/userModel";
export class UserManager {
    #email: string

    /**
     * Set user email
     * @param {string} email
     * @return {this}
     */
    setEmail(email: string) {
        this.#email = email
        return this
    }

    /**
     * Check Is authentication token expired
     * @return {boolean}
     */
    async emailExists() {
        const existsUser = await User.findOne({'email': this.#email}, 'email').exec();
        if (existsUser && existsUser.email) {
            return true
        }
        return false
    }
}