import { Client, Account, ID, Databases, Query } from 'appwrite';
import conf from '../conf/conf';

class appwriteCategory {
    client = new Client();
    account;
    databases;
    
    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async addCategory({ name }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCategoryCollectionId,
                ID.unique(),
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

//     async uploadImage(image, id = null) {
//         if (!image) {
//             return null;
//         }
//         try {
//             return await this.bucket.createFile(
//                 conf.appWriteDishesBucketId,
//                 id ? id : ID.unique(),
//                 image,
//             )
//         } catch (error) {
//             return null;
//         }
//     }

//     async deleteImage(id) {
//         console.log(`appwrite got`,id);
        
//         try {
//             if (id === null) {
//                 return null;
//             }else {
//                 return await this.bucket.deleteFile(
//                     conf.appWriteDishesBucketId,
//                     id
//                 );
//             }
//         } catch (error) {
//             return null;
//         }
//     }

//     getDishImagePreview(imageId) {

//         try {
//             return this.bucket.getFilePreview(
//                 conf.appWriteDishesBucketId,
//                 imageId
//             );
//         } catch (error) {
//             console.log(error);
            
//             return null;
//         }
//     };
}

const addCategory = new appwriteCategory();
export default addCategory;