const http = require('http');
const https = require('https');
const api = require('./api.json');

// Print out temp details
const printWeather = (weather) => {
	const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
	console.log(message);
}
// Print out error message
const printError = (error) => {
	console.error(error.message);
}

const get = (query) => {
	const readableQuery = query.replace('_', ' ');
	try {
		const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`,
		response => {
			if(response.statusCode === 200) {
				let body = '';
				// Read the data
				response.on('data', chunk => {
					body += chunk;
				});
				response.on('end', () => {
					try {
						// parse data
						const weather = JSON.parse(body);
						if(weather.location) {				
							// print the data
							printWeather(weather);
						} else {
							const queryError = new Error(`The location "${readableQuery}" was not found.`);
							printError(queryError);
						}	
					} catch (error) {
						// parse error
						printError(error);
					}
				});
			} else {
				// Status code error
				const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${https.STATUS_CODES[response.statusCode]})`);
				printError(statusCodeError);
			}	
		});
		request.on('error', printError);
	} catch (error) {
		printError(error);
	}	
}

module.exports.get = get;


























