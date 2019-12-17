const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1a7f7ce2567e1182be21daac4aa8a88f/' + latitude + ',' + longitude + '?units=si';
    request({ url, json: true }, (err, { body }) => {
        if(err) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Poorly formatted request. Try another search!', undefined)
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    }) 
}
 
module.exports = forecast