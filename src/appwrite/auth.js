import config from '../config/config';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, userName }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, userName);
            if (userAccount) {
                await this.login({ email, password });
                return userAccount;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    }

    async logOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
