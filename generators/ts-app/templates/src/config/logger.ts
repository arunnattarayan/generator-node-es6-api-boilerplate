import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

export default new class Logger {
  public logger: morgan;
  constructor() {
    const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'public/logs/access.log'), { flags: 'a' });
    this.logger = morgan('combined', { stream: accessLogStream });
  }

  get loggerMiddlerware() {
    return this.logger;
  }

  get devLogger() {
    return morgan('dev');
  }
}();
