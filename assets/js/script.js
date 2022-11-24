//Test javascript to ensure it is linked
console.log('hello!')

// Set global variables
let searchBtn = document.querySelector('#searchBtn');

// Request the data from the weather api based on name of searched city
function fetchWeatherData (cityName) {
    let requestedLocation = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=ca61e90c1abb3d9512ca5b59ac1ae589`

    fetch(requestedLocation)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Log the data
        console.log(data)
        // Setting local variables
        let city = data.name;
        let date = data.dt_txt;
        let temp = data.main.temp;
        let windSpeed = data.wind.speed;
        let humidity = data.main.humidity;
        let picture = data.weather[0].icon;
        let latitude = data.coord.lat;
        let longitude = data.coord.lon;

        // Append the data to the page
        let cityData = document.createElement('p');
        let dateData = document.createElement('p');
        let tempData = document.createElement('p');
        let windSpeedData = document.createElement('p');
        let humidityData = document.createElement('p');
        let pictureData = document.createElement('p');

        // What is added to the page as a string
        cityData.innerHTML = `Name of City: ${city}`;
        dateData.innerHTML = `Date: ${moment(date).format('MMM Do YYYY')}`;
        pictureData.innerHTML = picture;
        tempData.innerHTML = `Temperature: ${temp}`;
        windSpeedData.innerHTML = `Wind Speed: ${windSpeed} mph`;
        humidityData.innerHTML = `Humidity: ${humidity}`;

        let currWeather = document.querySelector('#currWeather');
        currWeather.append(cityData, dateData, pictureData, tempData, windSpeedData, humidityData);

        // Five day forecast
        function longForecast () {
            let findWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=ca61e90c1abb3d9512ca5b59ac1ae589`;
            fetch (findWeather)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
                let dataList = data.list
                for (let i = 0; i < dataList.length; i+=8) {
                    console.log(dataList[i])
                    let forecast = document.createElement('div');
                    forecast.style.flex = "25%";

                    let largeDiv = document.createElement('div');
                    // Styling for parent div
                    largeDiv.style.display = 'block';
                    largeDiv.style.border = '2px solid rgb(212, 0, 255)';
                    largeDiv.style.margin = '20px';

                    // Assigning local variables for forecast data
                    let forecastTempData = document.createElement('p');
                    let forecastHumidityData = document.createElement('p');
                    let forecastWindSpeedData = document.createElement('p');
                    let forecastDateData = document.createElement('p');
                    let forecastPictureData = document.createElement('p');

                    forecastPictureData = dataList[i].weather[0].icon;
                    forecastDateData = `Date: ${moment(dataList[i].dt_txt).format('MMM Do YYYY')}`;
                    forecastTempData.innerHTML = `Temperature: ${dataList[i].main.temp}`;
                    forecastHumidityData.innerHTML = `Humidity: ${dataList[i].main.humidity}`;
                    forecastWindSpeedData.innerHTML = `Wind Speed: ${dataList[i].wind.speed} mph`;

                    let forecastWeather = document.querySelector('#forecastWeather');
                    largeDiv.append(forecastPictureData, forecastDateData, forecastTempData, forecastHumidityData, forecastWindSpeedData);
                    forecastWeather.append(largeDiv);
                }
            })
        }
        longForecast();
    })
}

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let myLocation = document.querySelector('#location').value;
    console.log(myLocation);
    fetchWeatherData(myLocation)
})