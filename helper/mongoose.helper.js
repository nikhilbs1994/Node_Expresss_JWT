const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017', {
    dbName: process.env.MONGO_DB || 'auth_jwt',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    // eslint-disable-next-line
    console.log('Mongodb connected');
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.log(err.message); 
  });

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('eror', (err) => {
  // eslint-disable-next-line
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line
  console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  // eslint-disable-next-line
  process.exit(0);
});
