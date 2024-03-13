import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

const syncDB = async (): Promise<void> => {
  mongoose.set("debug", false);
  await connectToDB();
};

export default syncDB;
