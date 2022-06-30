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
  displayWeather: function (data) {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity :" + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed :" + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?"+ name +"')";
    document.querySelector(".temp").addEventListener("click",()=>{
      if(document.querySelector(".temp").innerText.includes("C")){
        document.querySelector(".temp").innerText =Math.floor(temp * 1.8 + 32) + "°F";
      }
      else{
        document.querySelector(".temp").innerText = temp + "°C";
      }
    });
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchBox").value);
  },
};
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
 weather.fetchWeather("Dhaka");

