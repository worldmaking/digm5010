# GPU Programming of Shaders with GLSL

Why GPU programming? 
- massive scale performance, far better than CPU for data parallelism -- and high frame rates/low latency!
- visual quality, with incredible flexibility!  
- an interesting constrained space in its own right
- Use it to process images you generate in another space (e.g. easy for us to map a web canvas into a GLSL image processor)
- Create custom materials for environments like Three.js, TouchDesigner, Jitter, etc. 
- Build unique self-contained renderers and scenes entirely in the GPU
- VJing and Live Coding
- Explore cellular automata, fluid simulations, fractals, ... 
- Not just for images -- GPGPU: generating and simulating geometries, swarms, etc. 

An example of the power of this technique: https://www.shadertoy.com/view/XsBXWt
Notice that, apart from the cat gif, **everything else in this example is from around 200 lines of code**. It runs at a high frame rate, even when in full screen. This is the kind of thing that is lauded in the "demoscene" world. 

The language this is written in is GLSL. It is a way to write programs that will run directly on your GPU. GLSL can be used in the web like on ShaderToy, or in Three.js, or basically any web page in a modern browser -- even when opened on your phone or a VR headset like the Quest 3. GLSL is also used in desktop OpenGL envionments, including TouchDesigner, Max/MSP/Jitter, Ossia, Hydra, and so on.  It can also be used in Unity or Unreal, though they prefer you to use a more abstract language (HLSL) which then translates to GLSL. 

