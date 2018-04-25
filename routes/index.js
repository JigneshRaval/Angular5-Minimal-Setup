// index.js
// Main router index file which contains other sub routers

const routes = require('express').Router();

// Import all other router files
const articlesRouter = require('./articles.router');
const carsRouter = require('./cars.router');

module.exports = function (db) {

    // Articles Router file
    routes.use('/articles', articlesRouter(db)); // Pass database as parameter

    routes.use('/cars', carsRouter);

    return routes;
};


/**
 * // Example 1
 * // =======================
 * // Import in somefile
    let myLib = require("lib.js")(params);

    // lib.js
    module.exports = function(options) {
        var app = options.app;
        var param2 = options.param2;
    };
 *
 * // Example 2
 * // ========================
 * class MyClass {
        constructor ( arg1, arg2, arg3 )
        myFunction1 () {...}
        myFunction2 () {...}
        myFunction3 () {...}
    }

    module.exports = ( arg1, arg2, arg3 ) => { return new MyClass( arg1,arg2,arg3 ) }
 *
 */
