export function plotTemperature(data) {
    const ctx = document.getElementById('tempChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.time),
            datasets: [{
                label: 'Temperature (°C)',
                data: data.map(d => d.temp),
                fill: false,
                borderColor: 'blue',
                tension: 0.1
            }]
        }
    });
}