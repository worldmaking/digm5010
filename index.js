const addon = require('bindings')('week7');

let ringBuffer = addon.Hello()
let ringBufferIdx = 0;
let time = 0; // in seconds
let phase = 0;

function nextSample(time) {
	// compute next output:
	phase += 289/48000;
	return 0.1 * Math.sin(Math.PI * 2 * phase);
}

function update() {
	// this is the time in the ringbuffer that has most recently been played (and is now zeroed)
	// so we are safe to fill the buffer up to this point:
	let targetIdx = addon.Time()
	// continue filling ringbuffer until we catch up to that point:
	while (ringBufferIdx != targetIdx) {
		// compute next output:
		let out = nextSample(time)
		// write to output:
		ringBuffer[ringBufferIdx] = out;
		// time passes:
		time += 1/48000; 
		ringBufferIdx = (ringBufferIdx + 1) % ringBuffer.length;
	}
	if (time > 10) {
		addon.Goodbye()
	} else {
		setTimeout(update, 100);
	}
}

update();