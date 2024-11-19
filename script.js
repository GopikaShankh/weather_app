const apiKey = 'cf917c58ca35c35dada70eff06a4f530';
const mapboxToken = 'pk.eyJ1IjoiYWFuY2hhbHNpbmdoIiwiYSI6ImNtMDg5dnEyZjFieTYya3IwcmVocnNncm4ifQ.WaN-Xu1Rizg7FegDr7yXnA';

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityNameDisplay = document.getElementById('city-name-display');
const forecastContainer = document.querySelector('.forecast-container');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const mapContainer = document.getElementById('map-container');

// Check current location on page load
window.addEventListener('load', () => {
    if (!cityInput.value.trim()) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
            getForecastByCoordinates(latitude, longitude);
            showMapByCoordinates(latitude, longitude);
        }, () => {
            alert('Location access is needed to fetch current weather and forecast.');
        });
    }
});

// Event listeners for navbar links
document.getElementById('show-current-weather').addEventListener('click', () => {
    currentWeatherDiv.style.display = 'block';
    forecastDiv.style.display = 'none';
    mapContainer.style.display = 'none';
});

document.getElementById('show-forecast').addEventListener('click', () => {
    currentWeatherDiv.style.display = 'none';
    forecastDiv.style.display = 'block';
    mapContainer.style.display = 'none';
    if (cityInput.value.trim()) {
        getForecast(cityInput.value.trim().toUpperCase());
    }
});

document.getElementById('show-location').addEventListener('click', () => {
    currentWeatherDiv.style.display = 'none';
    forecastDiv.style.display = 'none';
    mapContainer.style.display = 'block';
    if (cityInput.value.trim()) {
        showMap(cityInput.value.trim().toUpperCase());
    }
});

// Search button click event
searchBtn.addEventListener('click', () => {
    handleSearch();
});

// Enter key press event
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const city = cityInput.value.trim().toUpperCase();
    if (city) {
        displayCityName(city);
        getWeather(city);
        getForecast(city);
        showMap(city);
    } else {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
            getForecastByCoordinates(latitude, longitude);
            showMapByCoordinates(latitude, longitude);
        }, () => {
            alert('Location access is needed to fetch current weather and forecast.');
        });
    }
}

function displayCityName(city) {
    cityNameDisplay.innerHTML = '';
    for (const letter of city) {
        const span = document.createElement('span');
        span.textContent = letter;
        cityNameDisplay.appendChild(span);
    }
}

// Function to get weather by city name
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

// Function to get weather by coordinates
async function getWeatherByCoordinates(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function updateWeatherUI(data) {
    currentWeatherDiv.style.display = 'block';
    forecastDiv.style.display = 'none';
    mapContainer.style.display = 'none';

    document.getElementById('temperature-celsius').textContent = `${data.main.temp}°C`;
    document.getElementById('weather-conditions').textContent = data.weather[0].description;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Function to get forecast by city name
async function getForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }
        const data = await response.json();
        updateForecastUI(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        alert('Failed to fetch forecast data. Please try again.');
    }
}

// Function to get forecast by coordinates
async function getForecastByCoordinates(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        updateForecastUI(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        alert('Failed to fetch forecast data. Please try again.');
    }
}

function updateForecastUI(data) {
    forecastContainer.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
        const dayData = data.list[i];
        const nightData = data.list[i + 4] || dayData;
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `
            <h3>${new Date(dayData.dt_txt).toLocaleDateString()}</h3>
            <p>Day: ${dayData.main.temp}°C</p>
            <p>Night: ${nightData.main.temp}°C</p>
            <p>${dayData.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png" alt="Weather Icon">
        `;
        forecastContainer.appendChild(dayElement);
    }
}

// Show map by coordinates
function showMapByCoordinates(latitude, longitude) {
    mapContainer.innerHTML = '';
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 10
    });
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
}
