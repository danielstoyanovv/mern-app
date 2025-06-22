import {UserRepositoryInterface} from "../repositories/UserRepositoryInterface";

export interface UserServiceInterface {
    email: string;
    role: string;
    password: string;
    limit: object;
    id: string;
    interface: UserRepositoryInterface;

    /**
     * Set user email
     * @param {string} email
     * @return {this}
     */
    setEmail(email: string): setEmail;

    /**
     * Get user email
     * @return {string}
     */
    getEmail(): any;

    /**
     * Set user role
     * @param {string} role
     * @return {this}
     */
    setRole(role: string): setRole;

    /**
     * Get user role
     * @return {string}
     */
    getRole(): any;

    /**
     * Set user password
     * @param {string} password
     * @return {this}
     */
    setPassword(password: string): setPassword;

    /**
     * Get user password
     * @return {string}
     */
    getPassword(): any;

    /**
     * Set user id
     * @param {string} id
     * @return {this}
     */
    setId(id: string): setId;

    /**
     * Get user id
     * @return {string}
     */
    getId(): any;

    /**
     * Check if user with specified email exists
     * @return {boolean}
     */
    emailExists(): Promise<boolean>;

    /**
     * Set limit
     * @param {object} limit
     * @return {this}
     */
    setLimit(limit: object): setLimit;

    /**
     * Get limit
     * @return {object}
     */
    getLimit(): any;

    /**
     * Create user
     * @return {object}
     */
    createUser(): Promise<any>;

    /**
     * Get users
     * @return {object}
     */
    getUsers(): Promise<any>;

    /**
     * Get user
     * @return {object}
     */
    getUser(): Promise<any>;

    /**
     * Delete user
     * @return {void}
     */
    deleteUser(): Promise<void>;

    /**
     * Update user
     * @return {object}
     */

    updateUser(): Promise<any>;

    /**
     * Get user by email
     * @return {object}
     */
    getUserByEmail(): Promise<any>;
}
