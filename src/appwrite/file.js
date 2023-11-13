import { Client, ID, Storage } from "appwrite";

import conf from "../conf/conf";

export class FileService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteUrlBucketId,
        ID.unique(),
        file
      );
    } catch (e) {
      console.log("AppWrite File service :: uploadFile :: error", e);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteUrlBucketId, fileId);
      return true;
    } catch (e) {
      console.log("AppWrite File service :: deleteFile :: error", e);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteUrlBucketId, fileId);
    } catch (e) {
      console.log("AppWrite File service :: getFilePreview :: error", e);
      return false;
    }
  }
}

const fileService = new FileService();

export default fileService;
