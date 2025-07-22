import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        mongoose.connection.on('error', (err) => console.error('Database Connection Error:', err));
        
        // Connect to MongoDB using the URI from environment variables
        // The database name is already included in the URI
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('MongoDB connection initialized');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;