const conf = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteDishesCollectionId: String(import.meta.env.VITE_APPWRITE_DISHES_COLLECTION_ID),
    appWriteDishesBucketId: String(import.meta.env.VITE_APPWRITE_DISHES_BUCKET_ID),
}

export default conf