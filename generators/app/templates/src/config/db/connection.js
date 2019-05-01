import Environment from '../environments';
import mongoose from 'mongoose';

const config = Environment.config;
var DBInstance = '';
const dbConectionString = config.DB_URL;
class DBConection {
  constructor () {
    if (!DBInstance) {
      mongoose.connect(dbConectionString, { useNewUrlParser: true });
      DBInstance = 'DBInstance';
    }
  }

  errorHandler () {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.info(`${dbConectionString} DB is Connected with this App`);
    });
  }
}

export default DBConection;
