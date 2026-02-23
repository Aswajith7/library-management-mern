const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.log('❌ MongoDB connection error:', err.message);
    process.exit(1); // stop the server if DB fails to connect
  }
};

module.exports = connectDB;