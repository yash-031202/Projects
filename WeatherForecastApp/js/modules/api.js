export async function fetchWeather(city) {
    const apiKey = "__API_KEY__";
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
    ]);
    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    const hourlyTemps = forecast.list.slice(0, 6).map(item => ({
        time: item.dt_txt.split(' ')[1].slice(0, 5),
        temp: item.main.temp
    }));

    return { current, forecast, hourlyTemps };
}
