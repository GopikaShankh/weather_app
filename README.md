# Weather Window Application

## Description
Weather Window is a user-friendly web application that provides current weather information and a 5-day forecast for any city worldwide. It utilizes the OpenWeatherMap API for weather data and Mapbox API for location-based searches and map display.

## Features

* **Current Weather:** Displays the current temperature (Celsius), weather conditions, and an icon representing the weather.
* **5-Day Forecast:** Shows a summarized forecast for the next 5 days, including daily high/low temperatures and weather conditions.
* **Location Search:** Allows users to search for weather information by city name.
* **Map Display:** Integrates with Mapbox to visually display the location of the searched city.

## Technologies Used

* **HTML:** Provides the structure and content of the web page.
* **CSS:**  Styles the application for an appealing and user-friendly interface.
* **JavaScript:** Handles user interactions, fetches data from APIs, and dynamically updates the page.
* **OpenWeatherMap API:** Provides the weather data for the application.
* **Mapbox API:** Enables location-based searches and map visualization.

## File Structure

* `index.html`:  The welcome page with a button to access the main application.
* `main.html`: The primary application page containing the search bar, weather information, and map.
* `script.js`: Contains the JavaScript logic for the application.
* `styles.css`: Contains the CSS rules for styling the application.
* `Cloud.png`: (Image file) Cloud image used on the Welcome page.
* `background.jpg`: (Image file) Background image used for the application.

## How to Use

1. Open `index.html` in your web browser to access the Welcome page.
2. Click the "Welcome" button to navigate to the main application (or directly open `main.html`).
3. Enter the name of a city in the search bar and click "Search" or press "Enter".
4. The application will display:
    * Current weather for the searched city in the "Current Weather" section.
    * 5-day forecast in the "5-Day Forecast" section.
    * The location of the city on a map. 
5. You can navigate between the "Current Weather", "5-Day Forecast", and "Location" views using the links in the header.

## API Keys

You will need to obtain your API keys for both OpenWeatherMap and Mapbox to use this application. 

1. **OpenWeatherMap API Key:**
   - Sign up for a free account on [https://openweathermap.org/](https://openweathermap.org/)
   - Get your API key from your dashboard.
   - Replace `'cf917c58ca35c35dada70eff06a4f530'` in `script.js` with your OpenWeatherMap API key.

2. **Mapbox API Key:**
   - Create a free account on [https://account.mapbox.com/](https://account.mapbox.com/)
   - Get your access token.
   - Replace `'pk.eyJ1IjoiYWFuY2hhbHNpbmdoIiwiYSI6ImNtMDg5dnEyZjFieTYya3IwcmVocnNncm4ifQ.WaN-Xu1Rizg7FegDr7yXnA'` in `script.js` with your Mapbox access token. 

## Future Improvements

* **Hourly Forecast:** Add the ability to view a more detailed hourly forecast.
* **Additional Weather Data:**  Include information like humidity, wind speed, and UV index.
* **User Location Detection:** Automatically detect and display weather information for the user's current location.
* **Interactive Map:**  Allow users to interact with the map to select locations and view weather data.


This README.md file provides a comprehensive overview of the Weather Window application. Developers and users can use this documentation to understand the application's features, how it works, and how to use it.
