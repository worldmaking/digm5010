/*
	before running, requires:
	`npm install express ws`

	if you want to have it available over internet, rather than local network:
	`npm install ngrok`
	`./node_modules/ngrok/bin/ngrok http ${port}`
*/

const express = require('express')
const ws = require('ws');

// the global state of the system, to be shared with all clients:
const state = {
	sessions: []
}

// the 'express' module makes creating a local webserver super easy:
const app = express()
const port = 8080
// set up a local webserver from the 'public' folder
app.use(express.static('public'))
// run it on the local network:
const server = app.listen(port,  () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

// add a websocket server for continuous communication with clients:
const wss = new ws.Server({ server });

// handle each new connections from a client:
wss.on('connection', (client) => {
	// inside this function we can set up everything for a specific client's session
	// let start with an empty object for all client-specific state
	let session = {}
	// and add that to the list in our world state:
	state.sessions.push(session);

	console.log(state.sessions.length, "clients have connected");
	updateAllClients();
	
	//socket.send("hello to client")

	// handle messages from the client:
	client.on('message', msg => {
		let data = JSON.parse(msg);
		// update our session
		// copies all key-values in `data` into `session`
		Object.assign(session, data);
		// tell everyone the world has changed:
		updateAllClients();
	});
});

// send the global state to all clients via the websocket:
function updateAllClients() {
	// encode our state as a JSON string:
	let message = JSON.stringify(state);
	// share with each client
	wss.clients.forEach(client => {
		client.send(message);
	});
}