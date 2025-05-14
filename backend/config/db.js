import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
  
  // eats on click mongodb link:
  // "mongodb+srv://root:root123@cluster0.enzftjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"