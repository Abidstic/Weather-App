let weather = {
  apiKey: "44ea91bddf9f87677c8828f96c40c96b",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apiKey +
        "&units=metric"
    ).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => console.log(this.displayWeather(data)));
      } else if (response.status === 404) {
        alert("City not found");
      }
    });
  },
  fetchWeather2: function(lat,long){
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            long +
            "&appid=" +
            this.apiKey +
            "&units=metric"
    ).then((response) => {
        if (response.status === 200) {
            response
                .json()
                .then((data) => console.log(this.displayWeather(data)));
        } else if (response.status === 404) {
            alert("City not found");
        }
    });

  },
  displayWeather: function (data) {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(parseInt(temp)) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity :" + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed :" + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?"+ name +"')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchBox").value);
  },
};
const tempText = document.querySelector('.temp');
tempText.addEventListener('click', e => {
  const t = tempText.innerText.split('°')[0];
  if (tempText.innerText.includes('C')) {
    tempText.innerText = Math.round(parseInt(t) * 1.8 + 32) + '°F';
  } else {
    tempText.innerText = Math.round((parseInt(t) - 32) * 0.556) + '°C';
  }
});
document.querySelector(".searchButton").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".searchBox")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  document.querySelector(".location").addEventListener("click",()=>{
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(onSuccess,onError);

    }
    else
    {
      alert("Your Browser is Faltu");
    }

  });
  function onSuccess(position)
  {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    weather.fetchWeather2(lat,long);
  }
  
  function onError(error)
  {
    console.log(error);
  }
 weather.fetchWeather("Dhaka");

