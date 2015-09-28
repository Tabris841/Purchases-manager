
// Dependecies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create Purchase Schema
var PurchaseSchema = new Schema({
    name: {type: String, required: true},
    store: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    day: [{type: Schema.Types.ObjectId, ref: 'day' }]
});

// Export the model schema.
module.exports = mongoose.model('purchase', PurchaseSchema);