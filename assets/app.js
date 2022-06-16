const input = document.querySelector("input");
const button = document.querySelector(".button");
const trash = document.querySelector(".trash");
const container = document.querySelector(".container");
const cities = document.querySelector(".cities");
const section = document.querySelector("section");
// const sections = window.getComputedStyle(
//   document.querySelector("section"),
//   ":before"
// );
// const sectionss = window.getComputedStyle(section, "::before");

// .getPropertyValue("color");
const getWeather = async () => {
  if (container.innerHTML.toLowerCase().includes(input.value.toLowerCase())) {
    alert("You've already have " + input.value);
  } else if (cities.children.length > 3) {
    alert("Limited for 4 cities.");
    input.value = "";
  } else {
    try {
      const key = "ceb84ee212e3c4957be78d213c7ac491";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&APPID=${key}`;
      let res = await fetch(url);
      let data = await res.json();
      addWeatherData(data);
    } catch (error) {
      alert("Please enter a valid city name !");
      input.value = "";
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
  if (name.includes("Province")) {
    name = name.replace("Province", "").trim();
  }
  cardDiv.className = "card";
  // console.log(cardDiv);
  cardDiv.innerHTML = `
    <h2 class="city">${name}<sup>${country}</sup></h2>
    <h1 class="temp">${Math.floor(temp)}°C</h1>
    <div class="tempIcon">
    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="" class="icon">
    <div class=${description}>Cloudy</div>
    </div>
    <div class="humidity">Humidity: ${Math.floor(humidity)}</div>
    <div class="wind">Wind: ${speed}</div>`;
  container.appendChild(cardDiv);
  // document.querySelector("section").style.animation = "none"
  // 'none'
  input.value = "";
  console.log(cardDiv.innerHTML.includes("Cloudy"));
  if (cardDiv.innerHTML.includes("Cloudy")) {
    section.background = "url('./img/fog.png')";
    section.style.animation = "";
  }
};

button.addEventListener("click", (e) => {
  getWeather();
  e.preventDefault();
});

trash.addEventListener("click", (e) => {
  container.innerHTML = "";
  e.preventDefault();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      getWeather();
    }
  });
