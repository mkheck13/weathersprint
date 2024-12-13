// import {APIKEY} from "./environment.js";


// Reviewers API Key for testing
// let APIKEY = 'put your key here and uncomment it'


// Current day
let mainLocation = document.getElementById("mainLocation");
let mainTemp = document.getElementById("mainTemp");
let mainImage = document.getElementById("mainImage");
let mainDesc = document.getElementById("mainDesc");
let mainMinTemp = document.getElementById("mainMinTemp");
let mainMaxTemp = document.getElementById("mainMaxTemp");

// day 1
let dayOneMin = document.getElementById("dayOneMin");
let dayOneMax = document.getElementById("dayOneMax");
let dayOneIcon = document.getElementById("dayOneIcon");
let dayOne = document.getElementById("dayOne");

// day2
let dayTwoMin = document.getElementById("dayTwoMin");
let dayTwoMax = document.getElementById("dayTwoMax");
let dayTwoIcon = document.getElementById("dayTwoIcon");
let dayTwo = document.getElementById("dayTwo");

// day 3
let dayThreeMin = document.getElementById("dayThreeMin");
let dayThreeMax = document.getElementById("dayThreeMax");
let dayThreeIcon = document.getElementById("dayThreeIcon");
let dayThree = document.getElementById("dayThree");

// day4
let dayFourMin = document.getElementById("dayFourMin");
let dayFourMax = document.getElementById("dayFourMax");
let dayFourIcon = document.getElementById("dayFourIcon");
let dayFour = document.getElementById("dayFour");

// day 5
let dayFiveMin = document.getElementById("dayFiveMin");
let dayFiveMax = document.getElementById("dayFiveMax");
let dayFiveIcon = document.getElementById("dayFiveIcon");
let dayFive = document.getElementById("dayFive");

// Min/Max Arrays
let tempMaxs1 = [];
let tempMins1 = [];
let tempMaxs2 = [];
let tempMins2 = [];
let tempMaxs3 = [];
let tempMins3 = [];
let tempMaxs4 = [];
let tempMins4 = [];
let tempMaxs5 = [];
let tempMins5 = [];
let tempMaxs6 = [];
let tempMins6 = [];
let conditions1 = [];
let conditions2 = [];
let conditions3 = [];
let conditions4 = [];
let conditions5 = [];
let conditions6 = [];

let userSearch = document.getElementById("userSearch");
let searchBtn = document.getElementById("searchBtn");

let liValue;

let lat;
let lon;

let currentDate = new Date();
let date2 = new Date(currentDate.getTime() + 86400000)
let date3 = new Date(currentDate.getTime() + 86400000 * 2)
let date4 = new Date(currentDate.getTime() + 86400000 * 3)
let date5 = new Date(currentDate.getTime() + 86400000 * 4)
let date6 = new Date(currentDate.getTime() + 86400000 * 5)


dayOne.textContent = `${new Date(currentDate.getTime() + 86400000).toLocaleDateString('default', { weekday: 'long' })}`
dayTwo.textContent = `${new Date(currentDate.getTime() + 86400000 * 2).toLocaleDateString('default', { weekday: 'long' })}`
dayThree.textContent = `${new Date(currentDate.getTime() + 86400000 * 3).toLocaleDateString('default', { weekday: 'long' })}`
dayFour.textContent = `${new Date(currentDate.getTime() + 86400000 * 4).toLocaleDateString('default', { weekday: 'long' })}`
dayFive.textContent = `${new Date(currentDate.getTime() + 86400000 * 5).toLocaleDateString('default', { weekday: 'long' })}`


navigator.geolocation.getCurrentPosition(success, errorFunc);

