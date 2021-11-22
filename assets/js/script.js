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
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            // list-group append an li to it with just set text
            // console.log(response.name);
            var searchedCities = $(".list-group");
            searchedCities.append('<button type="button" class="btn btn-warning my-1">' + response.name + "</button>");
        });
    }
});