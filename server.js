// import websocket server class

const { WebSocketServer } = require('ws');

// creates a websocket server instance 

const wss = new WebSocketServer({ port: 3000 });

console.log('WebSocket server started on port 3000');

// logic to say if any client has connected

wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  // logic to know if anyone has sent a message
  
  ws.on('message', function message(data) {
  	
    // shows the log text if any message is successfully received
    
    console.log('Received message:', data.toString());

    // iterate over all connected clients
    
    wss.clients.forEach(function each(client) {
    	
      // checks if the client is ready to receive messages
      
      if (client.readyState === client.OPEN) {
      	
      
        // send the message to all connected clients. when the data is received by the clients, their internal JavaScript parses the string to raw text
        
        client.send(data.toString());
      }
    });
  });

  // logic to say if any client has lost connection
  
  ws.on('close', () => {
    console.log('A client disconnected.');
  });

  // logic to say if any error has occurred
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});
