const path = require('path');
// const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

let props;
let prompts;

describe('app', () => {
  beforeAll((done) => {
    prompts = [
      {
        createDirectory: true,
        name: 'node-api',
        installDependencies: false
      }
    ];
    props = prompts;
    return helpers.run(path.join(process.cwd() + '/generators/app'))
      .withPrompts(prompts)
      .on('end', done);
  });

  it('should store prompt answers on props object', () => {
    expect(props.name).toEqual(prompts.name);
    expect(props.createDirectory).toEqual(prompts.createDirectory);
    expect(props.installDependencies).toEqual(prompts.installDependencies);
  });
});
