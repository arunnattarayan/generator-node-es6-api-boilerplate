import mongoose from 'mongoose';
import Environment from '../environments';

const config = Environment;
const dbConectionString = config.DB_URL;
class DBConection {
  constructor() {
    mongoose.connect(dbConectionString, { useNewUrlParser: true });
  }

  public errorHandler() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.info(`${dbConectionString} DB is Connected with this App`);
    });
  }
}

export = DBConection;
