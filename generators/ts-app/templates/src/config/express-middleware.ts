import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../public/docs/swagger.json';
import Logger from './logger';
import Route from './route/route.index';
import Routes from './route/routes';

class ExpressMiddlerware {
  private exApp = express.Application;
  private config: any;

  public init(app, config) {
    this.config = config;
    this.exApp = app;
    this.parser();
    this.logger();
    this.router();
    this.swagger();
  }

  public validateToken(isAuthGuard = true) {
    const router = express.Router();
    const errorMsg = { reason: 'UnAuthorized Access' };
    router.use((req, res, next) => {
      if (isAuthGuard) {
        const token = req.headers['x-access-token'];
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

  private parser() {
    this.exApp.use(cookieParser());
    this.exApp.use(bodyParser.urlencoded({ extended: true }));
    this.exApp.use(bodyParser.json());
  }

  private logger() {
    this.exApp.use(Logger.loggerMiddlerware);
    this.exApp.use(Logger.devLogger);
  }

  private router() {
    const router = express.Router();
    Routes.every((route) => {
      router.use(Route.getUrl(route.url), this.validateToken(route.gaurd), route.route);
      return true;
    });
    this.exApp.use(Route.fullPath(), router);
  }

  private swagger() {
    this.exApp.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));
  }
}

export default new ExpressMiddlerware();
