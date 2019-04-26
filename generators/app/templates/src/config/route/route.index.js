
class Route {
  constructor () {
    this.apiPathName = 'api';
    this.versionNumber = 'v1';
  }

  fullPath () {
    return '/' + this.apiPathName + '/' + this.versionNumber;
  }

  getUrl (url) {
    url = url + '';
    url = url[0] === '/' ? url : '/' + url;
    return url;
  }
}

export default new Route();
