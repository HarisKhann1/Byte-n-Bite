import { Client, Account, ID, Databases, Storage } from 'appwrite';
import conf from '../conf/conf';

class Dish {
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

    async addDish({name, price, description, image, category}) {
        const imageName = image[0].name;
        console.log("Adding dish: ", name, price, description, imageName, category);
        return await this.databases.createDocument(
            conf.appWriteDatabaseId,
            conf.appWriteDishesCollectionId,
            ID.unique(),
            {name, description, image : imageName, category, price : parseInt(price)}
        );
    }

    async getDishes() {
        return await this.databases.listDocuments(
            conf.appWriteDatabaseId,
            conf.appWriteDishesCollectionId
        );
    }
}

const dish = new Dish();
export default dish;