const apiKey = "83b7a43cdaa1654cd9997e37aa2ac705";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".Wind");
const WeatherIcon = document.querySelector(".Weather-icon");

function updateWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  async function checkWeather() {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        cityElement.innerHTML = data.name; 
        tempElement.innerHTML = Math.round(data.main.temp) + "°C   " + data.weather[0].main;
        humidityElement.innerHTML = data.main.humidity + "%";
        windElement.innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
          WeatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
          WeatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
          WeatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
          WeatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Rain") {
          WeatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Snow") {
          WeatherIcon.src = "images/snow.png";
        } else if (data.weather[0].main == "Haze") {
          WeatherIcon.src = "images/fog.png";
        }
      } else {
        alert("Failed to fetch weather data.");
      }
    } catch (error) {
      alert("An error occurred: " + error);
    }
  }

  checkWeather();
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  updateWeather(city);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value;
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    updateWeather(city);
  }
});
