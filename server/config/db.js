import mongoose from 'mongoose';

// A function to establish connection to the MongoDB Database (Local or Cloud Atlas)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Successfully connected to MongoDB Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // Stop the server application if database connection fails
  }
};

export default connectDB;
