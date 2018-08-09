var yargs = require('yargs');
var axios = require('axios');

var argv = yargs.options({
	a: {
		demand: true,
		alias: 'address',
		describe: 'Address to fetch weather information',
		string: true
	}
})
.help()
.alias('help', 'h')
.argv;

console.log(argv);

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoCodeURL).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherURL = `https://api.darksky.net/forecast/cc116ebdf16b787cb0deffb5e2fb86f0/${lat},${lng}`;
	return axios.get(weatherURL);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((error) => {
	if (error.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers');
	} else {
		console.log(error.message);
	}
});
