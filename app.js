var yargs = require('yargs');
var geocode = require('./geocode/geocode');

var getWeather = require('./weather/weather');


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


geocode.geocodeAddress(argv.a, (errMessage, results) => {
	if (errMessage) {
		console.log(errMessage);
	} else {
		console.log(results.address);
		getWeather.weather(results.latitude, results.longitude, (errMessage, weatherResults) => {
			if (errMessage) {
				console.log(errMessage);
			} else {
				console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
			}	
		});		
	}
});


/*
var asyncAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof(a) === 'number' && typeof(b) === 'number') {
				resolve(a + b);
			} else {
				reject('Not a number dumbass');
			}
		}, 2500);
	});
}

var somePromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Hey you');
		reject('request failed');
	}, 2500);
});

somePromise.then((data) => {
	console.log(data);
}, (error) => {
	console.log(error);
});


asyncAdd(3, 6).then((data) => {
	console.log(data);
	return asyncAdd(data, 3);
}).then((data2) => {
	console.log(data2);
}).catch((errorMessage) => {
	console.log(errorMessage);
});
*/
