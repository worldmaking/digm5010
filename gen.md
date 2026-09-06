## Digital Audio and Sound Synthesis 

What is digital audio, computer music, and sound synthesis

https://docs.google.com/presentation/d/1jmVITeEwAtnMNNFXJgHRgKLdmk44TF8D4J01wHLofdA/

A very quick introduction to [Max](https://cycling74.com/products/max) and [`gen~`](https://docs.cycling74.com/userguide/gen/_gen_overview/)

[Class notes for DATT3074: Creative Generative Audio Signal Processing](https://alicelab.world/datt3074/)

- Some key concepts and circuits:
  - `noise`, `cycle`, `phasor` (look at scope~, spectroscope~, frequency and level)
    - adding signals superimposes; `mix`, `param`
    - multiply for amplitude shaping - e.g. `triangle` shape `phasor`
  - lfo and audio modulations: from tremelo to AM, from vibrato to FM
    - more complex examples can become very rich, especially with feedback!
  - simplest filter of `mix` and `history`; cascade them; highpass; 
    - control filter with envelope (LPG), control FM with envelope too?
  - phasor ramp as meter, phasor manipulations (e.g. time division by `*` and `wrap 0 1`)
    - triggers from ramps with `delta`, `abs`, `> 0.5`
  - random steps by `latch`; source noise (gates?) or a related frequency (melodies?)
    - lowpass filter to smooth gates and random sources
  - mapping pitch to frequency, `mtof`, `exp2`
    - quantizing with `* N`, `floor`, `/ N`; neat trick of quantizing twice (second to 12)
  - effects with `delay` and mixing feedback, modulating time
    - waveshaping -- magic sigmoid (e.g. `tanh`), filtering, etc. in the feedback loop
      - more complex can become reverbs
  
- Embedding our yellowtail in Max:
  - Export codepen (zip `dist`), use `readfile` message to `jweb` in Max
  - Sending messages in & out: https://docs.cycling74.com/userguide/web_browser/
- Embedding in Ableton Live?
  - Need to use a public URL, e.g. upload to github pages: https://alicelab.world/digm5010/yellowmax/index.html
- Exporting via [RNBO](https://cycling74.com/products/rnbo)
  - See template here: https://rnbo.cycling74.com/learn/using-the-web-page-template

**[The patcher from today's class](max_patchers/week4.maxpat)**

- Some key concepts and circuits:
  - simplest filter of `mix` and `history`; cascade them; highpass; 
    - control filter with envelope (LPG), control FM with envelope too?
  - phasor ramp as meter, phasor manipulations (e.g. time division by `*` and `wrap 0 1`)
    - triggers from ramps with `delta`, `abs`, `> 0.5`
  - random steps by `latch`; source noise (gates?) or a related frequency (melodies?)
    - lowpass filter to smooth gates and random sources
  - mapping pitch to frequency, `mtof`, `exp2`
    - quantizing with `* N`, `floor`, `/ N`; neat trick of quantizing twice (second to 12)
  - effects with `delay` and mixing feedback, modulating time
    - waveshaping -- magic sigmoid (e.g. `tanh`), filtering, etc. in the feedback loop
      - more complex can become reverbs
  
- Embedding our yellowtail in Max:
  - Export codepen (zip `dist`), use `readfile` message to `jweb` in Max
  - Sending messages in & out: https://docs.cycling74.com/userguide/web_browser/
- Embedding in Ableton Live?
  - Need to use a public URL, e.g. upload to github pages: https://alicelab.world/digm5010/yellowmax/index.html
- Exporting via [RNBO](https://cycling74.com/products/rnbo)
  - See template here: https://rnbo.cycling74.com/learn/using-the-web-page-template
- Alternatively, just send network messages, such as OSC, or MIDI messages, etc.

[Today's patch](max_patchers/week7.maxpat)