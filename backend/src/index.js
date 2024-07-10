import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({
  path: ".env",
});

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${"DEVTM_DB"}`
    );
    console.log(
      `\n MongoDB connected: !! DB Host ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.error("MONGODB Connection failed", error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Something went wrong to the root of the service", error);
  });

// export default connectDB;
