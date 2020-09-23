
# Practice Notes from Week 3: Node.js

Node.js was designed to support scalable network applications. Initially conceived as a *server-side* engine, it has grown to become a fantastic environment for desktop console-based scripting in general. 

> Actually, these course notes were generated using Node.js!

- Download from [https://nodejs.org/en/]() -- recommend LTS edition
- API: [https://nodejs.org/docs/latest-v12.x/api/]()

Notice some of the features: File System/Path, OS, Timers, HTTP(S), etc.

A core concept is that it is **event-driven**: responding to network, file, sub-processes, and many other events and data streams via callback functions.  For example, look at [`fs.readFile()`](html#fs_fs_readfile_path_options_callback). But many offer non-event-based equivalents, such as [`fs.readFileSync()`](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_readfilesync_path_options).

You can run Node.js as an interactive interpreter (REPL = Read Eval Print Loop, a basic conversational model dating back to teletype days), simply with `node` on the console. Type in an expression, it will print the result. 

But most of the time Node is used to run a main script, invoked with the filename. Let's make a simple Node.js script. We can use VS Code (integrated file editor & terminal, with good default syntax colouring). A minimal script:

```javascript
// save as `index.js`
console.log("hello")
```

`node index.js` will run it.  (Hint, tab-complete)

How about something dangerous?

```js
// 1st arg is the file name/path
// 2nd arg is the file encoding. Use "utf8" for most text files
// (use 'buffer' to read a binary file, like a wave file, image, etc.)
let content = fs.readFileSync("index.js", "utf8")   

console.log("Know thyself:")
console.log(content)

// using the `` backtick quotes here for a multi-line string
// it also allows string interpolation (aka quasiquoting) via ${expr}
content = `e
console.log("I repeat myself when under stress,");
${content}
`

fs.writeFileSync("index.js", "utf8");
```

Run a few times. (Hint, up arrow)

If only we had a way to **parse** & **generate** JS code in a more structured way...  (Hint: babel.parse/babel.generate, ast-types/recast, estraverse/escodegen, [esprima](https://github.com/jquery/esprima))

## NPM

One of the most remarkable features is the ["Node Package Manager" (NPM)](https://www.npmjs.com/), a collection of over 836,000 (in 2018) libraries -- the single-largest open-source collection in the world, underlining the dictum that "anything that can be written in Javascript eventually will". NPM is installed along with Node.js. 

### Package.json

To start a new project, usually it's a good idea to run `npm init`. It will ask you for some parameters; I recommend changing the version to 0.0.1. Others you can go with the defaults usually. This will create a file called `package.json` which stores all your configuration for the project, including library dependencies, start scripts, etc. 

`npm start` should now run your script.

## Express

To add a library, such as [express](https://www.npmjs.com/package/express), simply:

`npm install --save express`

This will place the library folder `express` in a `node_mmodules` subfolder; and it will add the dependency to `package.json`. That way, if someone else was to check out your git repository, they could simply run `npm install` and it would download `express` for them too. 

Express itself is one of the popular web server frameworks -- it makes it very easy to host html pages from your desktop. 

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

To serve HTML pages, there's quite a bit of plumbing needed in terms of formatting messages, but fortunately [`express` makes this very easy](https://expressjs.com/en/starter/static-files.html):

```js
// assumes 'app' was created as above
// assumes 'public' is a subfolder relative to index.js
app.use(express.static('public'))

// alternatively, try with path.join(__dirname, "public")
// where const path = require("path"); Node utilities for resolving filepaths
// and __dirname is the path to the folder where index.js lives
```

Create an `index.html` in the /public folder, and add the basic html5 template:

```html
<!doctype html>  
<html lang="en">  
<head>
<meta charset="utf-8">  
<title>My page</title>  
</head>  
<body>

HTML objects go here.

<script>
// Javascript code goes here.
// (or link to an external 'js' file using '<script src="myscript.js"></script>')
</script>
</body>  
</html>
```

Great -- now you can see your page at localhost:3000 -- and anyone on your local network can see it too, so long as they know your machine's IP address (or possibly machine name). E.g. try it on your phone. 

Google: `what is my ip?`

Or `ifconfig`/`ipconfig` in the terminal. 

To make it visible beyond the local network, on the internet as a whole, you may need to configure your router quite a bit. Or you could use a port-forwarding tunnel system like Ngrok. Or rent some server space. 

## WS

Serving HTML pages is fine enough for passive experiences, but what if you want something more dynamic -- where the browser and the Node 'server' are talking to each other continuously? Here, [WebSockets](https://en.wikipedia.org/wiki/WebSocket) can help. They are a bi-directional message-passing network protocol (not the only such thing, but a very commonly-supproted one) which can sit upon the HTTP protocol. It works on most browsers already.  To use them in Node.js, we need another library. [Try this one](https://github.com/websockets/ws):

`npm install --save ws`

And in our `index.js`:

```js
const ws = require('ws');

//... and after we've set up our 'app' server:
// add a websocket server for continuous communication with clients:
const wss = new ws.Server({ server });
// handle each new connections from a client:
wss.on('connection', function(client) {
	console.log("I got a connection!");
});
```

Meanwhile, in the browser ("client") javascript code, add some code to try to connect to this server: 

```js

// connect to websocket at same location as the web-page host:
const addr = `ws://${window.location.hostname}:${window.location.port || 80}`
console.log("connecting to", addr)

// this is how to create a client socket in the browser:
let socket = new WebSocket(addr);

// let's know when it works:
socket.onopen = function() { 
	// or document.write("websocket connected to "+addr); 
	console.log("websocket connected to "+addr); 
}
socket.onerror = function(err) { 
	console.error(err); 
}
socket.onclose = function(e) { 
	console.log("websocket disconnected from "+addr); 
}
```

Assuming this hand-shaking works, we can start adding some conversational back & forth. In the client, let's tell the server if our mouse is moving:

```js
document.addEventListener("pointermove", e => {
	// is the socket available?
	if (socket.readyState !== WebSocket.OPEN) return;

	// we can send any old string:
	socket.send("boo!")
});

socket.onmessage = function(msg) {
	console.log(msg.data);
}
```

And, in the server, we can make a reply. Now here we have to be more careful: the server might have connections to MANY clients at once, so we need to handle it *inside* the wss.on('connection') handler:

```js
wss.on('connection', function(client) {
	console.log("I got a connection!");
	// all per-client code goes here now.

	client.on('message', msg => {
		console.log("I got a message!", msg);
		
		// reply:
		client.send("who?")
	});
});

// to send a message to *everyone*:
function sendAllClients(message) {
  wss.clients.forEach(client => {
  	client.send(message);
  });
}
```

### Complex data on websockets

To send more structured, arbitrary data back & forth, we can encode it using JSON:

```js
// most js objects can be encoded as JSON
// except for functions, complex structures that contain multiple references to the same object, or binary arrays, etc.
let obj = { 
	a: ["complex", "object"],
	is: { fine: 2 },
	encode: "as json"
}
let str = JSON.stringify(obj)  // this is the compact version
//let str = JSON.stringify(obj, null, "  ") // human-readable version
console.log(str) // -> suitable for sending on a websocket

let obj1 = JSON.parse(str) 
console.log(obj1) // it's a js object again! 
```

You could even look at the 1st character of a message string (`substring(0,1)`) and see if it `== "{"` to detect a potential JSON-encoded message.

### Binary data on websockets

Sometimes you want to send a LOT of numbers (e.g. an array of sensor measurments, an image, etc.); in this case, using an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) would make more sense. We can do this too. We just need to do a couple more things:

```js
socket.binaryType = 'arraybuffer';

socket.onmessage = function(msg) {
	if (msg.data instanceof ArrayBuffer) {
	    // do stuff with msg.data
	    console.log("ws received arraybuffer of " + msg.data.byteLength + " bytes")
	} else {
		// as before
	}
}
```

Similarly in the server:

```js
// before calling socket.open():
socket.binaryType = 'arraybuffer';

client.on('message', msg => {
	msg.buffer
})
```

## Project

Now we have enough framework to turn a drawing app into a multi-user scenario! 

Your server probably wants to maintain a list of clients (sessions) data. It might collect drawing updates from each client, merge them into a combined "scene" representation, and broadcast that scene to all clients.

You might need some way of uniquely identifying each client, so that they can render their own data locally rather than waiting for the server reply.

You could store the scene data into a file (e.g. JSON, or binary), so if the server crashes, you can re-open it and continue where it left off.

Live coding tip:

`npm install -g nodemon` then `nodemon index.js` to reload the server after each edit.

## Modules

You can write your own JS modules very easily. It's a good idea if you want to package up some code that will be re-used in many projects.

`require` can take a relative path, e.g. `require("./mylib")` or `require(path.join(__dirname, "mylib"))` will both find a `mylib.js` in the same folder. 

There are some standard paths that `require` will always look into -- you can check out `module.paths` to know what they are. 

In the code of a module, we declare what it 'exports' to the `require()` call via `module.exports`. Usually it looks like this:

```js
// save as ultimate.js

// module.exports can be a function, an object, an anything really.
// objects make sense when exporting an API:
module.exports = {
	question: "what is the meaning of life?",
	answer: 42,
}
```

```js
// save as test.js

const ultimate = require("./ultimate")

console.log(ultimate.question)
console.log(ultimate.answer)
```

### Native modules

Modules can also be written in C or C++ ("native code"), which is what most of Node's own libraries are written in.  Why?

- You want to hook your script into another C++ library or code base (e.g. binding to OpenGL). Most operating system frameworks and APIs are C-based, as are most device drivers etc. For example, I have worked on node modules for [Kinect sensors, VR headsets (and gloves), as well as OpenGL, native windowing](https://github.com/worldmaking/node-gles3), and so on, which all meant mapping to a C/C++ SDK. 
- You want to write some routines that run much faster. C++ is usually a lot faster than JS for large scale numeric operations (though this can depend on a lot of factors -- see the [benchmarks game here](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/node-gpp.html), which shows 2-4x speedups in many tests). For example, in some of the Artificial Nature exhibits, I have written some parts of the simulations in JS, but others, such as 3D fluid and other physics simulations, were C++ native modules. 

It's a lot more layered than just writing some JS, but after a while it gets easier. [See notes here](https://github.com/worldmaking/worldmaking.github.io/wiki/Node.js-native-C-modules) 
