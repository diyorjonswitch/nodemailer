import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbname = process.env.DB_NAME || 'users';
    const mongoURI = `mongodb://127.0.0.1:27017/${dbname}`;

    await mongoose.connect(mongoURI)
    console.log("db connention");
    
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export {connectDB};

