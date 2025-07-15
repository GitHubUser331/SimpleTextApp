// import websocket server class

const { WebSocketServer } = require('ws');
const fs = require('fs');
const path = require('path');

// creates a websocket server instance 

const wss = new WebSocketServer({ port: 3000 });

console.log('WebSocket server started on port 3000');

const activeUsernames = new Set();
// The fileTransferBuffers and UPLOADS_DIR are for the original file upload functionality
// where files are stored on the server. For image embeds, we will NOT use this.
const fileTransferBuffers = new Map(); // Stores incoming file chunks

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// logic to say if any client has connected

wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  // logic to know if anyone has sent a message
  
  ws.on('message', function message(data) {
    // Explicitly convert incoming data to a UTF-8 string for parsing.
    // This handles both string and Buffer types that the 'ws' library might provide.
    const messageString = data.toString('utf8'); 
    console.log('Received message string:', messageString); // Log the raw string for debugging

    // Attempt to parse the message as JSON with error handling
    try {
        // Perform a quick check to see if the string looks like JSON before parsing
        if (messageString.startsWith('{') && messageString.endsWith('}')) {
            const parsedData = JSON.parse(messageString);

            if (parsedData.type === 'username_set') {
                const requestedUsername = parsedData.user;
                if (activeUsernames.has(requestedUsername)) {
                    // If username is taken, inform the client
                    ws.send(JSON.stringify({ type: 'username_taken', requestedUsername: requestedUsername }));
                } else {
                    // If username is available, set it and broadcast join message
                    if (ws.username) {
                        activeUsernames.delete(ws.username); // Remove old username if user changes it
                    }
                    activeUsernames.add(requestedUsername);
                    ws.username = requestedUsername; // Assign username to the WebSocket connection
                    console.log(`User "${requestedUsername}" set their username.`);
                    // Notify other clients that a new user has joined
                    wss.clients.forEach(function each(client) {
                        if (client !== ws && client.readyState === client.OPEN) {
                            client.send(JSON.stringify({ user: 'Server', message: `${requestedUsername} has joined.` }));
                        }
                    });
                }
            } else if (parsedData.type === 'text' || parsedData.type === 'image') {
                // Handle regular text messages or image data (Base64 string)
                // For images, the 'imageData' field will contain the Base64 string
                // We simply re-broadcast the entire parsedData object to all clients
                wss.clients.forEach(function each(client) {
                    if (client.readyState === client.OPEN) {
                        client.send(JSON.stringify(parsedData)); // Re-send the JSON string to all clients
                    }
                });
            } else {
                console.log('Received unknown message type:', parsedData.type, parsedData);
            }
        } else {
            console.warn('Received non-JSON text message (or malformed JSON):', messageString);
            // This block will catch messages that don't start/end with curly braces,
            // including the "pe":"usern"... string you reported if it's truly what's being received.
            // You might want to handle this as a plain text message if that's intended,
            // or just log it as an unexpected format.
        }
    } catch (error) {
        // Catch any SyntaxError from JSON.parse or other parsing issues
        console.error('Error parsing message as JSON:', error);
        console.error('Problematic message data (failed JSON.parse):', messageString);
        // You could optionally send an error message back to the client here
        // or take other recovery actions.
    }
  });

  // logic to say if any client has lost connection
  
  ws.on('close', () => {
    console.log('A client disconnected.');
    if (ws.username) {
        activeUsernames.delete(ws.username); // Remove username from active set
        console.log(`User "${ws.username}" disconnected.`);
        // Notify other clients about the disconnection
        wss.clients.forEach(function each(client) {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify({ user: 'Server', message: `${ws.username} has left.` }));
            }
        });
    }
    // Clean up any incomplete file transfers associated with this client
    fileTransferBuffers.forEach((fileInfo, fileId) => {
        if (fileInfo.writeStream && !fileInfo.writeStream.writableEnded) {
            console.log(`Client disconnected, cleaning up incomplete file ${fileInfo.fileName} (ID: ${fileId})`);
            fileInfo.writeStream.end();
            fs.unlink(fileInfo.filePath, (err) => {
                if (err) console.error(`Error deleting incomplete file ${fileInfo.filePath}:`, err);
            });
            fileTransferBuffers.delete(fileId);
        }
    });
  });

  // logic to say if any error has occurred
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

