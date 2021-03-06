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

    timeel.innerHTML = (hoursIn12  < 10 ? '0' + hoursIn12 : hoursIn12) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ` ` + `<span id="am-pm">${ampm}</span>`

    dateel.innerHTML = days[day] + ", " + date + " " + months[month]

},1000)


function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherData(data)
        })
    
    })
}
getWeatherData()


function showWeatherData(data) {

    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N' + data.lon + 'E'

    currentWeatherItemEl.innerHTML = 
    `  <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>

`;
let otherDayForCast = ``
data.daily.forEach((day, idx) => {
    if(idx == 0) {
        currentTemlEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
        <div class="other">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        <div class="temp">Night : ${day.temp.night}&#176; C </div>
        <div class="temp">Day : ${day.temp.day}&#176; C</div>
        </div>
        
        `
    }else {
        otherDayForCast += `
        
        <div class="weather-forcast-item">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
            <div class="temp">Night : ${day.temp.night}&#176; C </div>
            <div class="temp">Day : ${day.temp.day}&#176; C</div>
        </div>
        
        `

    }
})


WeatherForcastEl.innerHTML = otherDayForCast

}