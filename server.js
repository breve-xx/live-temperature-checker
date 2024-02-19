const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Execute command and send result to client every 5 seconds
setInterval(() => {
  exec('cat /sys/class/thermal/thermal_zone0/temp', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }

    const temperature = parseFloat(stdout) / 1000; // Convert from millidegree Celsius to degree Celsius

    // Broadcast temperature to all connected clients
    io.emit('temperatureUpdate', temperature);
  });
}, 5000);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = require('socket.io')(server);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
