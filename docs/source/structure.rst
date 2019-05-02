.. _label-project-structure:

Project Structure
=================

Your project will look like this::


    ├── package.json
    ├── public
    │   └── logs
    │       └── access.log
    ├── README.md
    ├── src
    │   ├── app
    │   │   └── auth
    │   │       ├── AuthRoute.js
    │   │       ├── UserController.js
    │   │       ├── UserMiddlerware.js
    │   │       ├── UserModel.js
    │   │       ├── UserRoute.js
    │   │       └── UserService.js
    │   ├── config
    │   │   ├── db
    │   │   │   └── connection.js
    │   │   ├── environments
    │   │   │   ├── config.js
    │   │   │   ├── development.js
    │   │   │   ├── index.js
    │   │   │   ├── production.js
    │   │   │   └── test.js
    │   │   ├── express-middleware.js
    │   │   ├── logger.js
    │   │   └── route
    │   │       ├── route.index.js
    │   │       └── routes.js
    │   └── server.js
    ├── test
    │   ├── index.js
    │   ├── shared.spec.js
    │   └── users
    │       └── users.spec.js

src
---

`src` is the source code directory::

    ├── src
    │   ├── app
    │   │  
    │   ├── config
    │   │   
    │   └── server.js

* ``app`` contains all needed components 
* ``config`` has all the configurations like ``DB``, ``ENV`` 
* ``server.js`` is the app boostrap file 


Structure your solution by components
-------------------------------------

Instead of ``MVC`` pattern we recommended components based pattern::

    ├── src
    │   ├── app
    │   │   └── auth
    │   │       ├── AuthRoute.js
    │   │       ├── UserController.js
    │   │       ├── UserMiddlerware.js
    │   │       ├── UserModel.js
    │   │       ├── UserRoute.js
    │   │       └── UserService.js

* ``auth`` is the component name and that contains ``route``, ``Controller``, ``middleware``, ``model``, and the ``service`` files.

config
------

* Config folder structure::
    
    ├── src
    |   ├── config
    │   │   ├── db
    │   │   │   └── connection.js
    │   │   ├── environments
    │   │   ├── express-middleware.js
    │   │   ├── logger.js
    │   │   └── route


* ``DB`` holds the information of MongoDB connection
* ``environments`` use to define `ENV` variables. We can set different values for different ENV.    
* ``express-middleware`` deines express middleware need to run this app
* ``logger.js`` logger details are defined here
* ``route`` creating interface between our components (indeside `src/app` ) and application.


::

    ├── src
    |   ├── config
    │   │   ├── environments
    │   │   │   ├── config.js
    │   │   │   ├── development.js
    │   │   │   ├── index.js
    │   │   │   ├── production.js
    │   │   │   └── test.js

config.js
+++++++++

It holds common ENV variables across all environments. ``development``, ``production``, and the``test`` are extends this file.

route
+++++

::

    ├── src
    |   ├── config
    │   │   └── route
        │   │       ├── route.index.js
        │   │       └── routes.js

Need to link our components in routes.js like this

.. code-block:: javascript

    import UserRoute from '../../app/auth/UserRoute';

    const Routes = [
    {
        url: 'users',
        route: UserRoute,
        gaurd: false
    }
    ];

    export default Routes;

* ``url`` group name of api endpoint
* ``route`` component route object
* ``gaurd`` (optional) if you want to skip JWT verification set false. By default it sets true
