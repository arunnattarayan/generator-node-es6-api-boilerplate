import Express from 'express';
import DBConection from './config/db/connection';
import Environment from './config/environments';
import ExpressMiddlerware from './config/express-middleware';

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public static bootstrap(): Server {
    return new Server();
  }

  public app: Express.Application;
  protected config: any;

  constructor() {
    this.app = Express();
    this.dbConfig();
    this.config = Environment;
    ExpressMiddlerware.init(this.app, this.config);
    this.main();
  }

  public main() {
    console.log(this.config);
    const port = this.config.PORT;
    this.app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  }

  private dbConfig() {
    const db = new DBConection();
    db.errorHandler();
  }
}

const server = Server.bootstrap();
// server.main();
export = server.app;
