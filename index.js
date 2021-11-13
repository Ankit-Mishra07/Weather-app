const timeel = document.getElementById("time")
const dateel = document.getElementById("date")

const currentWeatherItemEl = document.getElementById("current-weather-items")

const timezone = document.getElementById("time-zone")

const countryEl = document.getElementById("country")
const WeatherForcastEl = document.getElementById("weather-forcast")

const currentTemlEl = document.getElementById("current-temp")

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const API_KEY = "1ddf6812bbb8afff8c25ea8c00dacac5"

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate()
    const day = time.getDay()
    const hour = time.getHours()
    const hoursIn12 = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes()
    const ampm = hour >= 12 ? "PM" : "AM"

    timeel.innerHTML = hoursIn12 + ":" + minutes + ` ` + `<span id="am-pm">${ampm}</span>`

    dateel.innerHTML = days[day] + ", " + date + " " + months[month]

},1000)


function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    
    })
}
getWeatherData()