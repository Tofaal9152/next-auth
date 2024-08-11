import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/`, {
      dbName: "nextjs",
    });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connection successfully");
    });
    connection.on("error", () => {
      console.log("MongoDB connection error");
      process.exit()
    });
  } catch (error) {
    console.log("Internal server error");
  }
};
 