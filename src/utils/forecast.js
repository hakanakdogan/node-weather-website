

const request = require("request");

const forecast = (lat , long ,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=cd88b468d1eeeffd9a5367134c724ac1&query=${encodeURI(lat)},${encodeURI(long)}&units=m`;

    request({url , json:true} , (error , {body})=>{
        const currentWeather = body.current;
        if(error){
            callback("Unable to connect to forecast server" , undefined);
        }else if(body.error){
            callback({errType:body.error.type,errInfo:response.body.error.info} , undefined)
        }else{
            callback(undefined ,  `It is ${currentWeather.weather_descriptions[0]} throughout the day. It is currently ${currentWeather.temperature} degrees out. It feels like ${currentWeather.feelslike} degrees out.`);
        }

    });
}




module.exports = forecast;