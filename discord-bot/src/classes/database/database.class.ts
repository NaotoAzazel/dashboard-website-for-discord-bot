import mongoose from "mongoose";

export class Database {
  private static _instance: Database | null = null;
  private _connectUrl: string;

  private constructor(connectUrl: string) {
    this._connectUrl = connectUrl;
  }

  static async connect(
    connectUrl: string,
    maxRetries: number = 5,
    delay: number = 3_000, // 3 sec delay
  ) {
    let retries = 0;

    while (retries < maxRetries) {
      try {
        if (!Database._instance) {
          await mongoose.connect(connectUrl);
          Database._instance = new Database(connectUrl);
        } else {
          await mongoose.disconnect();
          await mongoose.connect(connectUrl);
        }

        console.log("Successfully connected to database");
        return Database._instance;
      } catch (error) {
        retries += 1;
        console.warn(
          `Attempt ${retries} - Error while connecting to database:`,
          error,
        );
        if (retries < maxRetries) {
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    }

    throw new Error("Failed to connect to database after maximum retries");
  }
}
