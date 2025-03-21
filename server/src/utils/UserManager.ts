"use strict";

import User from "../models/userModel";

export class UserManager {
    #email: string
    #role: string
    #password: string
    #limit: object
    #id: string

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
     * Get user email
     * @return {string}
     */
    getEmail() {
        return this.#email
    }

    /**
     * Set user role
     * @param {string} role
     * @return {this}
     */
    setRole(role: string) {
        this.#role = role
        return this
    }

    /**
     * Get user role
     * @return {string}
     */
    getRole() {
        return this.#role
    }

    /**
     * Set user password
     * @param {string} password
     * @return {this}
     */
    setPassword(password: string) {
        this.#password = password
        return this
    }

    /**
     * Get user password
     * @return {string}
     */
    getPassword() {
        return this.#password
    }

    /**
     * Set user id
     * @param {string} id
     * @return {this}
     */
    setId(id: string) {
        this.#id = id
        return this
    }

    /**
     * Get user id
     * @return {string}
     */
    getId() {
        return this.#id
    }

    /**
     * Check if user with specified email exists
     * @return {boolean}
     */
    async emailExists() {
        const existsUser = await User.findOne({'email': this.getEmail()}, 'email').exec();
        if (existsUser && existsUser.email) {
            return true
        }
        return false
    }

    /**
     * Set limit
     * @param {object} limit
     * @return {this}
     */
    setLimit(limit: object) {
        this.#limit = limit
        return this
    }

    /**
     * Get limit
     * @return {object}
     */
    getLimit() {
        return this.#limit
    }



    /**
     * Create user
     * @return {object}
     */
    async createUser() {
        const email = this.getEmail()
        const password = this.getPassword()
        const role = this.getRole()
        return await User.create({email, password, role})
    }

    /**
     * Get users
     * @return {object}
     */
    async getUsers() {
        return await User
            .find()
            .select("email role")
            .sort({createdAt: -1})
            .limit(this.getLimit())
            .lean()
    }

    /**
     * Get user
     * @return {object}
     */
    async getUser() {
        return await User
            .findById(this.getId())
            .exec()
    }

    /**
     * Delete user
     * @return {void}
     */
    async deleteUser() {
        await User.findOneAndDelete({_id: this.getId()})
    }


    /**
     * Update user
     * @return {object}
     */

    async updateUser() {
        const email = this.getEmail()
        const role = this.getRole()
        const password = this.getPassword()
        await User.findOneAndUpdate({_id: this.getId()}, {
            email,
            role,
            password
        })
        return await User
            .findById(this.getId())
            .exec()
    }

    /**
     * Get user by email
     * @return {object}
     */
    async getUserByEmail() {
        const email = this.getEmail()
        return await User.findOne({ email });
    }
}