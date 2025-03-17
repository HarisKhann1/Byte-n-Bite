import conf from '../conf/conf';
import { Client, Account, ID, Databases, Query } from 'appwrite';

class Order {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async addOrder(dish_name, price, quantity, total, user_id, username, address, phone) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteOrderCollectionId,
                ID.unique(),
                {dish_name, price: parseInt(price), quantity: parseInt(quantity), total: parseInt(total), user_id, name: username, address, phone}
            );
        } catch (error) {
            console.log('error :: place order', error);
        }
    }

    async getOrders(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteOrderCollectionId,
                [
                    Query.equal("user_id", userId)
                ]
            ); 
        } catch (error) {
            console.log('error :: Order retrival',error);
        }
    }    
}

const order = new Order();
export default order;