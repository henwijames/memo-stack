import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.log(`Error connect to MONGODB: ${error}`);
    process.exit(1); //Exit with failure
  }
};
