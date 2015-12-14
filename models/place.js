var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
	zip_code: Number,
	current_temperature: Number
});

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;

