var request = require('request');

/*
var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Google Servers', null);
		} else if (body.status === 'ZERO_RESULTS') {
			callback('Unable to find this address', null);
		} else {
			callback(null, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});		
		}
	});
};

module.exports = {
	geocodeAddress
}
*/


var geocodeAddress2 = (address) => {
	var encodedAddress = encodeURIComponent(address);
	return new Promise((resolve, reject) => {
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject('Unable to connect to Google Servers');
			} else if (body.status === 'ZERO_RESULTS') {
				reject('Unable to find this address');
			} else {
				resolve({
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});		
			}
		});
	});	
};

geocodeAddress2('90006').then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
})

