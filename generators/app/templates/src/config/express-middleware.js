import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import Logger from './logger';
import Route from './route/route.index';
import Routes from './route/routes';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = require(process.cwd() + '/public/docs/swagger.json');
const parser = Symbol('parser');
const logger = Symbol('logger');
const router = Symbol('router');
const validateToken = Symbol('validateToken');
const swagger = Symbol('swagger');
let ExpressInstance = null;

export default class Express {
  constructor (config) {
    if (!ExpressInstance) {
      this.exApp = express();
      this[parser]();
      this[logger]();
      this[router]();
      this[swagger]();
      this.errorHandler();
      this.config = config;
      ExpressInstance = 'Express';
    }
  }

  [parser] () {
    this.exApp.use(cookieParser());
    this.exApp.use(bodyParser.urlencoded({ extended: true }));
    this.exApp.use(bodyParser.json());
  }

  [logger] () {
    this.exApp.use(Logger.loggerMiddlerware);
    this.exApp.use(Logger.devLogger);
  }

  [validateToken] (isAuthGuard = true) {
    let router = express.Router();
    let errorMsg = { reason: 'UnAuthorized Access' };
    router.use((req, res, next) => {
      if (isAuthGuard) {
        let token = req.headers['x-access-token'];
        if (!token) {
          res.status(403).send(errorMsg).end();
        } else {
          jwt.verify(token, this.config.JWT_TOKEN_SECRECT, (err, decoded) => {
            if (err) {
              errorMsg.reason = err;
              res.status(403).send(errorMsg);
            } else {
              next();
            }
          });
        }
      } else {
        next();
      }
    });
    return router;
  }

  [router] () {
    const router = express.Router();
    Routes.every((route) => {
      router.use(Route.getUrl(route.url), this[validateToken](route.gaurd), route.route);
      return true;
    });
    this.exApp.use(Route.fullPath(), router);
  }

  [swagger] () {
    this.exApp.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));
  }

  errorHandler () {
    process.on('uncaughtException', (err) => {
      console.error('whoops! There was an uncaught error', err);
      // do a graceful shutdown,
      // close the database connection etc.
      // process.exit(1);
    });
  }

  get app () {
    return this.exApp;
  }
}
