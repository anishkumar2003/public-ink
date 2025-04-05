import config from '../config/config';
import { Client, Account, ID, Databases, Query, Storage } from "appwrite";

export class DbServices {
    client;
    databases;
    bucket;

    
    constructor() {
        this.client = new Client()
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, image, status, UserId, slug }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    UserId,
                }
            );
        } catch (error) {
            console.log("Error occurred while creating post:", error);
            throw error;
        }
    }

    async deletePost({ slug }) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async updatePost(slug, { title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPostById :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId, // ✅ fixed collectionId
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // File/image upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: File/imageUpload :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    async getFilePreview(fileID) {
        try {
            return this.bucket.getFilePreview(
                config.appWriteBucketId,
                fileID
            );
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false;
        }
    }

    async getAllFiles() {
        try {
            return await this.bucket.listFiles(config.appWriteBucketId);
        } catch (error) {
            console.log("Appwrite service :: getAllFiles :: error", error);
            return false;
        }
    }
}

const dbService = new DbServices();

export default dbService;
