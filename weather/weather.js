var request = require('request');

var weather = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/cc116ebdf16b787cb0deffb5e2fb86f0/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(null, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature,
			});
		} else {
			callback('Unable to get weather for these coordinates', null);
		} 	
	});
};

module.exports = {
	weather
}