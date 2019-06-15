/* eslint-disable no-unused-expressions */
`use strict`;

const Generator = require(`yeoman-generator`);
const mkdirp = require(`mkdirp`);

const files = [
  `src/server.ts`,
  `src/app/auth/AuthRoute.ts`,
  `src/app/auth/UserController.ts`,
  `src/app/auth/UserMiddlerware.ts`,
  `src/app/auth/UserModel.ts`,
  `src/app/auth/UserRoute.ts`,
  `src/app/auth/UserService.ts`,
  `src/config/logger.ts`,
  `src/config/express-middleware.ts`,
  `src/config/db/connection.ts`,
  `src/config/environments/config.ts`,
  `src/config/environments/development.ts`,
  `src/config/environments/index.ts`,
  `src/config/environments/production.ts`,
  `src/config/environments/test.ts`,
  `src/config/route/route.index.ts`,
  `src/config/route/routes.ts`,
  `src/test/users/shared.spec.ts`,
  `src/test/users/users.spec.ts`,
  `public/docs/swagger.json`,
  `Dockerfile`,
  `docker-compose.yml`,
  `.dockerignore`,
  `tslint.json`,
  `tsconfig.json`
];

module.exports = class extends Generator {
  /* #region private methods */
  // copy(tPath('editorconfig'), dPath('.editorconfig'));
  _createProjectFileSystem (props, copyOpts) {
    files.forEach(f => {
      this.copyTpl(
        this.tPath(f),
        this.dPath(`${props.dest}/${f}`),
        props,
        copyOpts
      );
    });
    this.copyTpl(
      this.tPath('_package.json'),
      this.dPath(`${props.dest}/package.json`),
      props
    );
    this.copyTpl(
      this.tPath('_README.md'),
      this.dPath(`${props.dest}/README.md`),
      props
    );
  }

  /* #endregion */
  /* #region main methods */
  /**
   * Override Generator constructor
   */
  constructor (args, opts) {
    super(args, opts);
    this.argument(`appname`, { type: String, required: false });
  }

  /**
   * Display welcome message
   */
  initializing () {
  }

  /**
   * Printing question to users
  */
  prompting () {

  }

  configuring () {
  }

  /**
   * Compose other generators
   */
  default () {

  }

  /**
   * Creating files
   */
  writing () {
    let props = this.options.props;
    props.projectName = props.name || this.appname;
    props.dest = props.name || `.`;
    this.sourceRoot();
    this.destinationPath(props.dest);
    const copyOpts = {
      globOptions: {
        ignore: ['_package.json']
      }
    };
    this.copy = this.fs.copy.bind(this.fs);
    this.copyTpl = this.fs.copyTpl.bind(this.fs);
    this.tPath = this.templatePath.bind(this);
    this.dPath = this.destinationPath.bind(this);
    mkdirp(`${props.dest}/public/logs`, err => {
      if (err) console.error(err);
      this._createProjectFileSystem(props, copyOpts);
    });
  }

  /**
   * Display errors
   */
  conflicts () {

  }

  /**
   * Install npm modules
   */
  install () {

  }

  /**
   * Post installation
   */
  end () {

  }
  /* #endregion */
};
