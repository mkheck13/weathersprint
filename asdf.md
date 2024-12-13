
//Test Button
testBtn.addEventListener('click', () => {
    currentWeather();
});

// Getting Lat and Lon
navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getWeather(lat, lon)
})

// Day of the Week
let weekDay = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const today = new Date();
console.log(today.toLocaleDateString());

// Use the lat and lon to get location
async function getWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    const data = await response.json();

    getLocation(data.name);
    getInfo(data.name)


    return data;
}

// 
async function getLocation(currentLocation) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${currentLocation}&limit=1&appid=${APIKEY}`);
    const data = await response.json();

    let city = data[0].name;
    let state = data[0].state;

    let time = new Date();
    console.log(time);

    mainLocation.innerText = `${city}, ${state}`

    return data;    
}

async function currentWeather(lat, lon) {
    const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    const data = await currentWeather.json();

    let currentTemp = data.main.temp.toString();
    let highTemp = data.main.temp_max.toString();
    let lowTemp = data.main.temp_min.toString();

    mainTemp.innerText = `${currentTemp.split(".")[0]}\u00B0`
    mainMaxTemp.innerText = `${highTemp.split(".")[0]}\u00B0`
    mainMinTemp.innerText = `${lowTemp.split(".")[0]}\u00B0`

    return data;
}

//five day
async function fiveDayForcast(lat, lon) {
    const fiveDay = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    const data = await fiveDay.json();

    let dayOneTxt = data.list[1].dt_txt;
    let dayTwoTxt = data.list[9].dt_txt;
    let dayThreeTxt = data.list[17].dt_txt;
    let dayFourTxt = data.list[25].dt_txt;
    let dayFiveTxt = data.list[33].dt_txt;

    let dayOneDay = new Date(dayOneTxt);
    let dayTwoDay = new Date(dayTwoTxt);
    let dayThreeDay = new Date(dayThreeTxt);
    let dayFourDay = new Date(dayFourTxt);
    let dayFiveDay = new Date(dayFiveTxt);

    let dayOneMaxTemp = data.list[1].main.temp_max.toString();
    let dayOneMinTemp = data.list[1].main.temp_min.toString();
    let dayTwoMaxTemp = data.list[9].main.temp_max.toString();
    let dayTwoMinTemp = data.list[9].main.temp_min.toString();
    let dayThreeMaxTemp = data.list[17].main.temp_max.toString();
    let dayThreeMinTemp = data.list[17].main.temp_min.toString();
    let dayFourMaxTemp = data.list[25].main.temp_max.toString();
    let dayFourMinTemp = data.list[25].main.temp_min.toString();
    let dayFiveMaxTemp = data.list[33].main.temp_max.toString();
    let dayFiveMinTemp = data.list[33].main.temp_min.toString();

    dayOneMax.innerText = `${dayOneMaxTemp.split(".")[0]}\u00B0`;
    dayOneMin.innerText = `${dayOneMinTemp.split(".")[0]}\u00B0`;
    dayTwoMax.innerText = `${dayTwoMaxTemp.split(".")[0]}\u00B0`;
    dayTwoMin.innerText = `${dayTwoMinTemp.split(".")[0]}\u00B0`;
    dayThreeMax.innerText = `${dayThreeMaxTemp.split(".")[0]}\u00B0`;
    dayThreeMin.innerText = `${dayThreeMinTemp.split(".")[0]}\u00B0`;
    dayFourMax.innerText = `${dayFourMaxTemp.split(".")[0]}\u00B0`;
    dayFourMin.innerText = `${dayFourMinTemp.split(".")[0]}\u00B0`;
    dayFiveMax.innerText = `${dayFiveMaxTemp.split(".")[0]}\u00B0`;
    dayFiveMin.innerText = `${dayFiveMinTemp.split(".")[0]}\u00B0`;

    dayOne.innerText = weekDay[dayOneDay.getDay()];
    dayTwo.innerText = weekDay[dayTwoDay.getDay()];
    dayThree.innerText = weekDay[dayThreeDay.getDay()];
    dayFour.innerText = weekDay[dayFourDay.getDay()];
    dayFive.innerText = weekDay[dayFiveDay.getDay()];

    let dayCurrentWeather = fiveDayData.list[0].weather[0].main;
    let dayOneWeather = fiveDayData.list[1].weather[0].main;
    let dayTwoWeather = fiveDayData.list[9].weather[0].main;
    let dayThreeWeather = fiveDayData.list[17].weather[0].main;
    let dayFourWeather = fiveDayData.list[25].weather[0].main;
    let dayFiveWeather = fiveDayData.list[33].weather[0].main;

    mainImage.src = `assets/images/${dayCurrentWeather}.png`;
    dayOneIcon.src = `assets/images/${dayOneWeather}.png`;
    dayTwoIcon.src = `assets/images/${dayTwoWeather}.png`;
    dayThreeIcon.src = `assets/images/${dayThreeWeather}.png`;
    dayFourIcon.src = `assets/images/${dayFourWeather}.png`;
    dayFiveIcon.src = `assets/images/${dayFiveWeather}.png`;

    console.log(data);
    return data;
}

async function getInfo(cityLocation) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityLocation}&limit=1&appid=${APIKEY}`);
    const data = await response.json();

    let lat = data[0].lat;
    let lon = data[0].lon;

    currentWeather(lat, lon);
    fiveDayForcast(lat, lon);

    return data;
}

userSearch.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        let cityLocation = userSearch.value;
        getInfo(cityLocation);
        userSearch.value = "";
    }
});