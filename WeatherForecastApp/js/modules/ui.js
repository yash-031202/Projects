export function displayWeather(data) {
    document.getElementById('weatherResult').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
    // Populate weather data into the UI
}

export function displayForecast(data) {
    // Display 5-day and hourly forecast cards
}

export function showError() {
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('weatherResult').classList.add('hidden');
    document.getElementById('forecast').classList.add('hidden');
}