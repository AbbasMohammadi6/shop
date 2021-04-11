import mongoose from "mongoose";
import colors from "colors";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Mongoose was connected successfuly".cyan.bold);
  } catch (e) {
    console.log(e);
  }
};

export default dbConnect;
