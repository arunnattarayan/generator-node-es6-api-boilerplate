import Config from './config';

class Test extends Config {
  constructor () {
    super();
    this.JWT_TOKEN_SECRECT = 'RESTFULAPIs';
    this.DB_URL = 'mongodb://127.0.0.1:27017/node-babel-test';
    this.PORT = 3001;
  }

  testConfig () {
    return this.config;
  }
}

export default new Test().testConfig();
