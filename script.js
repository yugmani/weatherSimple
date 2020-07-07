
// API_KEY for maps api
// let MY_KEY = 'e84e170dc52b22e9142ded9022d2d046';
// let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

let MY_KEY = "";
const cityEl = document.getElementById("city-name");

// Function to get weather data from url using api key.
const getWeatherData = (city) => {
    
    if (MY_KEY === ""){
      var answer = confirm("Do you have your weather API key?");
      if(answer){
      MY_KEY = prompt("Enter your API key [https://openweathermap.org/]");
      }
      else {
        cityEl.textContent = "Get your API key from https://openweathermap.org/";
        cityEl.style.color = "red";
        cityEl.style.fontSize = "20px";
        return;
      }
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MY_KEY}`)
    .then(response=>{
        return response.json()
    })
    .then(weatherData=>{
        showWeatherData(weatherData);
    }).catch(()=>{
      cityEl.textContent = "City Not Found";
      cityEl.style.color = "red";
      cityEl.style.transform = "rotate(10deg)";
      cityEl.style.transition = "2s ease";
    })
};

// Function to get user input as a name of city
const searchCity = () => {
    var searchEl = document.querySelector('#search-icon');
    searchEl.addEventListener('click', function(e) {
        e.preventDefault();
        const cityInput = document.getElementById('city-input');
        const city = cityInput.value;
        getWeatherData(city);
    })
 
};

// Function to display the weather information in HTML 
const showWeatherData = (weatherData) => {
    
    const weatherType = document.getElementById("weather-type");
    const tempEl = document.getElementById("temp");
    const minTemp = document.getElementById("min-temp");
    const maxTemp = document.getElementById("max-temp");
    const humidityEl = document.getElementById("humidity");
    cityEl.textContent = weatherData.name;
    let weatherMain = weatherData.weather[0].main;
    weatherType.textContent = weatherMain;

    humidityEl.textContent = weatherData.main.humidity;
    tempEl.textContent = Math.round((weatherData.main.temp - 273.15) * 9/5 + 32);
    minTemp.textContent = Math.round((weatherData.main.temp_min - 273.15) * 9/5 + 32);
    maxTemp.textContent = Math.round((weatherData.main.temp_max - 273.15) * 9/5 + 32);
    weatherImage(weatherMain, weatherArray);
};


// Initialize the city search function. 
searchCity();

// Array of weather types
var weatherArray = [
  "clear",
  "clouds",
  "drizzle",
  "rain",
  "snow",
  "storm",
  "thunderstorm",
  "sunny"
]

// Function to insert image based on weathertype.
const weatherImage = (type, array)=>{
  const imageEl = document.getElementById("weather-image");
  let src = "";
  let imgDiv = "";
  if (imageEl.hasChildNodes()) {
    imageEl.removeChild(imageEl.childNodes[0]);
  }

  for (i=0; i<= array.length; i++){
      if (type.toLowerCase() === array[i]){
         src = `./images/${array[i]}.png`;
      } 
  }
  if(src==="") {
    src = "./images/searchicon.png";
  } 
  
  imgDiv = document.getElementById("png");
  imgDiv.src = src;
  }