var searchButton = $("#searchBtn");
var apiKey = "6d18642e9c95b935e37fbca984ddbf75";

// Search function on click
searchButton.click(function(){

    var city = $(".cityInput").val();

    // Variables for current and 5 day weather
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&Appid=" + apiKey + "&units=imperial";
    console.log(urlCurrent)
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&Appid=" + apiKey + "&units=imperial";
    console.log(urlFiveDay)

    if (city == "") {
        console.log(city);
    } else {
        $.ajax({url: urlCurrent, method: "GET"}).then(function (response) {
            // list-group append a city button
            var searchedCities = $(".list-group");
            searchedCities.append('<button type="button" class="btn btn-warning my-1">' + response.name + "</button>");
            // Set to local storage
            localStorage.setItem(savedCities, response.name);
            savedCities = savedCities + 1;

            // Current Weather Card
            var currentWeather = $(".currentWeather").append("<div class = 'row'>").addClass("card-body");
            currentWeather.empty();


            // Fix Date 
            var timeUTC = new Date(response.dt * 1000);
            currentWeather.append("<h3 class='col-10 font-weight-bold justify-content-start'>" + response.name + " " + timeUTC.toLocaleDateString("en-US") + "</h3>");
            currentWeather.append(`<img class="col-2 justify-content-end" src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Add Temp
            var currentTemp = currentWeather.append("<div class='col'></div>");
            currentWeather.append(currentTemp);
            currentTemp.append("<div class='col-12'>" + "Temperature: " + response.main.temp + "</div>");
            // Humidity
            currentTemp.append("<div class='col-12'>" + "Humidity: " + response.main.humidity + "%" + "</div>");
            //Wind Speed: 
            currentTemp.append("<div class='col-12'>" + "Wind Speed: " + response.wind.speed + "</div>");

            // All the stuff for the pointless UV index...
            var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // Get UV
            $.ajax({
                url: uvIndex,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<div class='col-12'>" + "UV Index: " + response.value + "</div>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });
        });

        // 5-day forecast
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            // Array for 5-days 
            var day = [0, 8, 16, 24, 32];
            var forecastWeather = $(".forecastWeather").addClass("card-body");
            var fiveDayDiv = $(".fiveDayStart").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                var fiveDayUTC1 = new Date(response.list[i].dt * 1000);
                fiveDayUTC1 = fiveDayUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class='m-2 p-1 fiveDayColor'>" + "<p>" + fiveDayUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});

// loop to persist searchedCities as savedCities
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var searchedCities = $(".list-group");

    searchedCities.append('<button type="button" class="btn btn-warning my-1">' + city + "</button>");
}
// City key count 
var savedCities = 0;