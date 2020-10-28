// https://docs.cycling74.com/nodeformax/api/module-max-api.html
const max = require("max-api")

let ct = 0

max.addHandler(max.MESSAGE_TYPES.NUMBER, function(t) {

	if (t % 4 == 0 || t % 32 == 30) max.outlet("kik")
	
	if (t % 4 == 2) max.outlet("tom")
	
	if (Math.random() < 0.9) max.outlet("hat")
})