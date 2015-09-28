
// Dependicies
var restful = require('node-restful');

// Export
module.exports = function(app, route) {

    // Set the controller for REST
    var rest = restful.model('purchase', app.models.purchase).methods(['get','put','post','delete']);

    // Register the endpoint
    rest.register(app, route);

    // Return middleware
    return function (req, res, next) {
        next();
    }

};