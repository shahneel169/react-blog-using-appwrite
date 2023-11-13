import { Client, Databases, Query } from "appwrite";

import conf from "../conf/conf";

export class PostService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, userId, status }) {
    try {
      const { appwriteUrlDatabaseId, appwriteUrlCollectionId } = conf;
      return await this.databases.createDocument(
        appwriteUrlDatabaseId,
        appwriteUrlCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          userId,
          status,
        }
      );
    } catch (e) {
      console.log("AppWrite service :: createPost :: error", e);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const { appwriteUrlDatabaseId, appwriteUrlCollectionId } = conf;
      return await this.databases.updateDocument(
        appwriteUrlDatabaseId,
        appwriteUrlCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (e) {
      console.log("AppWrite service :: updatePost :: error", e);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      const { appwriteUrlDatabaseId, appwriteUrlCollectionId } = conf;
      await this.databases.deleteDocument(
        appwriteUrlDatabaseId,
        appwriteUrlCollectionId,
        slug
      );
      return true;
    } catch (e) {
      console.log("AppWrite service :: deletePost :: error", e);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const { appwriteUrlDatabaseId, appwriteUrlCollectionId } = conf;
      return await this.databases.getDocument(
        appwriteUrlDatabaseId,
        appwriteUrlCollectionId,
        slug
      );
    } catch (e) {
      console.log("AppWrite service :: getPost :: error", e);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      const { appwriteUrlDatabaseId, appwriteUrlCollectionId } = conf;
      return await this.databases.listDocuments(
        appwriteUrlDatabaseId,
        appwriteUrlCollectionId,
        queries
      );
    } catch (e) {
      console.log("AppWrite service :: getPosts :: error", e);
      return false;
    }
  }
}

const postService = new PostService();

export default postService;
