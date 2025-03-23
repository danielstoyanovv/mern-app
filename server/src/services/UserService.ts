"use strict";

import {UserRepository} from "../repositories/UserRepository";

const repository = new UserRepository()

export class UserService {
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
        const user = await repository
            .findByField(this.getEmail())

        return !!user
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
        return await repository
            .createUser(this.getEmail(), this.getPassword(), this.getRole())
    }

    /**
     * Get users
     * @return {object}
     */
    async getUsers() {
        return await repository
            .findAll(this.getLimit())
    }

    /**
     * Get user
     * @return {object}
     */
    async getUser() {
       return await repository.findById(this.getId())
    }

    /**
     * Delete user
     * @return {void}
     */
    async deleteUser() {
        await repository.deleteUser(this.getId())
    }


    /**
     * Update user
     * @return {object}
     */

    async updateUser() {
      return await repository
          .updateUser(this.getId(), this.getEmail(), this.getRole(), this.getPassword())
    }

    /**
     * Get user by email
     * @return {object}
     */
    async getUserByEmail() {
        return await repository
            .findByField(this.getEmail())
    }
}