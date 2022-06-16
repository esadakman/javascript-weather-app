const input = document.querySelector("input");
const button = document.querySelector("button");
const container = document.querySelector(".container");
const cities = document.querySelector(".cities");

// const apiKey = "ceb84ee212e3c4957be78d213c7ac491";
const getWeather = async () => {
  if (container.innerHTML.toLowerCase().includes(input.value.toLowerCase())) {
    alert(input.value + " already written data");
  } else if (cities.children.length > 3) {
    alert("only available for 4 cities");
  } else {
    try {
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
      // const res = await fetch(url);
      // const data = await res.json();
      const key = "ceb84ee212e3c4957be78d213c7ac491";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&APPID=${key}`;
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      addWeatherData(data);
    } catch (error) {
      // alert("There is not a city called" + input.value);
      alert(error);
    }
  }
};

const addWeatherData = (data) => {
  let { name } = data;
  let { temp, humidity } = data.main;
  let { icon, description } = data.weather[0];
  let { speed } = data.wind;
  let { country } = data.sys;
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  console.log(cardDiv);
  cardDiv.innerHTML = `
    h2 class="city">${name}<sup>${country}</sup></h2>
    <h1 class="temp">${Math.floor(temp)}°C</h1>
    <div class="tempIcon">
    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="" class="icon">
    <div class=${description}>Cloudy</div>
    </div>
    <div class="humidity">Humidity: ${humidity}</div>
    <div class="wind">Wind: ${speed}</div>`;
  // container.appendChild(addWeatherData);
  cities.innerHTML += `
    <div class="card">
    <h2 class="city">${name}<sup>${country}</sup></h2>
    <h1 class="temp">${Math.floor(temp)}°C</h1>
    <div class="tempIcon">
    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="" class="icon">
    <div class=${description}>Cloudy</div>
    </div>
    <div class="humidity">Humidity: ${humidity}</div>
    <div class="wind">Wind: ${speed}</div>
    </div>`;
  input.value = "";
};
// getWeather();

button.addEventListener("click", (e) => {
  getWeather();
  e.preventDefault();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      getWeather();
    }
  });
