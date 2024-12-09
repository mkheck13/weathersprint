import {APIKEY} from "./environment.js";


let mainLocation = document.getElementById("mainLocation");
let mainTemp = document.getElementById("mainTemp");
let mainImage = document.getElementById("mainImage");
let mainDesc = document.getElementById("mainDesc");
let mainMinTemp = document.getElementById("mainMinTemp");
let mainMaxTemp = document.getElementById("mainMaxTemp");

let currentWeatherData;
let locationData;
let userSearch;
let userLat;
let userLong;

navigator.geolocation.getCurrentPosition(success, errorFunc);

async function success(position) {
    if(userSearch.value){
        // const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch.value}&limit=5&appid=${APIKEY}`);
        const data = await promise.json();
        userLat = data[0].lat;
        userLong = data[0].lon;
    }
    else{
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
    }
    await currentWeatherAPI();
    await getLocationAPI();
    
}

async function errorFunc(error) {
    console.log(error.message);
    userLat = 37.9577;
    userLong = -121.2908;

    await currentWeatherAPI();
    await getLocationAPI();
    
}


// function to get the temp for the current location
async function currentWeatherAPI(){
    // const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${APIKEY}&units=imperial`);
    const data = await promise.json();
    currentWeatherData = data;

    // current temp
    mainTemp.innerHTML = Math.round(currentWeatherData.main.temp);
    // max temp
    mainMaxTemp.innerHTML = Math.round(currentWeatherData.main.temp_max)
    // min temp
    mainMinTemp.innerHTML = Math.round(currentWeatherData.main.temp_min)
    // description
    mainDesc.innerHTML = currentWeatherData.weather[0].main.toLowerCase();
}
currentWeatherAPI();

// function to get and display the current location with state and country
async function getLocationAPI() {
    // const location = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=37.9577&lon=-121.2908&limit=5&appid=${APIKEY}`);
    const data = await location.json();
    locationData = data;

    // location
    mainLocation.innerHTML = `${locationData[0].name.toUpperCase()}, ${locationData[0].state.toUpperCase()}, ${locationData[0].country.toUpperCase()}`;
    
}
getLocationAPI();