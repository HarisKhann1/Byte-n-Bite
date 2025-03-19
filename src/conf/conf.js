const conf = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteDishesCollectionId: String(import.meta.env.VITE_APPWRITE_DISHES_COLLECTION_ID),
    appWriteCategoryCollectionId: String(import.meta.env.VITE_APPWRITE_CATEGORY_COLLECTION_ID),
    appWriteOrderCollectionId: String(import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID),
    appWriteReservationCollectionId: String(import.meta.env.VITE_APPWRITE_RESERVATION_COLLECTION_ID),
    appWriteDishesBucketId: String(import.meta.env.VITE_APPWRITE_DISHES_BUCKET_ID),
    appWriteCategoryBucketId: String(import.meta.env.VITE_APPWRITE_CATEGORY_BUCKET_ID),
    appWriteAdminCollectionId: String(import.meta.env.VITE_APPWRITE_ADMIN_COLLECTION_ID),
}

export default conf