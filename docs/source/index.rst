Express App Generator
==================================================
This Generator will help to us create a express api application skeleton along with these keys features

 * Code with ES6 Style
 * Eslint Standard
 * JWT authentication
 * Test cases with Mocha
 * Travis

Requirements
------------
* `Node`_ 10.15.1+
* `MongoDB`_ 3.4+
* `yeoman-generator`_ 3.2.0+

.. _Node: https://nodejs.org/en/docs/
.. _MongoDB: https://docs.mongodb.com/manual/installation/
.. _yeoman-generator: https://www.npmjs.com/package/yeoman-generator

Stepup ENV
----------
Steps to create a node application skeleton::

    $ npm install -g yo
    $ npm install -g generator-node-api-boilerplate
    $ yo node-api-boilerplate
    
Now the app was created and start running in your system 

Usage
-----

start the express server::

   $ npm start
 
Test The unit testcases::
   
   $ npm start
   
find Lint issues in source code::

   $ npm run lint

find Lint issues in test cases::

   $ npm run lint:test
   
.. note::
 
 ``npm run lint:test:fix and npm run lint:fix`` used to fix the lint errors 
    
