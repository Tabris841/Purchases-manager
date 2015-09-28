
// Dependecies
var mongoose = require('mongoose');

// Create Purchase Schema
var PurchaseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    day: {type: String, required: true},
    store: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
});

// Export the model schema.
module.exports = PurchaseSchema;