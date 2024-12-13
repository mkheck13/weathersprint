// 5 day Min and Max temps
async function getMaxTemp(data, startIndex, endIndex){
    let maxTemp = 999;

    for(let i = startIndex; i < endIndex; i++){

        if(data.list[i].main.temp_max > maxTemp){
            maxTemp = Math.round(data.list[i].main.temp_max);
        }
    }
    return `${maxTemp}\u00B0`;
}
async function getMinTemp(data, startIndex, endIndex) {
    let minTemp = -999;

    for(let i = startIndex; i < endIndex; i++){

        if(data.list[i].main.temp_min < minTemp){
            minTemp = Math.round(data.list[i].main.temp_min);
        }
    }
    return `${minTemp}\u00B0`;
    
}

// Search Bar
userSearch.addEventListener("keydown", function(e){
    if(e.key === 'Enter'){
        let searchString = "";
        let locationInput = userSearch.value.toLowerCase().trim();
        for(let i = 0; i < locationInput.length; i++){
            if(locationInput.charAt(i) == " "){
                searchString += "+";
            }else if(locationInput.charAt(i) == ","){
                apiSearch += `${searchString},`
                searchString = "";
                i++;
            }else{
                searchString += locationInput.charAt(i);
            }
        }
        apiSearch += searchString;
        console.log(apiSearch);
    }
});

// Search Button
searchBtn.addEventListener("click", () =>{
    
        let searchString = "";
        let locationInput = userSearch.value.toLowerCase().trim();
        for(let i = 0; i < locationInput.length; i++){
            if(locationInput.charAt(i) == " "){
                searchString += "+";
            }else if(locationInput.charAt(i) == ","){
                apiSearch += `${searchString},`
                searchString = "";
                i++;
            }else{
                searchString += locationInput.charAt(i);
            }
        }
        apiSearch += searchString;
        console.log(apiSearch);
    
});

