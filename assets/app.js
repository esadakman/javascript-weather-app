const input = document.querySelector("input");
<<<<<<< HEAD
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
=======
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
>>>>>>> 54d215c8f8b8f044e10a275b939cb7a1f95ea433
      const key = "ceb84ee212e3c4957be78d213c7ac491";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&APPID=${key}`;
      let res = await fetch(url);
      let data = await res.json();
<<<<<<< HEAD
      addWeatherData(data);
    } catch (error) {
      alert("Please enter a valid city name !");
      input.value = "";
=======
      console.log(data);
      addWeatherData(data);
    } catch (error) {
      // alert("There is not a city called" + input.value);
      alert(error);
>>>>>>> 54d215c8f8b8f044e10a275b939cb7a1f95ea433
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
<<<<<<< HEAD
  if (name.includes("Province")) {
    name = name.replace("Province", "").trim();
  }
  cardDiv.className = "card";
  // console.log(cardDiv);
  cardDiv.innerHTML = `
=======
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
>>>>>>> 54d215c8f8b8f044e10a275b939cb7a1f95ea433
    <h2 class="city">${name}<sup>${country}</sup></h2>
    <h1 class="temp">${Math.floor(temp)}°C</h1>
    <div class="tempIcon">
    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="" class="icon">
    <div class=${description}>Cloudy</div>
    </div>
<<<<<<< HEAD
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
=======
    <div class="humidity">Humidity: ${humidity}</div>
    <div class="wind">Wind: ${speed}</div>
    </div>`;
  input.value = "";
};
// getWeather();
>>>>>>> 54d215c8f8b8f044e10a275b939cb7a1f95ea433

button.addEventListener("click", (e) => {
  getWeather();
  e.preventDefault();
});

<<<<<<< HEAD
trash.addEventListener("click", (e) => {
  container.innerHTML = "";
  e.preventDefault();
});

=======
>>>>>>> 54d215c8f8b8f044e10a275b939cb7a1f95ea433
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      getWeather();
    }
  });
