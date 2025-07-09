export interface UserRepositoryInterface {
    /**
     * Create new user
     * @param email
     * @param password
     * @param role
     * @return {object}
     */
    createUser(email: string, password: string, role: string): Promise<any>;

    /**
     *
     * @param limit
     * @return {object}
     */
    findAll(limit: object): Promise<any>;

    /**
     * Find user by id
     * @param id
     * @return {object}
     */
    findById(id: string): Promise<any>;

    /**
     * Delete user
     * @param id
     * @return {void}
     */
    deleteUser(id: string): Promise<void>;

    /**
     * Update user
     * @param id
     * @param email
     * @param role
     * @param password
     * @return {object}
     */
    updateUser(id: string, email: string, role: string, password: string): Promise<any>;

    /**
     * Find by field
     * @param value
     * @return {object}
     */
    findByField(value: string): Promise<any>;
}
