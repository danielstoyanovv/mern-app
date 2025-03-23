"use strict";

import User from "../models/userModel";

export class UserRepository {
    /**
     * Create new user
     * @param email
     * @param password
     * @param role
     * @return {object}
     */
    async createUser(email: string, password: string, role: string) {
        return await User.create({email, password, role})
    }

    /**
     *
     * @param limit
     * @return {object}
     */
    async findAll(limit: object) {
        return await User
            .find()
            .select("email role")
            .sort({createdAt: -1})
            .limit(limit)
            .lean()
    }

    /**
     * Find user by id
     * @param id
     * @return {object}
     */
    async findById(id: string) {
        return await User
            .findById(id)
            .exec()
    }

    /**
     * Delete user
     * @param id
     * @return {void}
     */
    async deleteUser(id: string) {
        await User.findOneAndDelete({_id: id})
    }

    /**
     * Update user
     * @param id
     * @param email
     * @param role
     * @param password
     * @return {object}
     */
    async updateUser(id: string, email: string, role: string, password: string) {
        await User.findOneAndUpdate({_id: id}, {
            email,
            role,
            password
        })
        return await User
            .findById(id)
            .exec()
    }

    /**
     * Find by field
     * @param value
     * @return {object}
     */
    async findByField(value: string) {
        const email = value
        return await User.findOne({ email });
    }
}