import dotenv from 'dotenv';
import Developemnt from './development';
import Production from './production';
import Test from './test';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const ENV = process.env.NODE_ENV;

class Environment {

  public configVal: any;
  public configENV: any;

  constructor() {
    dotenv.config();
    switch (ENV) {
      case 'production':
        this.configENV = Production;
        break;
      case 'test':
        this.configENV = Test;
        break;
      default:
        this.configENV = Developemnt;
    }
    this.configVal = this.configENV;
  }

  public config() {
    return this.configVal;
  }
}

const config = new Environment();

export = config.config();
