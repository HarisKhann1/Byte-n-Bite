import conf from '../conf/conf';
import { Client, Account, ID, Databases, Query } from 'appwrite';

class Reservation {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async reservation({ fullname, people, phoneNO, date, start_time, end_time, extra_info }, user_id) {
            
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteReservationCollectionId,
                ID.unique(),
                {user_id, name: fullname, people: parseInt(people), phone_no: phoneNO, date, start_time, end_time, comments: extra_info}
            );
        } catch (error) {
            console.log('error :: at reservation', error);
        }
    }

    async getReservation(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteReservationCollectionId,
                [
                    Query.equal("user_id", userId)
                ]
            ); 
        } catch (error) {
            console.log('error :: at reservation',error);
        }
    }
    
    async getAllReservation() {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteReservationCollectionId,
                [
                    Query.orderDesc("$createdAt"),
                    Query.limit(10)
                ]
            );
        } catch (error) {
            console.log('error :: at reservation', error);
        }
    }
}

const reservation = new Reservation();
export default reservation;