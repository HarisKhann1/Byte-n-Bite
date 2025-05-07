import { Client, Account, ID, Databases, Query, Storage} from 'appwrite';
import conf from '../conf/conf';

class appwriteCategory {
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

    async addCategory({ name },imageId) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCategoryCollectionId,
                imageId,
                { category: name }
            );
        } catch (error) {
            throw error;
        }
    }

    async getCategories() {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCategoryCollectionId,
                [
                    Query.orderDesc("$createdAt"),
                ]
            );
        } catch (error) {
            throw error;
        }
    }

    async updateCategory({category, ID}) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCategoryCollectionId,
                ID,
                {category}
            );
        } catch (error) {
            return 'Failed to update category';
        }
    }

    async deleteCategory({ID}) {
        try {
            return await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCategoryCollectionId,
                ID
            );
        } catch (error) {
            return null;
        }
    }

    async uploadImage(image, id = null) {
        if (!image) {
            return null;
        }
        try {
            return await this.bucket.createFile(
                conf.appWriteCategoryBucketId,
                id ? id : ID.unique(),
                image,
            )
        } catch (error) {
            return null;
        }
    }

    async deleteImage(id) {
        
        try {
            if (id === null) {
                return null;
            }else {
                return await this.bucket.deleteFile(
                    conf.appWriteCategoryBucketId,
                    id
                );
            }
        } catch (error) {
            return null;
        }
    }

    getCategoryImage(imageId) {
        try {
            return this.bucket.getFileView(
                conf.appWriteCategoryBucketId,
                imageId
            );
        } catch (error) {
            return null;
        }
    }

}

const addCategory = new appwriteCategory();
export default addCategory;