var mongoose = require('mongoose');

module.exports = mongoose.model('Checkin', {
	text : {type : String, default: ''},
	lat : {type: String, default: ''},
	lon : {type: String, default: ''},
	time : {type: String, default: ''}
});