// Dependecies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create Purchase Schema
var DaySchema = new Schema({
	day: {
		type: String
	},
	purchases: [{
		name: {
			type: String,
			required: true
		},
		store: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
	}]
});

// Export the model schema.
module.exports = mongoose.model('day', DaySchema);