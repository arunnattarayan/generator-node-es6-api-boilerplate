import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

let loggerInstace = null;
export default new class Logger {
  constructor () {
    if (!loggerInstace) {
      let accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'public/logs/access.log'), { flags: 'a' });
      this.logger = morgan('combined', { stream: accessLogStream });
    }
  }

  get loggerMiddlerware () {
    return this.logger;
  }

  get devLogger () {
    return morgan('dev');
  }
}();
