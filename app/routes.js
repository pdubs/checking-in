var Checkin = require('./models/checkin');

function getCheckins(res){
	Checkin.find(function(err, checkins) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(checkins);
		}
	});
};

module.exports = function(app) {
	app.get('/api/checkins', function(req, res) {
		getCheckins(res);
	});

	app.post('/api/checkins', function(req, res) {
		Checkin.create({
			text : req.body.text,
			lat : req.body.lat,
			lon : req.body.lon,
			time : req.body.time,
			done : false
		}, function(err, checkin) {
			if (err) {res.send(err);}
			getCheckins(res);
		});
	});

	app.delete('/api/checkins/:checkin_id', function(req, res) {
		Checkin.remove({
			_id : req.params.checkin_id
		}, function(err, checkin) {
			if (err) {res.send(err);}
			getCheckins(res);
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};