import * as api from './modules/api.js';
import * as ui from './modules/ui.js';
import * as chart from './modules/chart.js';

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return;
    api.fetchWeather(city)
        .then(data => {
            ui.displayWeather(data.current);
            ui.displayForecast(data.forecast);
            chart.plotTemperature(data.hourlyTemps);
        })
        .catch(() => {
            ui.showError();
        });
}

// Make getWeather available to HTML
window.getWeather = getWeather;