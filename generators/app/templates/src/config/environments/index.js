import Developemnt from './development';
import Production from './production';
import Test from './test';
import dotenv from 'dotenv';
console.info(process.env['NODE_ENV']);
process.env['NODE_ENV'] = process.env['NODE_ENV'] || 'development';
const ENV = process.env.NODE_ENV;
let instance = null;

class Environment {
  constructor () {
    if (!instance) {
      dotenv.config();
      let config;
      switch (ENV) {
        case 'production':
          config = Production;
          break;
        case 'test':
          config = Test;
          break;
        default:
          config = Developemnt;
      }
      this.configVal = config;
    }
  }

  get config () {
    return this.configVal;
  }
}

export default new Environment();
