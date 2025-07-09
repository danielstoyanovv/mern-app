export interface TokenServiceInterface {
    userId: string;
    userEmail: string;
    userRole: string;
    readonly getToken: string;

    /**
     * Set user id
     * @param {strings} userId
     * @return {this}
     */
    setUserId(userId: string): setUserId;

    /**
     * get user id
     * @return {number}
     */
    getUserId(): any;

    /**
     * Set user email
     * @param {string} userEmail
     * @return {this}
     */
    setUserEmail(userEmail: string): setUserEmail;

    /**
     * get user email
     * @return {string}
     */
    getUserEmail(): any;

    /**
     * Set user role
     * @param {string} userRole
     * @return {this}
     */
    setUserRole(userRole: string): setUserRole;

    /**
     * Get user role
     * @return {string}
     */
    getUserRole(): any;
}