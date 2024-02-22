const config = {
    minTemp: 40,
    maxTemp: 60
};

const temperature = document.getElementById("temperature");

const socket = io();

socket.on('temperatureUpdate', (temperatureValue) => {
    if (temperatureValue < config.minTemp) config.minTemp = temperatureValue;
    if (temperatureValue > config.maxTemp) config.maxTemp = temperatureValue;
    temperature.style.height = (temperatureValue - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperature.dataset.value = temperatureValue.toFixed(1) + "°C";
});