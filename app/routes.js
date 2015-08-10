var Checkin = require('./models/checkin');

function getCheckins(res){
	Checkin.find(function(err, checkins) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(checkins); // return all checkins in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all checkins
	app.get('/api/checkins', function(req, res) {

		// use mongoose to get all checkins in the database
		getCheckins(res);
	});

	// create checkin and send back all checkins after creation
	app.post('/api/checkins', function(req, res) {

		// create a checkin, information comes from AJAX request from Angular
		Checkin.create({
			text : req.body.text,
			lat : req.body.lat,
			lon : req.body.lon,
			time : req.body.time,
			done : false
		}, function(err, checkin) {
			if (err)
				res.send(err);

			// get and return all the checkins after you create another
			getCheckins(res);
		});

	});

	// delete a checkin
	app.delete('/api/checkins/:checkin_id', function(req, res) {
		Checkin.remove({
			_id : req.params.checkin_id
		}, function(err, checkin) {
			if (err)
				res.send(err);

			getCheckins(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};