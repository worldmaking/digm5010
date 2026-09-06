
## Data Visualization and D3.js

[D3.js](https://d3js.org) is a JavaScript library for manipulating documents based on data. It has been one of the most widely used platforms for online data visualization for [over a decade](https://d3js.org/what-is-d3).   

To pull in D3, either grab the latest version (`https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js` at the time of writing) and add this to your `<head>`
tag -- or in Codepen, just search for "d3" in the "Add External Scripts" of the "JS" options. 

```
<head>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
</head>
```

D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document. For example, you can use D3 to generate an HTML bar chart from an array of numbers:

https://codepen.io/grrrwaaa/pen/VYeXJPJ

In that example, D3 is working by manipulating the HTML's Document Object Model (DOM), the tree of elements within the page.  We're using CSS to style those elements, and javascript to control the number and parameters of those elements according to existing data. 

D3 does this by means of a query/attribute system on the DOM. E.g., to change all paragraph text to be white:

```
d3.selectAll("p").style("color", "white");
```

Yet styles, attributes, and other properties can be specified as functions of data in D3, not just simple constants. For example, to alternate shades of gray for even and odd nodes:

```
d3.selectAll("p").style("color", function(d, i) {
  return i % 2 ? "#fff" : "#eee";
});
```

Despite their apparent simplicity, these functions can be surprisingly powerful. 

Computed properties often refer to bound data. Data is specified as an array of values, and each value is passed as the first argument (d) to selection functions. 

```
d3.selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .style("font-size", function(d) { return d + "px"; });
```

The data() method maps each element of the array to each DOM node in the selection. 

> Instead of generating data in JavaScript, it can be loaded from local files with d3.tsv(), [d3.csv()](https://github.com/mbostock/d3/wiki/CSV), [d3.json()](https://github.com/mbostock/d3/wiki/Requests), d3.xhr(), d3.text() etc.

(The strange dot syntax is called "chaining": when a function returns an object, we can call methods on that object in turn.)

Don't worry about matching the array length: using D3’s enter(), you can create new nodes for incoming data:

```
d3.select("body").selectAll("p")
	.data([4, 8, 15, 16, 23, 42])
	.enter()
	.append("p")
	.html(function(d) { return "I’m number " + d + "!"; });
```

D3 lets you transform documents based on data; this includes both creating (`enter`) and destroying (`exit`) elements. D3 allows you to change an existing document in response to user interaction, animation over time, or even asynchronous notification from a third-party. D3 is easy to debug using the browser’s built-in element inspector: the nodes that you manipulate with D3 are exactly those that the browser understands natively.

In addition to using standard HTML and CSS, D3 allows you to use another web standard, SVG (scalable vector graphics) for drawing graphical representations of data in the DOM. You can create SVG elements using D3 and style them with external stylesheets. SVG can be embedded in HTML pages just like any other tag, e.g. a blue circle:

```
<svg width="50" height="50">
    <circle cx="25" cy="25" r="22"
     fill="blue"/>
</svg>
```

Whereas Canvas drawing is all pixel based, SVG drawing is vector based. Moreover, every element in and SVG is part of the DOM, so it can be manipulated dynamically by D3.js.  Here's an example SVG:

```
<svg id="mysvg" width=500 height=500>
	<rect x="0" y="0" width="500" height="10" />
	<circle cx="250" cy="20" r="5" fill="yellow" stroke="orange" stroke-width="2"/>
	<g transform="translate(250,30)">
		<ellipse cx="0" cy="0" rx="10" ry="5" class="pumpkin"/>
	</g>
	<line x1="0" y1="40" x2="500" y2="50" stroke="black"/>
	<text x="250" y="60">Easy-peasy</text>
</svg>
```

SVG is always wrapped in an ```<svg>``` element, which should have a width & height (graphics will be clipped to this box). Within that, SVG code itself is a form of XML. Simple SVG shapes include rect, circle, ellipse, line, text, and path. The coordinate system is pixel based, with 0,0 at the top left. Common SVG properties are: fill (CSS color), stroke (CSS color), stroke-width, opacity (0.0 is transparent, 1.0 is opaque). [These can all be set with CSS styles](http://www.w3.org/TR/SVG/styling.html). All text will inherit the CSS-specified font styles of its parent element unless specified otherwise via CSS.

```
let svg = d3.select("#mysvg");

svg
  .selectAll("circle")
  .data([4, 8, 15, 16, 23, 42])
  .enter()
  .append("circle")
  .attr("fill", "blue")
  .attr("cy", 50);
  .attr("r", (d, i) => d)
```

D3’s focus on transformation extends naturally to animated transitions. Transitions gradually interpolate styles and attributes over time. For example, to resize circles in a symbol map with a staggered delay:

```
svg
  .selectAll("circle")
  .transition()
  .duration(750)
  .delay(function (d, i) {
    return i * 40;
  })
  .attr("cx", function (d, i) {
    return (i + 1) * 50;
  });
```

D3 can also very easily, and powerfully, animate transitions. [A great in-browser demo here](http://alignedleft.com/projects/2014/easy-as-pi/).

With dynamically changing data of varying length, we often need to specify how items appear, update, and disappear.  This is the common enter/update/exit pattern:

https://codepen.io/grrrwaaa/pen/VYeXJqL

When using transitions and dynamically updated data, it is very important to pass a second **key** argument to the ```data()``` call; this key is a function that returns the unique identifier of a given data record; that way D3 knows which records to animate when the data changes.  The example above used the letter value itself as the unique identifier key. 

The data array does not need to be simply an array of numbers; it can be an array of objects. Each one of those objects will be passed to the attr() handlers for each item. It therefore makes a whole lot of sense to prepare and annotate this array of objects before passing to D3 rendering. If each item is an object, we can store the unique identifier in this object. 

Scales are functions that map from an *input domain* to an *output range*. Since data is unlikely to be in the same range as the svg pixels, a scale function can be used to provide the transformation from an input domain of fahrenheit to an output range of celsius:

```
var scale = d3.scale.linear()
                    .domain([0, 100])				// fahrenheit
                    .range([-17.7778, 37.7778]);	// celsius	
                    // .clamp(true) 
                    // .nice()
scale(32);  //returns 0
scale(100);  //returns 37.7778
scale(212);  //returns 100
```

Other scale types include pow, log, quantize, quantile, and ordinal, and d3.time.scale too.

---

If the data is large, or came from a different data provider, it is probably in a separate JSON, CSV, or other external file. The D3 library has [many methods for loading and parsing external data](https://d3js.org/d3-fetch)

### The Ben Fry data visualization process

In the first chapter of the [Visualizing Data](http://www.amazon.com/gp/product/B0028N4WJC/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0028N4WJC&linkCode=as2&tag=dashi07-20) book, Ben Fry sets up the Data Visualization process as a series of steps:

(prepare data)

1. Acquire (discovery)  
> Obtain the data, whether from a file on a disk or a source over a network. 
- Clean, parse & filter ("munging")
> Provide some structure for the data's meaning, and order it into categories. Remove all but the data of interest. 
- Mine (analysis)
> Apply methods from statistics or data mining as a way to discern patterns or place the data in mathematical context.

(visualise)

- Represent
> Choose a basic visual model, such as a bar graph, list, or tree.
- Refine
> Improve the basic representation to make it clearer and more visually engaging.
- Interact
> Add methods for manipulating the data or controlling what features are visible.

(publish)

---

### Open Public Data

[The Open Data Handbook](http://opendatahandbook.org/en/index.html)

[Tim Berners-Lee (www founder) TED talk](http://www.ted.com/talks/tim_berners_lee_the_year_open_data_went_worldwide?language=en)

> Do you know exactly how much of your tax money is spent on street lights or on cancer research? What is the shortest, safest and most scenic bicycle route from your home to your work? And what is in the air that you breathe along the way? Where in your region will you find the best job opportunities and the highest number of fruit trees per capita? When can you influence decisions about topics you deeply care about, and whom should you talk to?

> New technologies now make it possible to build the services to answer these questions automatically. Much of the data you would need to answer these questions is generated by public bodies. However, often the data required is not yet available in a form which is easy to use. This book is about how to unlock the potential of official and other information to enable new services, to improve the lives of citizens and to make government and society work better.

> The notion of open data and specifically open government data - information, public or otherwise, which anyone is free to access and re-use for any purpose - has been around for some years. In 2009 open data started to become visible in the mainstream, with various governments (such as the USA, UK, Canada and New Zealand) announcing new initiatives towards opening up their public information.

Open Data may come in the form of a whole static database (CSV, EXCEL, TXT etc.), or it may be served as an API. An API will require some kind of request structure, such as location for a weather report, and should describe the structure of the response to expect. The open data documentation should also explain whether it includes geospatial information, and how frequently it is refreshed (if appropriate).

Most major online services have an API, and many allow you to acquire data surrounding your activity. If you have a Google site, Android/iOS app, or even a Unity game, you might already be collecting data via [Google Analytics](https://developers.google.com/analytics/devguides/collection). If you host a site or code repository at [Github](https://developer.github.com/v3/), they have some great APIs you can use. Similarly for accessing your [Facebook data](https://developers.facebook.com/docs/graph-api/overview/). Look further afield-- even your bank might have an API you can use, or offer you the option to download transaction histories as a static database. [You can probably browse your phone's location history here](https://maps.google.com/locationhistory/b/0/)
 
Some examples:

[Weather](http://openweathermap.org/API) -- free sign up for API key. See example [here](https://codepen.io/tutsplus/pen/gObLaEP?editors=0010)

[Google Data APIs](https://developers.google.com/gdata/docs/directory)

[Google Maps](https://developers.google.com/maps/documentation/javascript/)

[Open Street Map](http://wiki.openstreetmap.org/wiki/API)
- We used this and other open government data sources for our [Infranet](https://artificialnature.net/#infranet) artworks

[NASA](http://open.nasa.gov/developer/)

[Ontario open data catalogue](http://www.ontario.ca/government/open-data-ontario)

[Open Data Toronto](https://open.toronto.ca/catalogue/)

For example, the [Bike Share database](https://open.toronto.ca/dataset/bike-share-toronto/) is updated in near real-time. 

Unfortunately, like many open data resources, you can't just load this in D3 using `d3.json(url)` from a Codepen webpage because of CORS (Cross-Origin Resource Sharing) -- it becomes a security risk. But you *can* do this from a server, even a server running locally on your own machine using Node.js for example. 

For security, browsers typically do not allow a website on one domain to dynamically pull in data from another domain; i.e. they typically apply a *same-domain policy*. Fortunately, in the case of XMLHttpRequests, the provider may explicitly allow CORS, as is the case for http://api.openweathermap.org. Moreover, most dynamic requests will fail when running the HTML file from a local filesystem. *They need to be running from a server.* 

Node.js lets us write complex server applications, but it also provides a simple way to run a server from any location on your filesystem. First, install this capability on your computer by typing this in your terminal (you'll have to make sure node.js is installed first of course, see above):

```
npm install -g http-server
```

Once installed, you can run this from any location in your terminal like this:

```
http-server
```

And you can then open this in your browser at address http://0.0.0.0:8080/

*If you are working in Max, you can also access these APIs via the `maxurl` object, or you can run a full-fledge Node.js application via the `node.script` object. 

**Cleaning data**

Clean and great data is essential for good visualisations. Most online available data is not clean, not normalized, not well-structured, because life is not clean, normalized or well-structured. Good data is easily machine-readable, with semantic notes easily human-readable. Data is normalized, gaps are meaningfully handled, and noise reduced. This may mean:

- converting spreadsheets into flat data (e.g. CSV, JSON)
- removing unnecessary fields, headers, separating out annotations etc. 
- remove specialized numeric formatting (e.g. convert "1,000" to "1000", "50%" to "0.5")
- convert to international standards (dates, locations, temperatures etc.) when possible
- deal with missing values in a consistent way
- sort in the way you need
- combine multiple datasets into one, ensuring no duplication

It may also imply some "mining" or analysis passes to generate more useful field values

**Further reading**

Web mining is defined as the use of data mining, text mining, and information retrieval techniques to extract useful patterns and knowledge from the Web. A [mashup](http://en.wikipedia.org/wiki/Mashup_(web_application_hybrid), in web development, is a web page, or web application, that uses content from more than one source to create a single new service displayed in a single graphical interface. The term implies easy, fast integration, frequently using open application programming interfaces (open API) and data sources to produce enriched results that were not necessarily the original reason for producing the raw source data. The main characteristics of a mashup are combination, visualization, and aggregation. 

[Visual Complexity](http://www.visualcomplexity.com/vc/)

[Infosthetics](http://infosthetics.com)

[D3 gallery](https://github.com/mbostock/d3/wiki/Gallery)

[Jer Thorp](http://blog.blprnt.com/selected-works)

Correlation is not causation. [A wonderful example of spurious correlations](http://www.tylervigen.com).