import Environment from './config/environments';
import Express from './config/express-middleware';
import DBConection from './config/db/connection';
let serverInstace = null;
const config = Environment.config;

export default new class Server extends Express {
  constructor () {
    console.info(config);
    super(config);
    const port = config.PORT;
    if (!serverInstace) {
      this.app.listen(port, () => console.log(`Example app listening on port ${port}!`));
      this.DB();
      serverInstace = 'serverInstace';
    }
  }

  DB () {
    const db = new DBConection();
    db.errorHandler();
  }

  expressApp () {
    return this.app;
  }
}();
