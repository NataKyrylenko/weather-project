const weatherDataContainer = document.querySelector(".weather-data");
const getWeatherButton = document.querySelector("#get-weather-button");

const getWeather = async () => {
  const cityValue = document.querySelector("#input-city").value.trim();
  const apiKey = "98a15a296a4e42da4b093ad3c1e8a315";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`;

  if (cityValue === "") {
    alert("Please enter a city name");
    return;
  }
  weatherDataContainer.textContent = "Loading...";

  try {
    const response = await fetch(apiUrl);
    const dataWeather = await response.json();
    console.log(dataWeather);
    if (!response.ok) {
      throw Object.assign(new Error("Some response error message"), {
        response: dataWeather,
      });
    } else {
      displayWeather(dataWeather);
    }
  } catch (error) {
    weatherDataContainer.style.color = "rgb(142, 3, 3)";
    weatherDataContainer.textContent = error.response.message;
  }
};

const displayWeather = (dataWeather) => {
  const temperature = Math.round(dataWeather.main.temp - 273.15);
  const icon = dataWeather.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

  weatherDataContainer.innerHTML = `
        <h3>${dataWeather.name}</h3>
        <p>${temperature} ºC</p>
        <img src="${iconUrl}">
    `;
};

getWeatherButton.addEventListener("click", getWeather);
