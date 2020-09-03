const request = require("request");

const geocode = (address , callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoiYWtkb2dhbmhha2FubiIsImEiOiJja2ViYXBocDQwNnltMnJueHM4OGp1cHJtIn0.DLtb3H0TtNiL8VpDK2xVjw&limit=1`;
    request({url , json:true } , (error , {body})=>{
        if(error){
            callback("Unabled to connect to location services" , undefined);
        }else if( body.message == "Forbidden"|| body.message=="Not Found" || body.features.length ===0){
            callback("Please submit a valid location" , undefined);

        }else{
            callback(undefined , {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                text: body.features[0].text
            });
        }
    });

}

module.exports = geocode;