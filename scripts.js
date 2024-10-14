function getWeather() {
  var city = document.getElementById("city").value;
  const APIKEY = "cfc450449efc218d245866bf13555deb";
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

  fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching current data");
    });

  function displayWeather(data) {
    var city = data.name;
    var country = data.sys.country;
    var currentWeather = data.weather[0].main;
    var temp = data.main.temp;
    var desc = data.weather[0].description;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;

    function setLocalIcon() {
      const iconElement = document.getElementById("weatherIcon");
      const iconName = getIconNameFromWeatherCondition(currentWeather);
      iconElement.src = `./Assets/${iconName}`;
    }

    function getIconNameFromWeatherCondition(currentWeather) {
      switch (currentWeather) {
        case "Clear":
          return "clear skys.svg";
        case "Clouds":
          return "clouds.svg";
        case "Rain":
          return "rain.svg";
        case "Snow":
          return "snow.svg";
        case "Thunderstorm":
          return "thunderstorm.svg";
        case "Drizzle":
          return "drizzle.svg";
        default:
          return "defaulticon.svg";
      }
    }

    setLocalIcon();
    document.getElementById("cityName").innerHTML = city + ", " + country;
    document.getElementById("temp").innerHTML = temp + "°C";
    document.getElementById("desc").innerHTML = desc;
    document.getElementById("mainDesc").innerHTML = currentWeather;
    document.getElementById("wind").innerHTML = wind + "km/h";
    document.getElementById("humidity").innerHTML = humidity + "%";
  }
}
