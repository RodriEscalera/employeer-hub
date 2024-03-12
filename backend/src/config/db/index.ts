import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_DB_NAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
    );
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

const createDatabase = async () => {
  try {
    const connection = await mongoose.createConnection(
      `mongodb://${process.env.MONGO_DB_NAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
    );
    const exists = await connection.db
      .listCollections({ name: process.env.MONGO_DB_NAME })
      .hasNext();
    if (!exists) {
      console.log(`Creating database '${process.env.MONGO_DB_NAME}'`);
      await connection.db.createCollection(`${process.env.MONGO_DB_NAME}`);
    }
    await connection.close();
  } catch (error) {
    console.error("Failed to create database", error);
  }
};

const syncDB = async (): Promise<void> => {
  mongoose.set("debug", false);
  await createDatabase();
  await connectToDB();
};

export default syncDB;
