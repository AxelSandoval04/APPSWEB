import mongoose from 'mongoose';

const connection = async (): Promise<void> => {
    const mongoUrl = 'mongodb://localhost:27017/User'; // "User" es el nombre de la base de datos
    try {
        await mongoose.connect(mongoUrl);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

export default connection;