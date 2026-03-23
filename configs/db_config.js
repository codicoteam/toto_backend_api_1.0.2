const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('‚ùå MONGODB_URI not found in .env file');
            process.exit(1);
        }

        console.log('Ì≥° Connecting to MongoDB Atlas...');
        console.log('URI:', mongoURI.replace(/:[^:]*@/, ':****@')); // Hide password in logs
        
        // Set mongoose options
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log(`‚úÖ Database connected successfully to MongoDB Atlas`);
        return conn;
    } catch (error) {
        console.error('‚ùå Database connection error:', error.message);
        console.log('\nÌ¥ß Troubleshooting tips:');
        console.log('1. Check if your IP address is whitelisted in MongoDB Atlas');
        console.log('2. Verify the username and password in the connection string');
        console.log('3. Make sure the database name is correct');
        console.log('4. Check if your network allows outbound connections to port 27017');
        process.exit(1);
    }
};

module.exports = connectDB;
