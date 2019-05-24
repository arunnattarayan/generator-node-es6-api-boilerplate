.. _label-project-apidoc:

API
===

Integrated `swagger API Doc <https://www.npmjs.com/package/swagger-ui-express >`_. By default it loads in root path.

You can change the API doc path in code (/src/config/express-middleware.js).

.. code-block:: javascript

    [swagger] () {
        this.exApp.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));
    }