import Config from './config';

class Production extends Config {
  constructor() {
    super();
    this.prodConfig();
  }

  public prodConfig() {
    return this;
  }
}

export default new Production().prodConfig();
