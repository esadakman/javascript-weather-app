// https://api.openweathermap.org/data/2.5/weather?q=Ankara&units=metric&appid=ceb84ee212e3c4957be78d213c7ac491
// const icon = document.querySelector(".icon");
// const icon = document.getElementsByClassName("icon");
// const { default: axios } = require("axios");
const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector("span");
const temps = document.querySelector(".temp");
const cloud = document.querySelector(".description");
const humidit = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

let weather = {
  apiKey: "ceb84ee212e3c4957be78d213c7ac491",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ceb84ee212e3c4957be78d213c7ac491`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    let { name } = data;
    let { humidity, temp } = data.main;
    let { icon, description } = data.weather[0];
    let { speed } = data.wind;
    console.log(name, temp, description, humidity, icon, speed);
    cityName.innerText = name;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    temps.innerText = temp + "°C";
    cloud.innerText = description;
    humidit.innerText = "Humidity: %" + humidity;
    wind.innerText = "Wind Speed: " + speed;
  },
};

weather.fetchWeather("ankara");

// https://openweathermap.org/img/wn/01n@2x.png
