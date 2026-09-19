/**
 * @author aliasgarbootwala@gmail.com
 */

import mongoose from "mongoose";
import { injectable } from "inversify";
import { IDatabase } from "../types/database.types.js";

mongoose.set("strictQuery", true);
mongoose.set("autoIndex", false);

@injectable()
 class MongoDatabase implements IDatabase{
  private readonly mongoUri: string;

  constructor(mongoUri: string) {
    if (!process.env.MONGO_URI) {
      console.log(process.env.MONGO_URI)
      throw new Error("MONGO_URI is not defined");
    }
    this.mongoUri = process.env.MONGO_URI!;
  }
  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
}

export default MongoDatabase;