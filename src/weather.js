const API_KEYS = "ea589d8c99ff9a5420027adec32cda52";

const COORDS = "COORDS";
const LOCATION_CN = "js-location";
const WEATHER_CN = "js-weather";
const WEATHERINFO_CN = "js-weather-info";

const info = document.querySelector(`.${WEATHERINFO_CN}`);
const nowlocation = document.querySelector(`.${LOCATION_CN}`);

function printWeather(weatherObj) {
  nowlocation.innerText = `${weatherObj.location}`;

  const weather = document.querySelector(`.${WEATHER_CN}`);
  const icon = new Image();
  icon.src = `https://openweathermap.org/img/wn/${weatherObj.weather.icon}.png`;
  weather.prepend(icon);

  const desc = document.createElement("div");
  const temp = document.createElement("div");
  desc.innerText = `${weatherObj.weather.desc}`;
  temp.innerText = `${weatherObj.temp_min} / ${weatherObj.temp_max}`;
  info.appendChild(desc);
  info.appendChild(temp);
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (parsedRes) {
      const weatherObj = {
        temp_min: parsedRes.main.temp_min,
        temp_max: parsedRes.main.temp_max,
        location: parsedRes.name,
        weather: {
          desc: parsedRes.weather[0].description,
          icon: parsedRes.weather[0].icon,
        },
      };
      printWeather(weatherObj);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function geoSuccessHandler(pos) {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function geoErrorHandler() {
  nowlocation.innerText = "Unknown";
  info.innerText = "Unknown";
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function initWeather() {
  loadCoords();
}

initWeather();
