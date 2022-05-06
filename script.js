const errorMsg = document.querySelector('#error-msg');
const icon = document.querySelector('#icon-img');
const descriptionElement = document.querySelector('#description');
const cityElement = document.querySelector('#city');
const dateElement = document.querySelector('#date');
const timeElement = document.querySelector('#time');
const temperatureElement = document.querySelector('#temperature span');
const feelsElement = document.querySelector('#feels-info');
const humidityElement = document.querySelector('#humidity-info');
const windElement = document.querySelector('#wind-info');
const searchElement = document.querySelector('#search');
const searchButton = document.querySelector('#searchBtn');

function firstLetterUppercase(sentence) {
  let words = sentence.split(' ');

  let returnString = '';

  words.forEach((word) => {
    returnString += word.slice(0, 1).toUpperCase() + word.slice(1) + ' ';
  });

  return returnString;
}

function getDateOrdeal(date) {
  if (date > 3 && date < 21) return 'th';
  switch (date % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatDate(unix_timestamp, timeZone) {
  var d = new Date((unix_timestamp + timeZone) * 1000);

  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = d.getFullYear();
  var month = months[d.getMonth()];
  var day = days[d.getDay()];
  var date = d.getDate();

  var time =
    day + ' ' + (date + getDateOrdeal(date)) + ' ' + month + ' ' + year;
  return time;
}

function formatTime(unix_timestamp, timeZone) {
  var d = new Date((unix_timestamp + timeZone) * 1000);
  var hour = d.getHours() - 2;
  var min = d.getMinutes();
  var sec = d.getSeconds();

  return (
    (hour < 10 ? '0' + hour : hour) +
    ':' +
    (min < 10 ? '0' + min : min) +
    ':' +
    (sec < 10 ? '0' + sec : sec)
  );
}

function getWeatherData(location) {
  errorMsg.classList.add('hidden');

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=19b5d1468c3fba5120b28cc6e0b497e2&units=metric`
  )
    .then((response) => {
      if (response.ok) return response.json();
      else throw new Error('');
    })
    .then((response) => {
      const descriptionWeather = response.weather[0].description;
      const name = response.name;
      const temp = Math.round(response.main.temp);
      const tempFeels = Math.round(response.main.feels_like);
      const iconCode = response.weather[0].icon;
      const humidity = response.main.humidity;
      const windSpeed = response.wind.speed;
      const timeZone = response.timezone;
      const date = formatDate(response.dt, timeZone);
      const time = formatTime(response.dt, timeZone);

      descriptionElement.textContent = firstLetterUppercase(descriptionWeather);
      cityElement.textContent = name;
      dateElement.textContent = date;
      timeElement.textContent = time;
      temperatureElement.textContent = temp;
      feelsElement.textContent = tempFeels;
      humidityElement.textContent = humidity;
      windElement.textContent = windSpeed;
      icon.src = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
    })
    .catch((error) => {
      console.log(error);
      errorMsg.classList.remove('hidden');
    });
}

getWeatherData('Niksic');

searchElement.addEventListener('search', (e) => {
  getWeatherData(searchElement.value);
});

searchButton.addEventListener('click', (e) => {
  getWeatherData(searchElement.value);
});
