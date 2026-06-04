import mongoose from "mongoose";
import logger from "./logger";
import config from "./index";

//singleton design pattern for MongoDB connection : it states that a class has only one instance and provides a global point of access to it. This is useful for managing resources like database connections, where you want to ensure that only one connection is created and shared across the application.

class MongodbConnection {
  constructor() {
    this.connection = null;
  }
  /**
   * Connect to MongoDB using Mongoose.
   * @returns {Promise<mongoose.Connection>} The MongoDB connection instance.
   */
  async connect() {
    try {
      if (this.connection) {
        logger.info("MongoDB connection already exists");
        return this.connection;
      }
      await mongoose.connect(config.mongo.uri, {
        dbName: config.mongo.dbName,
      });

      this.connection = mongoose.connection;
      logger.info(`MongoDB connected: ${config.mongo.uri}`);
      this.connection.on("error", (err) => {
        logger.error(`MongoDB connection error: ${err}`);
      });
    } catch (error) {
      logger.error(`Error connecting to MongoDB: ${error}`);
      throw error;
    }
  }

  /**
   * This method disconnects from MongoDB. It checks if there is an active connection and, if so, it calls `mongoose.disconnect()` to close the connection. After disconnecting, it sets the `connection` property to null and logs a message indicating that MongoDB has been disconnected. If there is an error during the disconnection process, it logs the error and rethrows it.
   */
  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        this.connection = null;
        logger.info("MongoDB disconnected");
      }
    } catch (error) {
      logger.error(`Error disconnecting from MongoDB: ${error}`);
      throw error;
    }
  }
  /**
   * Gets the current MongoDB connection instance. This method simply returns the `connection` property of the class, which holds the active MongoDB connection. If there is no active connection, it will return null.
   * @returns {mongoose.Connection}
   */
  getConnection() {
    return this.connection;
  }
}
