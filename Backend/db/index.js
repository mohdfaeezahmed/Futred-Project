import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectWithDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Connection hosted ${connectionInstance.connection.host}`)
  } catch (err) {
    console.error(`ERROR : ${err}`);
    throw err;
  }
};

export default connectWithDB;
