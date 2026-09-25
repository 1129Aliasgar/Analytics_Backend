/**
 * @author aliasgarbootwala@gmail.com
 */

import mongoose from "mongoose";
import { injectable } from "inversify";
import { IDatabase } from "../types/database.types.js";
import ApiError from "../utils/apiError.js";
import { STATUS_CODE } from "../constants/statusCode.js";

mongoose.set("strictQuery", true);
mongoose.set("autoIndex", false);

@injectable()
class MongoDatabase implements IDatabase {
  private readonly mongoUri: string;

  constructor(mongoUri: string) {
    if (!process.env.MONGO_URI) {
      console.log(process.env.MONGO_URI);
      throw new ApiError("MONGO_URI is not defined" , STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
    this.mongoUri = process.env.MONGO_URI!;
  }
  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new ApiError("MongoDB connection error", STATUS_CODE.INTERNAL_SERVER_ERROR, [], "", null, false);
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
}

export default MongoDatabase;
