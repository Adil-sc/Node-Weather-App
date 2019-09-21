const request = require('request');

const forecast = (long, lat, callback) =>{

    const url = `https://api.darksky.net/forecast/a136f05c0857ae493e786878c82ced2b/${long},${lat}?units=si&lang=en`

    request({url:url, json: true}, (error, {body})=>{
        if(error){
            callback('Unavle to connect to weather service. Please try again.',undefined);
        }else if (body.error){
            callback('Unable to find location. Please try again.');
        }else{
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chane of rain. The windspeed is ${body.currently.windSpeed}`

            );

            // callback(undefined,{
            //     summary:response.body.daily.data[0].summary,
            //     temperature: response.body.currently.temperature,
            //     percipProb:  response.body.currently.precipProbability
            // })

        }
    });

}

module.exports = forecast;