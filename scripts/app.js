import {APIKEY} from "./environment.js";


let mainLocation = document.getElementById("mainLocation");
let mainTemp = document.getElementById("mainTemp");
let mainImage = document.getElementById("mainImage");
let mainDesc = document.getElementById("mainDesc");
let mainMinTemp = document.getElementById("mainMinTemp");
let mainMaxTemp = document.getElementById("mainMaxTemp");

let currentWeatherData;
let locationData;

// navigator.geolocation.getCurrentPosition(success, errorFunc);

// function apiCall () {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${APIKEY}`)
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
//         console.log(data);
//     })
// }

// apiCall();

async function currentWeatherAPI(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${APIKEY}&units=imperial`);
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

async function getLocationAPI() {
    const location = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=37.9577&lon=-121.2908&limit=5&appid=${APIKEY}`);
    const data = await location.json();
    locationData = data;

    // location
    mainLocation.innerHTML = locationData[0].name.toUpperCase();
    
}
getLocationAPI();