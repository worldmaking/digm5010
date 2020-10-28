const path = require("path")
const express = require("express")
const ws = require("ws")

const app = express()
const port = 8080

app.use(express.static(path.join(__dirname, 'web')))

const server = app.listen(port, function() {
	console.log(`I'm listening on http://localhost:${port}`);
})

const wss = new ws.Server({ server })

let clients = []
let scene = {
	clients: clients,
}

wss.on("connection", function(client) {
	console.log("I feel connected!");

	let session = {
		//
		lastmsg: "",
	}

	clients.push(session)

	client.on("message", function(msg) {		
		if (msg.charAt(0) == "{"){
			console.log(JSON.parse(msg));
		} else {
			console.log("I received a message", msg);
		}
		session.lastmsg = msg;
		// reply to all:
		sendAllClients(JSON.stringify(scene))
	})
})

// to send a message to *everyone*:
function sendAllClients(message) {
	wss.clients.forEach(client => {
		client.send(message);
	});
}






