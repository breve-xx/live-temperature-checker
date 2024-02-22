const express = require('express');
const { exec } = require('child_process');

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const TEMPERATURE_LOCATION = process.env.TEMPERATURE_LOCATION || '/sys/class/thermal/thermal_zone1/temp';
const REFRESH_SECONDS = parseInt(process.env.REFRESH_SECONDS || '5');

// Serve static files
app.use(express.static('public'));
app.use(express.static('dist'))

// Execute command and send result to client every 5 seconds
setInterval(() => {
  exec(`cat ${TEMPERATURE_LOCATION}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }

    const temperature = parseFloat(stdout) / 1000; // Convert from millidegree Celsius to degree Celsius

    // Broadcast temperature to all connected clients
    io.emit('temperatureUpdate', temperature);
  });
}, REFRESH_SECONDS * 1000);

// Start the server
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});

const io = require('socket.io')(server);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
