module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest': true,
    'mocha': true
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'semi': [1, 'always']
  }
}
