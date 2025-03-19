import conf from '../conf/conf';
import { Client, Account, ID, Query } from 'appwrite';

class AuthUser {
    client = new Client();
    account;

    /**
     * Initializes a new instance of the authentication class.
     * 
     * This constructor sets up the Appwrite client with the provided endpoint and project ID
     * from the configuration object. It also initializes the account object for managing user accounts.
     * 
     * @constructor
     * @param {Object} conf - The configuration object containing Appwrite settings.
     * @param {string} conf.appWriteUrl - The URL endpoint for the Appwrite server.
     * @param {string} conf.appWriteProjectId - The project ID for the Appwrite project.
     */
    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client);
    }

    /**
     * Registers a new user account.
     * 
     * This method registers a new user account with the provided email address and password.
     * 
     * @param {string} email - The email address for the new user account.
     * @param {string} password - The password for the new user account.
     * @returns {Promise} A promise that resolves to the user account object.
     */

    async createAccount(email, password, name) {
        try {
            return await this.account.create(ID.unique(), email, password, name);
            // const userAccount = await this.account.create(ID.unique(), email, password, { name: fullname });
            // if (userAccount) {
            //     return account.login(email, password );
            // }else {
            //     return userAccount;
            // }
        } catch (error) {
            console.log("Error creating account: ", error);
        }
    }

    /**
     * Logs in an existing user account.
     * 
     * This method logs in an existing user account with the provided email address and password.
     * 
     * @param {string} email - The email address for the user account.
     * @param {string} password - The password for the user account.
     * @returns {Promise} A promise that resolves to the user account object.
     */
    
    async login(email, password) {
        try {
            // return login session
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Error logging in: ", error);
        }
    }

    async adminLogin(email, password) {
        try {
            // return login session
            return await this.account.createEmailPasswordSession(
                email, 
                password,
                [
                    Query.equal("Identifiers", email),
                    Query.equal("Labels", "admin")
                ]
            );
        } catch (error) {
            console.log("Error logging in: ", error);
        }
    }
    

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error getting current user: ", error);
        }
        return null;
    }
    
    async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            console.log("Error logging out: ", error);
        }
    }
}

const auth = new AuthUser();
export default auth;