import Config from './config';

class Development extends Config {
  constructor () {
    super();
    this.JWT_TOKEN_SECRECT = 'RESTFULAPIs';
  }

  devConfig () {
    return this.config;
  }
}

export default new Development().devConfig();