//Getting location on Success
async function success(position) {
    if(userSearch.value){
        const citySearch = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userSearch.value}&limit=5&appid=${APIKEY}`);
        const cityName = await citySearch.json();
        lat = cityName[0].lat;
        lon = cityName[0].lon;
    }
    else if (liValue) {
        const citySearch = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${liValue}&limit=5&appid=${APIKEY}`);
        const cityName = await citySearch.json();
        lat = cityName[0].lat;
        lon = cityName[0].lon;
    }else{
        lat = position.coords.latitude
        lon = position.coords.longitude
    }

    // Current Weather
    const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`)
    const weatherData = await weatherPromise.json();

    // Forcast Weather
    const forecastPromise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`)
    const forecastData = await forecastPromise.json();

    // Reverse Geolocation
    const locationPromise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${APIKEY}`)
    const locationData = await locationPromise.json();

    tempMaxs1.push(weatherData.main.temp_max)
    tempMins1.push(weatherData.main.temp_min)
    conditions1.push(weatherData.weather[0].main)

    for (let i = 0; i < forecastData.list.length; i++) {
        let unixTime = new Date(forecastData.list[i].dt * 1000)
        if (unixTime.toLocaleDateString('default') === currentDate.toLocaleDateString('default')) {
            tempMaxs1.push(forecastData.list[i].main.temp_max)
            tempMins1.push(forecastData.list[i].main.temp_min)
            conditions1.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date2.toLocaleDateString('default')) {
            tempMaxs2.push(forecastData.list[i].main.temp_max)
            tempMins2.push(forecastData.list[i].main.temp_min)
            conditions2.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date3.toLocaleDateString('default')) {
            tempMaxs3.push(forecastData.list[i].main.temp_max)
            tempMins3.push(forecastData.list[i].main.temp_min)
            conditions3.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date4.toLocaleDateString('default')) {

            tempMaxs4.push(forecastData.list[i].main.temp_max)
            tempMins4.push(forecastData.list[i].main.temp_min)
            conditions4.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date5.toLocaleDateString('default')) {
            tempMaxs5.push(forecastData.list[i].main.temp_max)
            tempMins5.push(forecastData.list[i].main.temp_min)
            conditions5.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date6.toLocaleDateString('default')) {
            tempMaxs6.push(forecastData.list[i].main.temp_max)
            tempMins6.push(forecastData.list[i].main.temp_min)
            conditions6.push(forecastData.list[i].weather[0].main)
        }
    }

    // Display Data
    let currentTemp = Math.round(weatherData.main.temp);
    mainTemp.textContent = `${currentTemp}°`
    mainDesc.innerText = `${forecastData.list[0].weather[0].main.toUpperCase()}`;

    let currentMin = Math.round(Math.min(...tempMins1));
    let currentMax = Math.round(Math.max(...tempMaxs1));
    mainMinTemp.textContent = `${currentMin}°`
    mainMaxTemp.textContent = `${currentMax}°`

    dayOneMin.textContent = `${Math.round(Math.min(...tempMins2))}°`
    dayOneMax.textContent = `${Math.round(Math.max(...tempMaxs2))}°`

    dayTwoMin.textContent = `${Math.round(Math.min(...tempMins3))}°`
    dayTwoMax.textContent = `${Math.round(Math.max(...tempMaxs3))}°`

    dayThreeMin.textContent = `${Math.round(Math.min(...tempMins4))}°`
    dayThreeMax.textContent = `${Math.round(Math.max(...tempMaxs4))}°`

    dayFourMin.textContent = `${Math.round(Math.min(...tempMins5))}°`
    dayFourMax.textContent = `${Math.round(Math.max(...tempMaxs5))}°`

    dayFiveMin.textContent = `${Math.round(Math.min(...tempMins6))}°`
    dayFiveMax.textContent = `${Math.round(Math.max(...tempMaxs6))}°`


    let locationName = locationData[0].name;
    if(locationData[0].state){
        let stateName = locationData[0].state;
        mainLocation.textContent = `${locationName}, ${stateName}`;
    }
    else{
        mainLocation.textContent = `${locationName}`;
    }

    let frequent1 = mostFrequent(conditions1, conditions1.length)
    let frequent2 = mostFrequent(conditions2, conditions2.length)
    let frequent3 = mostFrequent(conditions3, conditions3.length)
    let frequent4 = mostFrequent(conditions4, conditions4.length)
    let frequent5 = mostFrequent(conditions5, conditions5.length)
    let frequent6 = mostFrequent(conditions6, conditions6.length)

    conditionsCheck(frequent1, mainImage);
    conditionsCheck(frequent2, dayOneIcon);
    conditionsCheck(frequent3, dayTwoIcon);
    conditionsCheck(frequent4, dayThreeIcon);
    conditionsCheck(frequent5, dayFourIcon);
    conditionsCheck(frequent6, dayFiveIcon);

}

function errorFunc(error) {
    error.message
}

// Displaying Icons
async function conditionsCheck(string, forecast) {
    switch (string) {
        case "clear sky":
            forecast.src = "../assets/sun.png";
            break;
        case "Clear":
            forecast.src = "../assets/sun.png";
            break;
        case "rain":
            forecast.src = '../assets/rainy.png';
            break;
        case "Clouds":
            forecast.src = '../assets/cloud.png';
            break;
        case "few clouds":
            forecast.src = "../assets/cloudy.png";
            break;
        case "scattered clouds":
            forecast.src = "../assets/cloud.png";
            break;
        case "broken clouds":
            forecast.src = "../assets/cloud.png";
            break;
        case "shower rain":
            forecast.src = "../assets/rainy.png";
            break;
        case "thunderstorm":
            forecast.src = "../assets/storm.png";
            break;
        case "snow":
            forecast.src = "../assets/snowflake.png";
            break;
        case "haze":
            forecast.src = "../assets/haze.png";
            break;
        case "light rain":
            forecast.src = "../assets/rainy.png";
            break;
        default:
            break;
    }

}

function mostFrequent(arr, n) {
    var hash = new Map();
    for (var i = 0; i < n; i++) {
        if (hash.has(arr[i]))
            hash.set(arr[i], hash.get(arr[i]) + 1)
        else
            hash.set(arr[i], 1)
    }

    // find the max frequency 
    var max_count = 0, res = -1;
    hash.forEach((value, key) => {
        if (max_count < value) {
            res = key;
            max_count = value;
        }
    });

    return res;
}

// Search Function
userSearch.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        success(userSearch.value)
        userSearch.value = "";

        e.preventDefault();
        return false;
    }
});

function click(evnt){
    liValue = evnt.target.innerText.split(",")[0];
    success(liValue)
}