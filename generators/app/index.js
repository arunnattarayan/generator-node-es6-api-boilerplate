/* eslint-disable no-unused-expressions */
`use strict`;

const Generator = require(`yeoman-generator`);
const mkdirp = require(`mkdirp`);
const yosay = require(`yosay`);
const chalk = require('chalk');
const path = require('path');
const MESSAGE = {
  INIT: `${chalk.yellow.bold('Welcome to Express Api ')} ${chalk.yellow('A solid JS stack to develop with')}`,
  CONFIG: `${chalk.yellow.bold('Started APP Configurations')}`,
  WRITE: `${chalk.green.bold('Creating App Files')}`,
  END: `${chalk.blue.bold('App files are created.')} ${chalk.yellow.bold('npm start')} ${chalk.blue.bold('to kickoff the server')}`,
  INSTALL: `${chalk.yellow.bold('Installling Dependencies')}`,
  CONFLICT: `${chalk.red.bold('-----------------')}`
};
const files = [
  `src/server.js`,
  `src/app/auth/AuthRoute.js`,
  `src/app/auth/UserController.js`,
  `src/app/auth/UserMiddlerware.js`,
  `src/app/auth/UserModel.js`,
  `src/app/auth/UserRoute.js`,
  `src/app/auth/UserService.js`,
  `src/config/logger.js`,
  `src/config/express-middleware.js`,
  `src/config/db/connection.js`,
  `src/config/environments/config.js`,
  `src/config/environments/development.js`,
  `src/config/environments/index.js`,
  `src/config/environments/production.js`,
  `src/config/environments/test.js`,
  `src/config/route/route.index.js`,
  `src/config/route/routes.js`,
  `test/index.js`,
  `test/shared.spec.js`,
  `test/users/users.spec.js`,
  `public/docs/swagger.json`,
  `.babelrc`,
  `.nycrc.json`,
  `Dockerfile`,
  `docker-compose.yml`,
  `.dockerignore`
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
      this.tPath('eslintrc.js'),
      this.dPath(`${props.dest}/.eslintrc.js`),
      props
    );
    this.copyTpl(
      this.tPath('_README.md'),
      this.dPath(`${props.dest}/README.md`),
      props
    );
  }

  _log (message) {
    this.log('\n');
    this.log('\t', message);
    this.log('\n\n');
  }

  _yosay (message) {
    this.log(yosay(message, { maxLength: 18 }));
  }

  _getAppDir (props) {
    return props.createDirectory ? path.join(process.cwd(), props.name) : process.cwd();
  }

  _getPrompts () {
    return [
      /* #region createDirectory */
      {
        type: `confirm`,
        name: `createDirectory`,
        message: `Would you like to create a new directory for your project?`
      },
      /* #endregion */
      /* #region Project Name */
      {
        type: `input`,
        name: `name`,
        message: `Please enter your project name`,
        when: function (props) {
          return props.createDirectory;
        },
        default: this.appname
      },
      /* #endregion */
      /* #region ts */
      {
        type: `confirm`,
        name: `ts`,
        message: `Create app with Type Script`,
        default: true
      },
      /* #endregion */
      /* #region installDependencies */
      {
        type: `confirm`,
        name: `installDependencies`,
        message: `Would you like me to install dependencies?`,
        default: false
      },
      /* #endregion */
      /* #region installDependencies */
      {
        type: `list`,
        name: `packageManager`,
        message: `Choose the package manager`,
        choices: [
          {
            name: `Yes, with npm`,
            value: `npm`
          },
          {
            name: `Yes, with yarn`,
            value: `yarn`,
            checked: true
          }
        ],
        when: function (props) {
          return props.installDependencies;
        },
        default: `yarn`
      }
      /* #endregion */
    ];
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
    // this.log(yosay(MESSAGE.INIT, { maxLength: 18 }));
    this._yosay(MESSAGE.INIT);
  }

  /**
   * Printing question to users
  */
  prompting () {
    return this.prompt(this._getPrompts()).then(props => {
      this.props = props;
    });
  }

  configuring () {
    this._log(MESSAGE.CONFIG);
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
    this._log(MESSAGE.WRITE);
    let props = this.props;
    if (props.ts) {
      this.composeWith(require.resolve('../ts-app'), { props: props });
    } else {
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
    let props = this.props;
    if (props.installDependencies) {
      process.chdir(this._getAppDir(props));
      if (props.packageManager === `yarn`) {
        this.yarnInstall();
      } else {
        this.npmInstall();
      }
    }
  }

  /**
   * Post installation
   */
  end () {
    this._log(MESSAGE.END);
  }
  /* #endregion */
};
