// const { default: axios } = require("axios");
const form = document.querySelector("section form");
const input = document.querySelector("section form input");
const msg = document.querySelector("section .feedback");
const cards = document.querySelector("section .cities");
const language = document.querySelector(".language");
const trash = document.querySelector(".trash");
let langSelector = "en";
let unitType = "metric";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    msg.style.display = "flex";
    msg.innerText = `Please enter a city name`;
    timer(5000);
    return;
  }
  getWeatherData();
});

language.addEventListener("click", (e) => {
  if (e.target.classList.contains("tr")) {
    langSelector = "tr";
    document.querySelector("h1").innerHTML = "HAVA DURUMU";
    console.log(langSelector);
  } else if (e.target.classList.contains("eng")) {
    langSelector = "eng";
    document.querySelector("h1").innerHTML = "WEATHER APP";
  }
});

localStorage.setItem(
  "apiKey",
  EncryptStringAES("4d8fb5b93d4af21d66a2948710284366")
);

// ! apikey'imi önce local storage'a attım, ardından EncryptStringAES ile şifreledim. ihtiyacım oluncada DecryptStringAES ile apikeyimi çözümledim

// ! api çekme işlemi için axios kütüphanesini kullandım.
const getWeatherData = async () => {
  //   alert("asd");
  let apikey = DecryptStringAES(localStorage.getItem("apiKey"));
  let inputValue = input.value;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=${unitType}&APPID=${apikey}&lang=${langSelector}&`;
  try {
    // const response = await fetch(url).then(response=> response.json())
    // ? axios sayesinde tek satırda bilgileri çevirip getirdim
    const response = await axios(url);
    const { name, main, weather, wind, sys } = response.data;
    // console.log(wind);
    let iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

    // * forEach => array + nodeList
    // * map, filter, reduce => array
    const cityNames = cards.querySelectorAll(".city");
    // console.log(cityNames);
    const cityNamesArray = Array.from(cityNames);

    if (cityNamesArray.length > 0) {
      const filteredArray = cityNamesArray.filter(
        (cityCard) => cityCard.querySelector(".card span").innerText == name
      );
      // ! aynı şehirlein tekrar girilmemesi için
      if (filteredArray.length > 0) {
        msg.style.display = "flex";
        msg.innerText = `You already know the weather for ${name}, Please search for another city`;
        // ! hata mesajının 5 saniye sonra ekrandan kaybolması için setTimeout fonk. çağırdık
        console.log(filteredArray);
        timer(5000);

        return;
        // ! 4 şehirden fazla girilmemesi içim
      } else if (cards.children.length > 7) {
        msg.style.display = "flex";
        msg.innerText = `You can only check for 8 cities`;
        timer(5000);
        return;
      }
    }

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    // cardDiv.className = "card";
    const cardDivInnerHTML = ` 
      <h2 class="city"><span>${name}</span><sup>${sys.country}</sup></h2>
      <h1 class="temp">${Math.round(main.temp)}°C</h1>
    <div class="tempIcon">
      <img src=" ${iconUrl} " alt="" class="icon">
      <div class=${weather[0].description}>${weather[0].description}</div>
    </div>
    <div class="humidity">Humidity:  ${Math.round(main.humidity)}</div>
    <div class="wind">Wind: ${wind.speed} </div>
    `;
    cardDiv.innerHTML = cardDivInnerHTML;
    // ! prepend sayesinde son eklediğim element en başta yer aldı

    cards.prepend(cardDiv);

    // ! ======================
  } catch (error) {
    msg.style.display = "flex";
    if ((error = 404)) {
      msg.innerText = `Please search a valid city name`;
    } else {
      msg.innerText = error;
    }
    timer(5000);
  }
  form.reset();
};

// ! Her defasında setTimeout fonksiyonu yazmamak için stetimeout fonksiyonunu timer fonksiyonu olarak tanımladım. Text kaybolduktan borderların görünememesi için display none yaptım. Hata ile tekrardan karşılaşılması durumunda ise displayi tekrardan eski haline getirmek için diplay = "" ifadesini kullandım

function timer(time) {
  setTimeout(() => {
    msg.innerText = "";
    msg.style.display = "none";
  }, time);
  form.reset();
}

trash.addEventListener("click", (e) => {
  cards.innerHTML = "";
  e.preventDefault();
});
