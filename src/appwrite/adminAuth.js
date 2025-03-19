import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';
import conf from '../conf/conf';

class AdminAuth {
    client = new Client();
    account;
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async login(email, password) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteAdminCollectionId,
                [
                    Query.equal('email', email),
                    Query.equal('password', password),
                ]
            );
        } catch (error) {
            console.log(error);
        }
    }
}


const adminAuth = new AdminAuth();
export default adminAuth;