// Display the weather
async function getWeather(apiSearch) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${apiSearch}&appid=${APIKEY}&units=imperial`);
    const data = await promise.json();

    console.log(data);

    mainTemp.innerText = `${Math.round(data.main.temp)}\u00B0`;
    mainMaxTemp.innerText = `${data.main.temp_max}\u00B0`;
    mainMinTemp.innerText = `${data.main.temp_min}\u00B0`;
    mainDesc.innerText = `${data.list[0].weather[0].main.toUpperCase()}`;
    mainLocation.innerHTML = `${city}, ${state}`;
    mainImage.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
}


// navigator.geolocation.getCurrentPosition(success, errorFunc);

async function success(position) {
    // user search
    if(userSearch.value){
        const citySearch = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch.value}&limit=1&appid=${APIKEY}`);
        const cityName = await citySearch.json();
        userLat = cityName[0].lat;
        userLong = cityName[0].lon;
    }
    // current location
    else{
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
    }

    const promise = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLong}&appid=${APIKEY}&units=imperial&cnt=40`);
    const data = await promise.json();
    
    

    getLocationAPI();

    // Getting the Min/Max and Icons
    for(let i = 0; i < data.list.length; i++){
        let addTime = new Date(data.list[i].dt * 1000);

        if(addTime.toLocaleDateString("en-US") === compareCurrentDay.toLocaleDateString("en-US")){
            currentMaxArr.push(data.list[i].main.temp_max);
            currentMinArr.push(data.list[i].main.temp_min);
        }
        else if(addTime.toLocaleDateString("en-US") === compareDay1.toLocaleDateString("en-US")){
            dayOneMaxArr.push(data.list[i].main.temp_max);
            dayOneMinArr.push(data.list[i].main.temp_min);
            dayOneIconArr.push(data.list[i].weather[0].icon);
        }
        else if(addTime.toLocaleDateString("en-US") === compareDay2.toLocaleDateString("en-US")){
            dayTwoMaxArr.push(data.list[i].main.temp_max);
            dayTwoMinArr.push(data.list[i].main.temp_min);
            dayTwoIconArr.push(data.list[i].weather[0].icon);
        }
        else if(addTime.toLocaleDateString("en-US") === compareDay3.toLocaleDateString("en-US")){
            dayThreeMaxArr.push(data.list[i].main.temp_max);
            dayThreeMinArr.push(data.list[i].main.temp_min);
            dayThreeIconArr.push(data.list[i].weather[0].icon);
        }
        else if(addTime.toLocaleDateString("en-US") === compareDay4.toLocaleDateString("en-US")){
            dayFourMaxArr.push(data.list[i].main.temp_max);
            dayFourMinArr.push(data.list[i].main.temp_min);
            dayFourIconArr.push(data.list[i].weather[0].icon);
        }
        else if(addTime.toLocaleDateString("en-US") === compareDay5.toLocaleDateString("en-US")){
            dayFiveMaxArr.push(data.list[i].main.temp_max);
            dayFiveMinArr.push(data.list[i].main.temp_min);
            dayFiveIconArr.push(data.list[i].weather[0].icon);
        }
    }

    // Getting the Icon for 5 day forcast
    const dayOneTrueIcon = IconGet(dayOneIconArr);
    const dayTwoTrueIcon = IconGet(dayTwoIconArr);
    const dayThreeTrueIcon = IconGet(dayThreeIconArr);
    const dayFourTrueIcon = IconGet(dayFourIconArr);
    const dayFiveTrueIcon = IconGet(dayFiveIconArr);

    // Display Current Day
    // mainTemp.innerText = `${Math.round(data.list[0].main.temp)}\u00B0`;
    // mainMaxTemp.innerText = `${Math.round(Math.max(...currentMaxArr))}\u00B0`;
    // mainMinTemp.innerText = `${Math.round(Math.min(...currentMinArr))}\u00B0`;
    // mainDesc.innerText = `${data.list[0].weather[0].main.toUpperCase()}`;
    // mainLocation.innerHTML = `${city}, ${state}`;
    // mainImage.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    
    // Display 5 Day
    dayOneMin.innerText = getMinTemp(data, 0, 8);
    dayOneMax.innerText = getMaxTemp(data, 0, 8);
    // dayOneDay.innerText = `` ;
    dayOneIcon.src = `https://openweathermap.org/img/wn/${dayOneTrueIcon}@2x.png`;

    // dayTwoMin.innerText = `${Math.round(Math.min(...dayTwoMinArr))}\u00B0` 
    // dayTwoMax.innerText = `${Math.round(Math.max(...dayTwoMaxArr))}\u00B0`
    // dayTwoDay.innerText = `` ;
    // dayTwoIcon.src = `https://openweathermap.org/img/wn/${dayTwoTrueIcon}@2x.png`;

    // dayThreeMin.innerText = `${Math.round(Math.min(...dayThreeMinArr))}\u00B0` 
    // dayThreeMax.innerText = `${Math.round(Math.max(...dayThreeMaxArr))}\u00B0`
    // dayThreeDay.innerText = `` ;
    // dayThreeIcon.src = `https://openweathermap.org/img/wn/${dayThreeTrueIcon}@2x.png`;

    // dayFourMin.innerText = `${Math.round(Math.min(...dayFourMinArr))}\u00B0` 
    // dayFourMax.innerText = `${Math.round(Math.max(...dayFourMaxArr))}\u00B0`
    // dayFourDay.innerText = `` ;
    // dayFourIcon.src = `https://openweathermap.org/img/wn/${dayFourTrueIcon}@2x.png`;

    // dayFiveMin.innerText = `${Math.round(Math.min(...dayFiveMinArr))}\u00B0` 
    // dayFiveMax.innerText = `${Math.round(Math.max(...dayFiveMaxArr))}\u00B0`
    // dayFiveDay.innerText = `` ;
    // dayFiveIcon.src = `https://openweathermap.org/img/wn/${dayFiveTrueIcon}@2x.png`;

}

async function errorFunc(error) {
    console.log(error.message);
}

// Search bar Function
// searchBtn.addEventListener("click", function(e){
//     console.clear()
//     success(userSearch.value)
// });

// shorten state names
async function shortState(input, to) {
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY']
    ];

    if(to === 'short'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

        for(let i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(state = states[i][1]);
            }
        }
    }
    else if(to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }
    }
}

function IconGet(iconArr){
    const freq = {};

    iconArr.forEach(status => {
        freq[status] = (freq[status] || 0) + 1;
    });

    let mostIcon;
    let maxFreq = 0;

    Object.keys(freq).forEach(status => {
        if(freq[status] > maxFreq){
            maxFreq = freq[status];
            mostIcon = status;
        }
    });
    return mostIcon;
}



// function to get and display the current location with state and country
async function getLocationAPI() {
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${userLat}&lon=${userLong}&appid=${APIKEY}`);
    const data = await promise.json();
    city = data[0].name;
    state = data[0].state;
    country = data[0].country;

    if(!data[0].state){
        mainLocation.innerText = `${city}, ${country}`;
    }else{
        state = state.toString()
        shortState(`${state}`, 'short')
        mainLocation.innerText = `${city}, ${state}, `
    };
    
}

