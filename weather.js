const https = require('https');
const api = require('./api.json');

// Print out temp details
const printWeather = (weather) => {
	const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
	console.log(message);
}
// Print out error message

const get = (query) => {
	const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`,
		response => {
			let body = '';
			// Read the data
			response.on('data', chunk => {
				body += chunk;
			});
			response.on('end', () => {
				// parse data
				const weather = JSON.parse(body);				
				// print the data
				printWeather(weather);
			});
		});
}

module.exports.get = get;