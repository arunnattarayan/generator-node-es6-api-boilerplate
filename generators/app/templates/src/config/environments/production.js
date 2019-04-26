import Config from './config';

class Production extends Config {
  constructor () {
    super();
    this.prodConfig();
  }

  prodConfig () {
    return this.config;
  }
}

export default new Production().prodConfig();