There are several kinds of shaders:
- **vertex shaders** process geometry: modifying and adding data to a geometry of points. 
- **fragment shaders** are programs that run on fragments, which you can think of as a pixel-by-pixel basis. This is what [ShaderToy](https://www.shadertoy.com/) is all about. 
- **compute shaders** are the most general, often used to adapt simulation algorithms such as particle systems, for example. See [ComputeToys](https://compute.toys/) for some examples. 

Today we'll be looking at fragment shaders. 

We'll use ShaderToy for convenience; but you should now that the required code to set up a shader in a webpage is not that complex -- it can be done in around 100 lines of code. 

---

The fragment shader is a program that runs separately for each fragment (think of it as a pixel). The main output of the fragment shader is a pixel colour, as a `vec4` representing red, green, blue and alpha (opacity) components, between 0 and 1.  

Sample code:

```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec4 yellow = vec4(1, 1, 0, 1); // red, green, blue, alpha
    
    fragColor = yellow;
}
```

For the most part, GLSL here looks a lot like C, Java, and similar procedural, typed languages.  You can think of the main function here as defining a program that runs per pixel (per fragment actually) of the output image. In this case, we set all pixels to a single color. 

One slightly unusual feature is the `out` keyword: a function can have arguments that you can modify. In this case, the output pixel color. 

The output pixel is a `vec4`, which means it has four values, for Red, Green, Blue, and Alpha (opacity).  `vec4` is a built in type in GLSL, along with `vec2` and `vec3`. 

There are a few slightly idisyncratic GLSL language features of vectors. You can index their components in a few different ways, including swizzling (re-ordering) them, 

```glsl
    vec4 v = vec4(1, 0.5, 0.2, 0);

    // these two are the same:
    fragColor = vec4(v.x, v.y, v.z, v.w);    
    fragColor = v.xyzw;

    // these two are the same:
    fragColor = vec4(v.w, v.z, v.y, v.x);
    fragColor = v.wxyz; 

    // these two are the same:
    fragColor = vec4(v.x, v.x, v.x, v.x);    
    fragColor = v.xxxx; 

    // .r .g .b .a == .x .y .z .w 
    // these two are the same:
    fragColor = v.xxxx; 
    fragColor = v.rrrr;  

    // compound a vec4 from vec3's, vec2's, and floats:
    // these two are the same:
    fragColor = vec4(v.xy, v.z, 1);
    fragColor = vec4(v.rgb, 1);

    // we can also create a vec4 from a single float like this:
    // these two are the same:
    fragColor = vec4(1, 1, 1, 1);
    fragColor = vec4(1);
```

The `vec2 fragCoord` argument is the pixel location in integer pixel numbers, starting at the bottom-left.  To turn that into a *normalized* coordinate, that goes from `vec2(0.0, 0.0)` at the bottom left, to `vec2(1.0, 1.0)` at the top right, we can divide by the image resolution.  Shadertoy gives us the image resolution in the variable `iResolution.xy`.

```glsl
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // visualize X coordinate in red, Y coordinate in green:
    fragColor = vec4(uv, 0, 1);
```

If we wanted a *signed normalized* coordinate, from -1 to +1, with 0,0 in the image center, we can do this:

```glsl
    // signed normalized pixel coordinates (from -1 to 1)
    vec2 suv = uv*2.0 - 1.0;

    // to take into account aspect ratio:
    suv.x *= iResolution.x / iResolution.y;
```

So now we can use the normalized coordinate to make a pattern over space. Essentially here we are defining a field function, that maps a `vec2` position into a `vec4` color. 

For example, here's a repeating sinusoidal surface:

```glsl 
    const float PI = 3.141592653589793;
    vec2 grid = cos(10.0 * PI * suv);
    fragColor = vec4(grid, 0, 1);
```

Notice how the `cos` function is quite happy to accept a `vec2` and produce a `vec2` result. This is true for most math functions in GLSL. 

Or we consider the pixel's distance from the center:

```glsl
    vec2 centre = vec2(0, 0);
    float dist = distance(suv, centre);  
    // equivalent: length(suv - centre);
    fragColor = vec4(dist); 
```

To draw a point, a common approach here is to use an exponential decay of distance via `exp(-sharpness * dist)`:

```glsl
    float sharpness = 50.0;
    float spot = exp(-sharpness * dist);
    fragColor = vec4(spot);
```

What we are doing is drawing a rapid falloff on the distance from a point.  

We can also turn this into a distance-from-circle, simply by subtracting the circle's radius from the distance.  

```glsl
    vec2 centre = vec2(0, 0);
    float radius = 0.2;
    float dist = distance(suv, centre) - radius;
    
    float sharpness = 50.0;
    float spot = exp(-sharpness * dist);
    
    fragColor = vec4(spot);
```

Or to draw several, we can use a modulo operation to divide up the space:

```glsl
    vec2 pos = mod(uv * 5.0, 1.0);
    float dist = length(pos - 0.5);
    float smoothResult = smoothstep(0.5, 0.46, dist);
    fragColor = vec4(pos.xy, 1, 1) * smoothResult;
```

It's a squashed looking circle because we are working in normalized coordinates, and the canvas is not square. We could instead do this in pixel coordinates:

```glsl
    vec2 centre = vec2(400, 400);
    float radius = 100.0;
    float dist = distance(fragCoord, centre) - radius;
    
    float sharpness = 50.0;
    float spot = exp(-sharpness * dist);
    
    fragColor = vec4(spot);
```

Or we could adjust for aspect ratio:

```glsl
    // to take into account aspect ratio:
    suv.x *= iResolution.x / iResolution.y;
```

Notice how odd this is: we are drawing shapes (points, circles) not by geometry, but by specifying a function of a field.  We didn't trace a line, we didn't do any geometry really, we just defined a function of space that maps a 2D position into a color, using only the principle of *signed distance*. This method of drawing by 'distance function' can be surprisingly powerful, and we'll return to it later.  

We used the `iResolution` uniform before to get the canvas size. (The "Uniform" terminology here really means an input parameter to the shader. It is "uniform" because the parameter has the same value for all pixels.) Shadertoy also gives us a few more uniforms to play with:

```glsl
uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform float     iFrameRate;            // shader frame rate
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
uniform vec4      iDate;                 // (year, month, day, time in seconds)
```

So for example, we can use iMouse.xy to move the circle, and iTime to change its size:

```glsl
    vec2 centre = iMouse.xy;
    float radius = 100. * abs(sin(iTime));
```

There's a lot you can do with math to procedurally generate images as functions of space (and time). Here's a more colourful example of a field varying in time:

```glsl
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime + uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col, 1.0);
```

One thing GLSL doesn't provide is a noise or random number generator. Some people have worked around this by finding mathematical functions that are pseudo-random -- noisy enough and cheap enough for many simple use cases. 

This is generic library code -- you can put this directly into the top of your shader, or in Shadertoy you can click the + to add a "Common" tab, in which you can place library code like this that will be visible to all shaders.

```glsl
#define RANDOM_SCALE vec4(.1031, .1030, .0973, .1099)

vec2 random2(float p) {
    vec3 p3 = fract(vec3(p) * RANDOM_SCALE.xyz);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 random2(vec2 p) {
    vec3 p3 = fract(p.xyx * RANDOM_SCALE.xyz);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 random2(vec3 p3) {
    p3 = fract(p3 * RANDOM_SCALE.xyz);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.xx + p3.yz) * p3.zy);
}

vec3 random3(float p) {
    vec3 p3 = fract(vec3(p) * RANDOM_SCALE.xyz);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.xxy + p3.yzz) * p3.zyx); 
}

vec3 random3(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * RANDOM_SCALE.xyz);
    p3 += dot(p3, p3.yxz + 19.19);
    return fract((p3.xxy + p3.yzz) * p3.zyx);
}

vec3 random3(vec3 p) {
    p = fract(p * RANDOM_SCALE.xyz);
    p += dot(p, p.yxz + 19.19);
    return fract((p.xxy + p.yzz) * p.zyx);
}

vec4 random4(float p) {
    vec4 p4 = fract(p * RANDOM_SCALE);
    p4 += dot(p4, p4.wzxy + 19.19);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);   
}

vec4 random4(vec2 p) {
    vec4 p4 = fract(p.xyxy * RANDOM_SCALE);
    p4 += dot(p4, p4.wzxy + 19.19);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec4 random4(vec3 p) {
    vec4 p4 = fract(p.xyzx * RANDOM_SCALE);
    p4 += dot(p4, p4.wzxy + 19.19);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec4 random4(vec4 p4) {
    p4 = fract(p4  * RANDOM_SCALE);
    p4 += dot(p4, p4.wzxy + 19.19);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}
```

Try out a quick example: 

```glsl
    vec4 noise = random4(vec3(fragCoord.xy, iTime));
    fragColor = vec4(noise);
```

Note that this is not a very good pseudo-random generator, and sometimes you will see patterns. Better generators are more expensive. Here is a good example: https://www.shadertoy.com/view/ftsfDf  

We can also pull in external images into a shader to process them, including videos, webcam streams, and so on.  Click on the `iChannel0` box under the editor and choose an image or stream to use.  We can then access this using the `texture` function:

```glsl
    vec4 image = texture(iChannel0, uv);
    
    fragColor = image;
```

So now we can do all kinds of math on that image for classic webcam effects:

```glsl
    // invert
    fragColor = 1.-image;
    // recolor:
    fragColor = image.gbra;
    // a kind of saturation:
    fragColor = smoothstep(0., 1., image);
    // a kind of saturation:
    fragColor = smoothstep(0.4, 0.6, image);
    // simple greyscale:
    fragColor = image.ggga;
    // threshold:
    fragColor = smoothstep(0.4, 0.41, image.ggga); 
    // brightness:
    fragColor = pow(image, vec4(sin(iTime)+1.5));
```

Some more library code for common image manipulations: 

```glsl
vec3 desaturate(in vec3 v, in float a ) {
    return mix(v, vec3(dot(vec3(.3, .59, .11), v)), a);
}
vec4 desaturate(in vec4 v, in float a ) { return vec4(desaturate(v.rgb, a), v.a); }

float brightnessContrast( float v, float b, float c ) { return ( v - 0.5 ) * c + 0.5 + b; }
vec3 brightnessContrast( vec3 v, float b, float c ) { return ( v - 0.5 ) * c + 0.5 + b; }
vec4 brightnessContrast( vec4 v, float b, float c ) { return vec4(( v.rgb - 0.5 ) * c + 0.5 + b, v.a); }

float rgb2luma(const in vec3 rgb) { return dot(rgb, vec3(0.2126, 0.7152, 0.0722)); }
float rgb2luma(const in vec4 rgb) { return rgb2luma(rgb.rgb); }

vec3 hue2rgb(const in float hue) {
    float R = abs(hue * 6.0 - 3.0) - 1.0;
    float G = 2.0 - abs(hue * 6.0 - 2.0);
    float B = 2.0 - abs(hue * 6.0 - 4.0);
    return clamp(vec3(R,G,B), 0., 1.);
}

vec3 hsv2rgb(const in vec3 hsv) { return ((hue2rgb(hsv.x) - 1.0) * hsv.y + 1.0) * hsv.z; }
vec4 hsv2rgb(const in vec4 hsv) { return vec4(hsv2rgb(hsv.rgb), hsv.a); }

vec3 rgb2hsv(const in vec3 c) {
    vec4 K = vec4(0., -0.33333333333333333333, 0.6666666666666666666, -1.0);
    vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
    vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
    float d = q.x - min(q.w, q.y);
    return vec3(abs(q.z + (q.w - q.y) / (6. * d + 1e-10)), 
                d / (q.x + 1e-10), 
                q.x);
}
vec4 rgb2hsv(const in vec4 c) { return vec4(rgb2hsv(c.rgb), c.a); }
```

(see more at https://github.com/patriciogonzalezvivo/lygia -- for example, pretty much all the photoshop layer modes are at https://github.com/patriciogonzalezvivo/lygia/blob/main/color/layer.glsl)

Obviously, some of these image effects can also use the coordinate to transform them, to create for example vignette effects. 

```glsl
    fragColor *= exp(-length(suv));
```

The `texture` function needs the specific "sampler" input to sample from (in this case, `iChannel0` which Shadertoy provides), as well as a vec2 normalized coordinate for where in the image to sample it. That means of course, we can sample from different places, not only the current location! 

```glsl
    vec2 coord = 0.5 + (suv)*sin(iTime);
    //vec2 coord = 0.5 + (suv)*exp(-length(suv));
    //vec2 coord = 0.5 + (suv)*exp(sin(iTime)*length(suv));
    //vec2 coord = 0.5 + 0.5*mix(suv, suv*sin(iTime), 1.-length(suv));
    //vec2 coord = uv + 0.1*(noise.xy-0.5)*length(suv);  // a little noise can be a bit like a blur
    vec4 image = texture(iChannel0, coord);
```

This can get pretty complex: https://www.shadertoy.com/view/

We can also use this to do things like comparing or blending nearest pixels. This is a common type of image effect that includes blur, sharpen, erode, edge highlight, etc.  These are called [convolution filters](https://en.wikipedia.org/wiki/Kernel_(image_processing)). Convolution simply means multiplying several pairs of terms together and summing the results. In image processing, this is usually means multiplying a square (or rectangular) region of an image with a "kernel" matrix. 

First, we define a kernel for the relative weights of the neighboring pixels. Then we loop over these pixels, sampling the image at each point, and multiplying it with the corresponding kernel weight, summing up the results. 

```glsl
    // some example kernels:

    mat3 identity = mat3(
        0, 0, 0,
        0, 1, 0,
        0, 0, 0,
    );

    mat3 edge0 = mat3(
         1,  0, -1,
         0,  0,  0,
        -1,  0,  1,
    );

    mat3 edge1 = mat3(
         0, -1,  0,
        -1,  4, -1,
         0, -1,  0
    );

    mat3 edge2 = mat3(
        -1, -1, -1,
        -1,  8, -1,
        -1, -1, -1
    );
    mat3 sharpen = mat3(
         0, -1,  0,
        -1,  5, -1,
         0, -1,  0
    );

    mat3 emboss = mat3(
        -2, -1,  0, 
        -1,  1,  1, 
         0,  1,  2
    );

    mat3 boxBlur = mat3(
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
    ) * 1.0/9.0;

    mat3 gaussBlur = mat3(
        1, 2, 1,
        2, 4, 2,
        1, 2, 1
    ) * 1.0/16.0;

    kernel = identity;
    
    vec2 oneTexel = 1./iResolution.xy;
    
    // loop over a 3x3 region, summing results:
    vec4 sum = vec4(0.0);
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            // get the texture coordinate offset for this texel:
            vec2 offset = vec2(float(i), float(j)) * oneTexel;
            // get the image at this texel:
            vec4 pixelColor = texture(iChannel0, uv + offset);
            // Apply kernel weight and sum:
            sum += pixelColor * kernel[i+1][j+1]; 
        }
    }

    fragColor = sum;
```

There are some other spatial image processes that are similar to convolution, but not using summation (so they are not strictly convolution), which you could explore:

- Erode searches surrounding pixels looking for minimum values
- Dilate searches surrounding pixels looking for maximum values
- Frosted Glass can blend together several local pixels in a non-standard pattern

---

We can also use mat objects to perform spatial transformations of the image. Here's a rotation matrix:

```glsl
mat2 rotateMat2(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(
        c,  s,
        -s,  c
    );
}
```

If we apply this to our `uv` coordinate, we can rotate the image:

```glsl
    uv = rotate(iTime) * uv;
```

We can also scale using a mat2:

```glsl
mat2 scaleMat2(float s) {
    return mat2(
        s,  0,
        0,  s
    );
}
```

If we wanted to *translate* however, we need to use `mat3`.  The idea is simple: we assume that there is a 3rd coordinate to the input vector, equvalent to `uv3 = vec3(uv, 1)`, so that we can then multiply this with the `mat3`.  Then our transforms look like this:

```glsl
mat3 translateMat3(float x, float y) {
    return mat3(
        1, 0, 0,        // First column (accessed as m[0])
        0, 1, 0,        // Second column (accessed as m[1])
        x, y, 1         // Third column (accessed as m[2])
  );
}

mat3 rotateMat3(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(
        c,  s, 0,
        -s, c, 0,
        0,  0, 1
    );
}

mat3 scaleMat3(float s) {
    return mat2(
        s, 0, 0,
        0, s, 0,
        0, 0, 1
    );
}
```

With these we can create quite complex transformations:

```glsl
    // convert to a vec3:
    uv3 = vec3(uv, 1.);
    // apply several transformations:
    uv3 = translateMat3(-0.5) * scaleMat3(sin(iTime)) * rotateMat3(iTime) * translateMat3(0.5) * uv3;
    // convert back to vec2:
    uv = uv3.xy;
```

So far we are processing the image over value (color), and over space. But we can also process it over time.  To do that, we need to set up a feedback loop. 

For example, what if we wanted to apply a feedback blur that is also creating spiral trails?

In shadertoy we can do this by adding a "Buffer" stage. Again, use the **+** button, and select "Buffer A".  Now in the Buffer A tab, let's set up **iChannel0** input to also be "Buffer A", so that it can read its own previous frame. 

In the Image tab, which defines what we actually see, let's also set up **iChannel0** input to also be "Buffer A", and display it:

```glsl
    // in Image tab, show the Buffer A content from iChannel0
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = texture(iChannel0, uv);
```

Back in the Buffer A tab, first let's set it up to display its own last frame:

```glsl
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = texture(iChannel0, uv);
```

Now we can add something to this to see the feedback:

```glsl

    vec4 noise = random4(vec3(fragCoord.xy, iTime));
    // add a white dot if the noise function is >= 0.999:
    fragColor = fragColor + vec4(step(0.999, noise.x));
```

This will gradually fill up the image. We can also let the image decay:

```glsl
    vec4 noise = random4(vec3(fragCoord.xy, iTime));
    float decay = 0.99;
    fragColor = fragColor*decay + vec4(step(0.999, noise.x));
```

And for something more intersting, intead of feeding back the same pixel, we could read from the pixel above it:

```glsl
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = texture(iChannel0, uv + vec2(0., 0.01));
```

Another common pattern here is to set up an initialization on the first frame, by using `iFrame == 0`, and the Rewind button on the shader view to reset this to zero:

```glsl
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = texture(iChannel0, uv + vec2(0., 0.01));
    
    vec4 noise = random4(vec3(fragCoord.xy, iTime));
    
    // initialize:
    if (iFrame == 0) {
        fragColor = noise;
    }
```

Notice it blurring over time? That's because we are using linear interpolation on the iChannel0 settings. Change the filter to "nearest" and it will not blur. 

Try doing some spatial transforms on the image in a feedback loop!

---

Feedback is also essential for making simulations of complex systems. 

We now have enough to write a cellular automaton, such as the [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life):

```glsl
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // get self state
    vec4 C  = texture(iChannel0, (fragCoord+vec2( 0, 0))/iResolution.xy);
    // am I alive?
    int alive = int(C.x > 0.5);
    
    // get state of all neighbour pixels:
    vec4 E  = texture(iChannel0, (fragCoord+vec2( 1, 0))/iResolution.xy);
    vec4 W  = texture(iChannel0, (fragCoord+vec2(-1, 0))/iResolution.xy);
    vec4 N  = texture(iChannel0, (fragCoord+vec2( 0, 1))/iResolution.xy);
    vec4 NE = texture(iChannel0, (fragCoord+vec2( 1, 1))/iResolution.xy);
    vec4 NW = texture(iChannel0, (fragCoord+vec2(-1, 1))/iResolution.xy);
    vec4 S  = texture(iChannel0, (fragCoord+vec2( 0,-1))/iResolution.xy);
    vec4 SE = texture(iChannel0, (fragCoord+vec2( 1,-1))/iResolution.xy);
    vec4 SW = texture(iChannel0, (fragCoord+vec2(-1,-1))/iResolution.xy);
    // count number of living neighbours:
    int neighbours = int(E.x > 0.5) + int(W.x > 0.5) 
                   + int(NE.x > 0.5) + int(NW.x > 0.5) 
                   + int(SE.x > 0.5) + int(SW.x > 0.5) 
                   + int(N.x > 0.5) + int(S.x > 0.5);
                
    // should I live on?
    int liveon = alive; 
    // the rules (see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
    if (alive == 1) {
        // die by loneliness or overcrowding:
        if (neighbours < 2 || neighbours > 3) liveon = 0;
    } else {
        // birth:
        if (neighbours == 3) liveon = 1;
    }
    
    // update my state:
    fragColor = vec4(float(liveon));
    // or for a more colourful variant:
    // fragColor = vec4(liveon, int(alive != liveon), alive, 1);
    
    vec4 noise = random4(fragCoord.xy);
    
    // initialize:
    if (iFrame == 0) {
        fragColor = vec4(step(0.8, noise.x));
    }
    
    // add some noise near the mouse:
    if (iMouse.z > 0.0) {
        // if the mouse is held, randomize some pixels near the mouse
        if (distance(fragCoord, iMouse.xy) < 10.0) {
            fragColor = vec4(step(0.8, noise.x));
        }
    } 
}
```

[Our shader from today](https://www.shadertoy.com/view/t3SfDW)

---

[Zoom Recording Part II](https://yorku.zoom.us/rec/share/a-Lofly0Zgqu2N5qFo1eswhgbCTY1RiIMBLBqslon3nI3Zi_VDnFIu3piwrg099q.VCc-OPDiftZNCk95)

**A Fluid simulation:**

Modeling the ideas in [Wyatt Flander's tutorial here](https://wyattflanders.com/MeAndMyNeighborhood.pdf)

A cellular automaton that looks a lot less digital/discrete! 
- Every cell has energy, including velocity (.xy) and omnidirectional divergence (.z).  We can also imagine the fluid transporting some matter, with a density (.w)

Fluid simulation: https://www.shadertoy.com/view/WcccDf 

---

**A minimal raytracer**

Ray tracing is a rendering technique for generating an image by tracing the path of light as pixels in an image plane and simulating the effects of its encounters with virtual objects — [Wikipedia](https://en.wikipedia.org/wiki/Ray_tracing_(graphics))

- https://www.shadertoy.com/view/tlXXzB

First, for each pixel in the image, we need a 3D ray. A ray is a line with an origin and direction.  

```p = pos + dir*t```

vec3 pos, vec3 dir (normalized)
t is distance along ray

OK for a screen, each ray should have a slightly different direction. Need diagram. Think of the image plane as a mesh a little in front of the camera/eye.  That's our "near plane". Think of the Albrecht Durer drawing diagram! 

We can build these like this:

```glsl
    vec3 ro = vec3(0, 0, 0);
    vec3 rd = normalize(vec3(suv.xy, 7));

    // or more realistic:
    
    // put camera "behind" origin 
    ro = vec3(0, 0, 5); 
    // handles aspect ratio:
    // the "7" is a way to set a "focal length"
    rd = normalize(vec3(suv * iResolution.xy/iResolution.y, 7)); 
```



We can put a simple object, such as a sphere, into this space. A sphere has a centre and radius:

```glsl
    vec3 sphere_pos = vec3(1, 0, 20);
    float sphere_rad = 2.0;

    // to make our life easier, let's combine this into a vec4:
    vec4 sphere = vec4(sphere_pos, sphere_rad);

    // let's also define a light position:
    vec3 light_pos = vec3(8, 4, 10);
```

Now we need a function to test whether a given ray intersects with a sphere.  The explanation of this math is a bit beyond what we can cover here, but have a look [here](https://kylehalladay.com/blog/tutorial/math/2013/12/24/Ray-Sphere-Intersection.html)

```glsl
// returns distance to first intersection with the sphere from the ray:
// returns -1 if the ray does not intersect with the sphere
float intersectSphere(vec3 rayOrigin, vec3 rayDirection, vec3 sphereCenter, float sphereRadius) {
    vec3 L = sphereCenter - rayOrigin;
    float tca = dot(L, rayDirection);
    float d2 = dot(L, L) - tca * tca;
    float radius2 = sphereRadius * sphereRadius;

    if (d2 > radius2) return -1.0; // No intersection

    float thc = sqrt(radius2 - d2);
    float t0 = tca - thc;
    float t1 = tca + thc;

    if (t0 < 0.0 && t1 < 0.0) return -1.0; // Both intersections behind ray origin
    if (t0 < 0.0) return t1; // Ray origin inside sphere, return far intersection
    return t0; // Return closest intersection
}
```

Can we see it?

```glsl
    float t = intersectSphere(ro, rd, sphere_pos, sphere_rad);
    if (t > 0.) {
        fragColor = vec4(1);
    }
```

To begin to light this sphere, we need to know where exactly our intersection point is, and from that we can determine the **normal**, which is to say, the direction pointing perpendicularly away from the sphere's surface:

```glsl
    // move the right distance along the ray to find the point:
    vec3 pt = ro + t*rd;

    // a sphere's normal is simple, it always points away from the sphere center
    // we normalize it to ensure it has a length of 1 (a unit vector)
    // this only gives direction, and is useful in the math later
    vec3 normal = normalize(pt - sphere_pos);
```

We can do diffuse lighting relative to a particular light direction (for sunlight), or by deriving a light direction from the relative positions of the sphere and a light source:

```glsl
        // again, normalize it to get a unit length direction vector:
        vec3 light_dir = normalize(pt - light_pos);

        // similarity of light and ray:
        float diffuse = max(dot(normal, light_dir), 0.);

        // similarlity with ray reflection vector:
        float specular = max(dot(-camera_dir, reflect(-light_dir, normal)), 0.);
        fragColor = vec4(specular);
```

Minimal raytracer: https://www.shadertoy.com/view/wc3yWf

Next: A different approach, using distance functions.

---

**A minimal raymarcher**

Raymarcher

Just like we had a function of 2D space (pixel distance to circle), we can do the same for 3D space (3D distance to sphere)

```glsl
// signed distance to a sphere at position 0,0,0
sdSphere(vec3 p, float radius) {
	return length(p) - radius;
}
```

Now, we start from `ro` and step along `rd` until we hit something

A basic marcher steps in fixed steps. We could step through an arbitrary 3D volume (like a 3D texture) this way, making each step the size of a voxel.
That's expensive though.

If we have a distance function of space, it tells us the distance to the closest object; so we know we can always move the ray by at least this much. Also known as sphere tracing.

```glsl
float depth = 0.;
vec3 p = ro;
for (int i=0; i<MAX_STEPS; i++) {
	// get distance from p to nearest surface
	float d = sdScene(p);
	// move to next point on ray:
	depth += d;
	p = ro + depth*rd;
	// did we arrive?
	if (d < threshold || d > FAR) break;
}
```

Now we can paint the pixel according to whether depth is >= FAR or not

We can position the sphere (or any group) by subtracting the position from `p` -- a good example to animate

OK normal: there's a kind of a neat hack here. Normal is just perpendicular to gradient (tangent) of surface. Think 2D, this is perp to slope of line. Slope can approximate by sampling two locations close to each other & comparing. In 3D it is the same: subtract two points slightly offset. We can do this directly on the distance field. 

```glsl
vec3 calcNormal(vec3 p) {
  float e = 0.0005; // epsilon
  return normalize(vec3(
    sdScene(vec3(p.x + e, p.y, p.z)) - sdScene(vec3(p.x - e, p.y, p.z)),
    sdScene(vec3(p.x, p.y + e, p.z)) - sdScene(vec3(p.x, p.y - e, p.z)),
    sdScene(vec3(p.x, p.y, p.z  + e)) - sdScene(vec3(p.x, p.y, p.z - e))
  ));
}

// a more efficient version:
vec3 calcNormal(vec3 p) {
  vec2 e = vec2(1.0, -1.0) * 0.0005; // epsilon
  return normalize(
    e.xyy * sdScene(p + e.xyy) +
    e.yyx * sdScene(p + e.yyx) +
    e.yxy * sdScene(p + e.yxy) +
    e.xxx * sdScene(p + e.xxx));
}
```

Minimal raymarcher: https://www.shadertoy.com/view/wf3yWf

More references:

- https://mercury.sexy/hg_sdf/
- https://www.shadertoy.com/view/ctKyzt
- https://www.shadertoy.com/view/Xds3zN