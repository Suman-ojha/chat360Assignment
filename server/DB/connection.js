const mongoose = require('mongoose');
let DB_USER = 'sumanojha1999'
let DB_PASSWORD = 'I6IgNu5lWd76vhqI'
let DB_HOSTNAME = 'cluster0.ndpk7dz.mongodb.net'
let DB_NAME = 'chat360test'
 var mongoDB = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_NAME}`;
const connectToMongoDB = async () => {
    try {
      await mongoose.connect(mongoDB);
      console.log('Database Connected '+mongoDB);
    } catch (error) {
      console.log('Connection failed...', error);
    }
  };
  
  connectToMongoDB();