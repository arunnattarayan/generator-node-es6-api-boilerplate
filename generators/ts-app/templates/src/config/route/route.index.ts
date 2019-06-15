
class Route {

  private apiPathName: string;
  private versionNumber: string;

  constructor() {
    this.apiPathName = 'api';
    this.versionNumber = 'v1';
  }

  public fullPath() {
    return '/' + this.apiPathName + '/' + this.versionNumber;
  }

  public getUrl(url) {
    url = url + '';
    url = url[0] === '/' ? url : '/' + url;
    return url;
  }
}

export default new Route();
