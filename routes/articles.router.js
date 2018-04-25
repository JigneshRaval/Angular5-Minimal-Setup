// articles.router.js
const routes = require('express').Router();

module.exports = function (db) {

    //
    routes.get('/', (request, response) => {
        return response.status(200).json({
            status: 'All articles are listed successfully.'
        });
    });

    routes.post('/create', (request, response) => {
        db.insert(request.body, function (err, newDoc) {
            // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
            if (err) {
                return err;
            }
            return response.status(200).json({
                status: 'success',
                message: 'You have successfully created Article.',
                data: newDoc
            });
        });
    });

    return routes;
};
