const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('../routes');

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  throw new Error('Set environment variable MONGO_URL for Mongodb connection');
}

module.exports = (app) => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true
  });
  mongoose.set('useCreateIndex', true);
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Please make sure Mongodb is installed and running!:'));
  
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use('/api', apiRoutes);
};