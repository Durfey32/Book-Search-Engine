import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname';

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  export default db;

