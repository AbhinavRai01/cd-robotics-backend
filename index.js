const WebSocket = require("ws");

// Start WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        console.log(`Received: ${message}`);

        // Forward data to all connected clients (React, other devices, etc.)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://YOUR_SERVER_IP:8080");
