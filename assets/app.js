// https://api.openweathermap.org/data/2.5/weather?q=Ankara&units=metric&appid=ceb84ee212e3c4957be78d213c7ac491
const input = document.querySelector("input");
const button = document.querySelector("button");
// const cityName = document.querySelector(".city");
// const temps = document.querySelector(".temp");
// const cloud = document.querySelector(".description");
// const humidit = document.querySelector(".humidity");
// const wind = document.querySelector(".wind");
let arr = [0];
let weather = {
  apiKey: "ceb84ee212e3c4957be78d213c7ac491",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {

    
    if (document.querySelector(".cities").children.length < 4) {
      document.querySelector(".cities");
      let { name } = data;
      let { temp, humidity } = data.main;
      let { icon, description } = data.weather[0];
      let { speed } = data.wind;
      // console.log(name, temp, description, humidity, icon, speed);
      document.querySelector(".cities").innerHTML += `<div class="card">
    
    <h2 class="city">${name}<sup>TR</sup></h2>
    <h1 class="temp">${temp}°C</h1>
    <div class="tempIcon">
    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="" class="icon">
    <div class=${description}>Cloudy</div>
    </div>
    <div class="humidity">Humidity: ${humidity}</div>
    <div class="wind">Wind: ${speed}</div>
    
    </div>`;
    } else {
      alert("too much atttempts");
    }
    arr.push(document.querySelector("input").value)
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

button.addEventListener("click", function () {
  weather.search();
});

// ! enter key

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// weather.fetchWeather("ankara");

// const displayWeather = async () => {
//   const key = "ceb84ee212e3c4957be78d213c7ac491";
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${key}`;
//   if (card.in.toLowerCase().includes(input.value.toLowerCase())) {
//     // alert(input.value + "is already exists");
//     console.log("first");
//   } else {
//     try {
//       const response = await fetch(url);
//       const weatherInfo = await response.json();
//       const { weather, main, name } = weatherInfo;
//       cities.innerHTML += `<div class="card">

//       <h2 class="city">${name}<sup>TR</sup></h2>
//       <h1 class="temp">${Math.floor(main.temp)}°C</h1>
//       <div class="tempIcon">
//           <img src="https://openweathermap.org/img/wn/${
//             weather[0].icon
//           }.png" alt="" class="icon">
//           <div class=${weather[0].description}>Cloudy</div>
//       </div>
//       <div class="humidity">Humidity: ${main.humidity}</div>
//       <div class="wind">Wind: ${wind.speed}</div>

//     </div>`;
//     } catch (error) {
//       alert("There is not a city called" + cityInput.value);
//     } finally {
//       cityInput.value = "";
//     }
//   }
// };
