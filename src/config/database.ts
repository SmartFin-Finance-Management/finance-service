import mongoose from 'mongoose';

const dbURI = 'mongodb://127.0.0.1:27017/Financedb';

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));