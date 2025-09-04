![](img/tumblr_mh536sFdmJ1rubozqo1_500.jpg)


# New Media Forms / The Database

[![Flight Patterns, Aaron Koblin](http://users.design.ucla.edu/%7Eakoblin/work/faa/interpolated/us1.jpg)](http://users.design.ucla.edu/%7Eakoblin/work/faa/index.html)

## Course Description

Explores the database as a form in digital media and computational arts. As a navigable repository persistent information, the database intersects memory and network, knowledge and narrative, access and observation. As products of cultural activity, databases present new ways of understanding ourselves at massive scales. We will examine representative and indicative works in art and design, and artifacts of computational culture, to lay the groundwork for future exploration. Students will learn what a database is, how it is constructed, how it is accessed through the web, and how it may be mapped and envisioned for effective dissemination.

## Why?

> Four technology arenas will shape global economic, social, and military developments as well as the world community's actions pertaining to the environment by 2030. Information technology is entering the big data era. Process power and data storage are becoming almost free; networks and the cloud will provide global access and pervasive services; social media and cybersecurity will be large new markets. This growth and diffusion will present significant challenges for governments and societies, which must find ways to capture the benefits of new IT technologies while dealing with the new threats that those technologies present. Fear of the growth of an Orwellian surveillance state may lead citizens particularly in the developed world to pressure their governments to restrict or dismantle big data systems.   
[Global Trends 2030: Alternative Worlds a publication of the National Intelligence Council](http://www.dni.gov/files/documents/GlobalTrends_2030.pdf)

![Global storage](http://www.bretswanson.com/wp-content/uploads/2011/02/GR2011021100614.jpg)

![Information doubling every 2 years](http://rack.3.mshcdn.com/media/ZgkyMDEyLzEyLzA0L2Q5L01hc2hhYmxlX1plLmJXTS5wbmcKcAl0aHVtYgkxMjAweDk2MDA-/c78ff003/e8c/Mashable_Zettabytes-Data-Compare_Infographic_640.png)

## Data in Art, Data Artists

[Figuring Data, Mitchell Whitelaw](http://teemingvoid.blogspot.ca/2013/06/figuring-data-datascape-catalog-essay.html) is an introduction to a gallery show of artists working with data, applying and diverting it for their own ends, as well as offering their own figurations of its potentials and limits. 

> [“Data is the new oil”](http://www.forbes.com/sites/perryrotella/2012/04/02/is-data-the-new-oil/) is a pithy little announcement... [which] constructs data in a certain way; as a sort of amorphous but precious stuff, a resource for exploitation, and a sort of promising abundance... We need not (and should not) accept this analogy; but it demonstrates how data is figured, or constructed, in our culture. Our everyday life and culture is traced, tangled and enabled by digital flows. We produce and consume data as never before. But what exactly is this data? What can it do, and what can we do with it? Who owns or controls it? How can we understand, appreciate, or even sense it?

> Google, Facebook, Twitter and the rest make us - their users - into data... [If we are data, and data can be faithfully preserved, are we now immortal?](http://dialogue.media-culture.org.au/students/jordan-lane)... One of the challenges of data subjectivity is simply knowing oneself: [the scale of our personal data exceeds our grasp](http://christopherbaker.net/projects/mymap/)... In two of the most prominent data art works from the mid 2000s, we mine these personal archives en masse. Golan Levin’s [The Dumpster](http://artport.whitney.org/commissions/thedumpster/dumpster.shtml) and Sep Kamvar and Jonathan Harris’ [We Feel Fine](http://www.number27.org/wefeelfine) scour the internet for “feelings” that are compiled into datasets, and in turn staged as dynamic visualisations... [In] Aaron Koblin’s [Sheep Market](http://www.aaronkoblin.com/work/thesheepmarket/) we can see  both the comical diversity of the crowd (and its sheep avatars), and the uniformity that digital systems encourage. The pathos of this contrast, between the coolness of the digital and the warm, messy intensity of humankind, emerges again in Luke du Bois’ [Hard Data](http://turbulence.org/Works/harddata/), where the tolls of war unfold as stark lists and map references... In many works here [the weather](http://hint.fm/wind/) - a complex (and increasingly uncooperative) material flux - is a sort of proxy for the data-world: a field that is both easy to measure, and difficult to grasp... weather data is a source of aesthetic richness, as well as a pointer to the world beyond, the world that data traces. 

> Rather than some kind of precious (but immaterial) stuff, or fuel for market speculation, data here is a relationship, a link between one part of the world with another, and a trace that can be endlessly reshaped... that connection remains; and art here plays the role that it always has. It transforms our understanding of the world, by representing it anew.

["Data Art" Image Search](https://www.google.ca/search?q=data+art&rls=en&source=lnms&tbm=isch&sa=X)

[Aaron Koblin @ TED](http://www.ted.com/talks/aaron_koblin?language=en)

[Creative Data Leonardo special issue](http://www.leonardo.info/LEA/CreativeData/CreativeData.html)

[Jer Thorp: Art and the API](http://blog.blprnt.com/blog/blprnt/art-and-the-api)

----



### Client-side programming (HTML, CSS, JS)

Modern client-side web technology is a trio of HTML, CSS and [JavaScript](js.html), making extensive use of the new audiovisual capabilities of HTML5 including Canvas, SVG, WebGL etc. A great way to play with how it all fits together is using an online test-bed such as [JS Fiddle](http://jsfiddle.net).

#### HTML

[HTML](http://www.w3schools.com/html/) (HyperText Markup Language) is the standard markup language for the web. It is not a programming language, but a formatting language; the browser reads this language and uses it to render the web page. The basic document syntax:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>This is a title</title>
    <!-- more metadata here -->
  </head>
  <body>
    <p>Hello world!</p>
    <a href="http://www.google.com/">A Link to Google!</a>
    <!-- more content here -->
  </body>
</html>
```

The indentation helps us to see that HTML has the abstract structure of a hierarchical tree. This structure is called the [DOM](http://en.wikipedia.org/wiki/Document_Object_Model) (Document Object Model). Nodes within the tree can also be uniquely named via the `id` attribute, and classified by the `class` attribute: 

```html
<p id="intro" class="normal">Welcome to HTML</p>
```

IDs and classes are often used in combination with [CSS](http://www.w3schools.com/css/) to automatically define visual styles independently of the content. The DOM, including id and class attributes, are also available to JavaScript in the browser.  


#### CSS

CSS (Cascading Stylesheets) is a language for styling HTML pages. CSS styles (also know as selectors) are typically applied to HTML tags based on their name, class, or ID. Each selector specifies a set of property values to apply. Properties can be defined for backgrounds, text, fonts, links, lists, tables, boxes, borders, outlines, margins, paddings, sizes, display modes, alignment, and more. 

Stylesheets are embedded in the HTML's `<head>` tag. This can either be inline as below:

```html
<style>
/* put styles here */
</style>
``` 

Or it can be imported from a separate file (multiple stylesheets can be imported this way):

```html
<link rel="stylesheet" type="text/css" href="mystyle.css">
```

The most commonly used rules for making selectors are fairly simple:

```css

	/* Applied to all <p> tags */
	p {
	  	background-color: #ff0000;	// hexadecimal color (RRGGBB)
	  								// can also say rgb(255,0,0)
	}
	
	/* Applied to all <p>, <h1> and <h2> tags */
	p, h1, h2 {
	  	text-align: left;
	}

	/* Applied to all tags with class="red" */
	.red {
	  	background-color: red;
	}
	
	/* Applied to <p> tags with class="red" */
	p.red {
		color: white;
		background-color: red;
	}

	/* Applied to the tag with the id="some-id" */
	#some-id {
	  font-style: italic;
	  font-size: large;
	}

	/* Applied only to <p> tags that are inside <li> tags */
	li p {
	  color: #0C0;
	}
	
	/* Applied to <a> tags when the mouse is over them:
	a:hover {
		text-decoration: underline;
	}
	
	/* Applied to all links starting with # (i.e. internal links) */
	a[href^="#"] {
		background-color:gold
	}
```

To know more about CSS, I recommend looking at [MDN's developer guide](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started). In particular, for geometric properties (margin, padding, width/height, border) you should know about the [Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/box_model).

Warning: css styles are not supported or rendered the same by all browsers!


### The client-side nightmare

There are endless sources of libraries, scripts, examples etc. online, but there are also dangers in relying on unstable technology. 

Web technologies evolve at a remarkably fast rate. [Standards for web technologies are defined](http://www.w3.org), but are often only partially and sometimes incorrectly implemented by browser developers. Clients use a wide variety of platforms with different screen resolutions and capabilities, and different browsers, browser settings, plugins, and often quite old browser versions, making it very hard to predict what a page will look like or even whether it will even work. The situation today isn't much better than it was a decade ago (standards are clearer but vaster, and platforms are more diverse). Best practice is to keep things simple, detect failure and have fallback solutions, assume last year's technology at best, and test widely. 



### Visualization

- [D3.js](http://d3js.org) is a JavaScript library for manipulating documents based on data.   
[![Interactive Data Visualization for the Web, Scott Murray](http://alignedleft.com/assets/images/idvftw_cover.gif)](http://chimera.labs.oreilly.com/books/1230000000345/index.html)
- [The Google Visualization API](https://developers.google.com/chart/interactive/docs/reference)
- [Sigma graph drawing](http://sigmajs.org)


## XMLHttpRequest

> XMLHttpRequest is a JavaScript object that was designed by Microsoft and adopted by Mozilla, Apple, and Google. It's now being standardized in the W3C. It provides an easy way to retrieve data from a URL without having to do a full page refresh. 

The XMLHttpRequest object is available both in [client browser JavaScript](https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest), and in Max/MSP/Jitter JavaScript (with some small differences -- see the maxurl help file). 

A typical example looks like this:

```javascript
	function reqListener () {
		console.log(this.responseText);	// Browser
		//post(this.responseText);		// Max
	}

	var req = new XMLHttpRequest();
	req.onreadystatechange = reqListener;
	req.open("get", "http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&units=metric", true);
	req.setRequestHeader("Content-Type" , "application/json");
	req.send();
```

In the browser, we can also use jQuery's `$.get` wrapper for XMLHttpRequest. See [manual](http://api.jquery.com/jquery.get/).

```js
// insert snippet.html into the page at the div named "result":
$.get( "snippet.html", function( data ) {
  $( "#result" ).html( data );
  alert( "Load was performed." );
});
```

### Cross-Origin Resource Sharing (CORS)

For security, browsers typically do not allow a website on one domain to dynamically pull in data from another domain; i.e. they typically apply a *same-domain policy*. Fortunately, in the case of XMLHttpRequests, the provider may explicitly allow CORS, as is the case for http://api.openweathermap.org. Moreover, most dynamic requests will fail when running the HTML file from a local filesystem. *They need to be running from a server.* 

Node.js lets us write complex server applications, but it also provides a simple way to run a server from any location on your filesystem. First, install this capability on your computer by typing this in your terminal (you'll have to make sure node.js is installed first of course, see above):

```sh
npm install -g http-server
```

Once installed, you can run this from any location in your terminal like this:

```sh
http-server
```

And you can then open this in your browser at address http://0.0.0.0:8080/test.html

### Handling the response in a browser:

[See the MDN tutorial](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

----



# Visualisation

[![Flickr Flow](http://hint.fm/projects/flickr/flickr1.jpg)](http://hint.fm/projects/flickr/)

The Promise of Data Visualization: 

- Bypass language centers, go direct to the visual cortex
- Leverage ability to recognize patterns, visual sense-making
- Animation, interaction & live data processing readily possible

> Excellence in statistical graphics consists of complex ideas communicated with clarity, precision, and efficiency. -- Edward Tufte

## Roles of visualisation:

- Making sense of new information:
	- Data that reveals previously unknown insights into patterns of life
	- Visualization as a way to "throw things on the wall" and examine
	- Things that used to be unknown, unknowable, or impractical to know
	- Less about visualization than the **data**

- The Familiar Through a New Lens:
	- Innovations in graphic display can change how we experience an idea
	- Less about data than the **visualization**
	- "Now I see it"
	- Telling an explanatory story

- Environment for Exploration:
	- Tool for individual or collective exploration
	- Can show same data in multiple dimensions, like time/space
	- Search, filter, drill down to details
	- Ideally, mark and share discoveries within the tool
	
## Examples

[Visual Complexity](http://www.visualcomplexity.com/vc/)

[Infosthetics](http://infosthetics.com)

[D3 gallery](https://github.com/mbostock/d3/wiki/Gallery)

[Jer Thorp](http://blog.blprnt.com/selected-works)


## The Ben Fry data visualization process

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

## The Data

### Acquire

Original research data; as spreadsheets/databases or digitized media. 

Downloadable public data, archives. 

Scraping tools (e.g. [junar](http://www.junar.com), [outwit](https://www.outwit.com/products/hub/))

Combine / contextualize / mash-up

### Clean, parse & filter

Clean and great data is essential for good visualisations. Good data is easily machine-readable, with semantic notes easily human-readable. Data is normalized, gaps are meaningfully handled, and noise reduced.

Normalization, Format Conversion:

- Remove everything but headers from tabular data (e.g. excel files), or copy the table of interest into a new sheet. Make sure the headers make sense. Export as CSV/TSV, json, XML etc. See [Mr Data Converter](http://shancarter.github.io/mr-data-converter/)
- Fully separate annotations from raw data. 
- Remove specialised numeric formatting and normalize/make absolute where possible. E.g. 1000 is better than 1,000, 0.5 is better than 50%, etc. 
- Convert to international standards (dates, locations, temperatures etc.) when possible.
- Fill in gaps with appropriate markers, rather than leaving them nil/null/undefined. 
- Order data by the categories you need
- Remove all but data of interest

Combine multiple data sets into meaningful structure

See [OpenRefine](http://openrefine.org)

### Mine / Analysis

Apply methods from statistics or data mining as a way to discern patterns or place the data in mathematical context.

Google Sheets (or Excel) is one way of applying basic statistical analysis. 

Again, combination with distinct data sets / sources / and especially APIs can be a rich way to further analysis. E.g. natural language processing APIs. 

**Note: Correlation is not causation. [A wonderful example of spurious correlations](http://www.tylervigen.com).**

## The visualisation

### Represent: Choose the right chart for your data

[![The data visualization catalogue](http://visualoop.com/media/2014/10/The-Data-Visualisation-Catalogue-680x490.png)](http://www.datavizcatalogue.com)

Before thinking about how the visualization should look, the data must first be understood. The first step in creating a data visualization is to examine the data. Basic questions that need to be answered are:

- What is the data?
- What are the relationships between the variables?
- How is the data organized?
- What needs to be communicated?

[![img](http://img.labnol.org/di/data-chart-type.png)](http://www.labnol.org/software/find-right-chart-type-for-your-data/6523/)

There are many advantages to using standard data visualisation chart patterns; they are proven to work effectively, and are familiar. But many data sets have unique characteristics which will force you to come up with new ways of communicating the data in the most effective and powerful way possible, or at least combine more than one representation to provide all the perspectives necessary to the story.

### Refine: revealing the data

It is not only the type of visualisation pattern chosen - but also the design of the individual elements that play an important role in communicating information to others. 



#### Graphical perception fundamentals

Data presented visually must be decoded into useful information by users. [Preattentive variables](http://designinginterfaces.com) communicate something about the design before the user pays conscious attention to it; i.e. they communicate more directly than numbers and text. These include:

![preattentive](img/preattentive.png)

[What  people are able to decode most accurately, in order](https://secure.cs.uvic.ca/twiki/pub/Research/Chisel/ComputationalAestheticsProject/cleveland.pdf), is:

1. Position along a common scale e.g. scatter plot
2. Position on identical but nonaligned scales e.g. multiple scatter plots
3. Length e.g. bar chart
4. Angle & Slope (tie) e.g. pie chart
5. Area e.g. bubbles
6. Volume, density, and color saturation (tie) e.g. heatmap
7. Color hue e.g. newsmap

#### Tufte guidelines

Edward Tufte is the expert whose work has probably contributed most significantly to designing effective data presentations. According to his checklist, all data visualisations should:

- Show the data
- Be accurate (don’t distort the data)
- Make large data sets coherent
- Serve a clear purpose
- Reveal the data at different levels (overview versus detailed)
- Encourage the viewer to compare different pieces of data

Here are Tufte's principles of graphical integrity:

1.  The representation of numbers, as physically measured on the surface of the graph itself, should be directly proportional to the numerical quantities represented
2. Clear, detailed and thorough labeling should be used to defeat graphical distortion and ambiguity.  Write out explanations of the data on the graph itself.  Label important events in the data.
3. Show data variation, not design variation. 
4. In time-series displays of money, deflated and standardized units of monetary measurement are nearly always better than nominal units.
5. The number of information carrying (variable) dimensions depicted should not exceed the number of dimensions in the data.

The **Data-Ink ratio** is a concept introduced by Edward Tufte to emphasize his no.1 checklist item: "Above all else, show the data". The data-ink ratio is the proportion of ink that is used to present actual data compared to the total amount of ink (or pixels) used in the entire display. It is another way of saying "avoid chart-junk". 

> A large share of ink on a graphic should present data-information, the ink changing as the data change. Data-ink is the non-erasable core of a graphic, the non-redundant ink arranged in response to variation in the numbers represented.

Again, a similar ratio can be applied to animation; think of 'movement-ink' being used to animate objects. How much of the movement is presenting actual data, in relation to movement that is not. Perhaps it can be quantified in terms of forces, for example.

[More do's and don'ts](http://www.eea.europa.eu/data-and-maps/daviz/learn-more/chart-dos-and-donts)

#### Animation

The above refers to static visualizations; animated visualizations introduce new perceptual features and pre-attentive variables. [But animated visualization is still a new and active research area; there is little consensus on what makes for a good animation.](http://research.microsoft.com/pubs/130998/bv_ch19.pdf)

Can we learn from the barrage of long-used animation techniques from cartooning? 

- Moving items along *arcs* implies a more natural motion; motion along a straight line seems to have intent. 
- *Ease-in, ease-out*: animations start slowly to emphasize direction, accelerate through the middle, and slow down again at the end. 
- Complex acts are *staged* to draw attention to individual parts one at a time.
- *Squash and stretch*, distorts objects during movement to draw the eye toward the direction of motion
- Before objects begin moving, they *anticipate* their upcoming motion; they conclude with a *follow-through*. 

Cartooning endows drawn shapes with the 'illusion of life' through causality, agency and ultimately emotion is central to cartooning. But this can be a negative for visualisation: animation often makes us ascribe agency and causality where none really exists. 

> As early as 1946, the Belgian psychologist Albert Michotte noted the “perception of causality” (Michotte 1963). It is easy to believe that the movement in an animation shows intent: that this point is chasing another across the screen (rather than moving in an equivalent trajectory one second behind it), that this ball hit another (rather than “this dot stopped at point A, and this other dot moved from A to B”), and so on. 

**Animation as explanation**: 

Short animations are one of the best tools out there for explaining ideas. By adding time to the design 'canvas', one becomes more a director of an explanation, not just a designer of information. Animation can form an argument, explain a proposition, or show cause and effect. 

Such animations require an understanding of pacing, sequencing, structure and rhythm. It requires that you think through the organizational structure of an explanation, both in hierarchy and flow. But it is not a good solution if you need to see a lot of data at once to compare and connect relationships.

Animation can help engage users (nothing can capture the attention of the human visual system like motion), but without care can be a detriment to comprehension. There is also "animation junk"... 

<iframe width="640" height="480" src="https://www.youtube.com/embed/71hNl_skTZQ?rel=0" frameborder="0" allowfullscreen></iframe>

- Animations can help a viewer work through the logic behind an idea by showing the intermediate steps and transitions. Staging animations -- making sure one thing happens at a time -- can aid legibility. When there are many changes, it becomes more difficult to follow. 
> The Gestalt perceptual principle of common fate states that viewers will group large numbers of objects together, labeling them all as a group, if they are traveling in the same direction and at the same speed. Individual objects that take their own trajecto- ries will be seen as isolates, and will visually stand out. If all the items move in different directions, however, observers have far more difficulty following them. Perception researchers have shown that viewers have difficulty tracking more than four or five objects independently—the eye gives up, tracking only a few objects and labeling other movement as noise.

- Building (or unbuilding) a visualisation before the viewer's eyes can help them to understand the primary and secondary components. It explains the data through a construction or deconstruction of the layers of a diagram.

- Animations can change the view, or surface (e.g. scaling), or filter & re-order data, to convey a specific narrative. 

- Animation can show how data collected over time changes. 
	- Motion allows us to follow identities between different frames, but it should be meaningful.
	- Do animated transitions between data points lie more than line graphs between data points? It is important to preserve the invariant mapping (the meaning of axes) and the congruence of marks to data through animation (so e.g. a bar in a chart does not change what category it represents). Squashing & stretching etc. certainly break this rule.

- Animation is also used to evoke data: icons may move in a way that indicates their category (especially for mood affects, but also flow lines). 

### Interact

When we allow the user to interact with the data, it is not only about how the data is displayed, but also about how it behaves, that creates meaning. 

**Animation as exploration**: User studies have shown that animation is often ineffective at transferring knowledge, but can be more effective when knowledge is constructed, i.e. in combination with interaction. This is perhaps because animation alone actually takes control of attention away from you, whereas interaction gives you more.

User interactions are broadly categorized as:

- Selecting and filtering (what data is displayed -- helps users find data relevant to what they are looking for)
- Arrangement and navigation (how data is displayed -- helps users find new meaning in the data)

When interactive control of selecting, filtering, arranging and navigation provides immediate feedback, it shares the data visualization process with the user, and becomes a full-fledged tool for discovering new meaning and relationships in the data.

[see also](http://piksels.com/wp-content/uploads/2009/01/visualizingdata.pdf)

----


# D3.js

[D3.js](http://d3js.org) is a JavaScript library for manipulating documents based on data.   
[![Interactive Data Visualization for the Web, Scott Murray](http://alignedleft.com/assets/images/idvftw_cover.gif)](http://chimera.labs.oreilly.com/books/1230000000345/index.html)

To get the main D3.js JavaScript file go to the D3.js website and download the latest version d3.v2.min.js to your project folder, and add it to your HTML `head` like so:

```html
<head>
	<script type="text/javascript" src="d3.v3.min.js"></script>
</head>
```

Or, you can link to the host directly:

```html
<head>
	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
</head>
```

> D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document. For example, you can use D3 to generate an HTML table from an array of numbers. Or, use the same data to create an interactive SVG bar chart with smooth transitions and interaction.

D3 does this by means of a query/attribute system very similar to jQuery. E.g., to change all paragraph text to be white:

```js
d3.selectAll("p").style("color", "white");
```

Yet styles, attributes, and other properties can be specified as functions of data in D3, not just simple constants. For example, to alternate shades of gray for even and odd nodes:

```js
d3.selectAll("p").style("color", function(d, i) {
  return i % 2 ? "#fff" : "#eee";
});
```

> Despite their apparent simplicity, these functions can be surprisingly powerful, and many useful geometric (and even geographic) patterns are provided. 

## Join to data

Computed properties often refer to bound data. Data is specified as an array of values, and each value is passed as the first argument (d) to selection functions. 

```js
d3.selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .style("font-size", function(d) { return d + "px"; });
```

(The strange dot syntax is called "chaining": when a function returns an object, we can call methods on that object in turn.)

The data() method maps each element of the array to each DOM node in the selection (fully explained [here](http://alignedleft.com/tutorials/d3/binding-data)). You can actually see that in the console DOM view as the `__data__` member of the DOM element. Once the data has been bound to the document, you can omit the data operator. [For a much more detailed explanation, see here](http://bost.ocks.org/mike/selection/).

Don't worry about matching the array length: using D3’s enter(), you can create new nodes for incoming data (and use exit() to remove nodes):

```js
d3.select("body").selectAll("p")
	.data([4, 8, 15, 16, 23, 42])
	.enter()
	.append("p")
	.text(function(d) { return "I’m number " + d + "!"; });
```

> D3 lets you transform documents based on data; this includes both creating and destroying elements. D3 allows you to change an existing document in response to user interaction, animation over time, or even asynchronous notification from a third-party. Best of all, D3 is easy to debug using the browser’s built-in element inspector: the nodes that you manipulate with D3 are exactly those that the browser understands natively.

In addition to using standard HTML and CSS, D3 allows you to use another web standard, SVG (scalable vector graphics) for drawing graphical representations of data in the DOM. You can create SVG elements using D3 and style them with external stylesheets. SVG can be embedded in HTML pages just like any other tag, e.g. a blue circle:

```html
<svg width="50" height="50">
    <circle cx="25" cy="25" r="22"
     fill="blue"/>
</svg>
```


D3’s focus on transformation extends naturally to animated transitions. Transitions gradually interpolate styles and attributes over time. For example, to resize circles in a symbol map with a staggered delay:

```js
d3.selectAll("circle").transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attr("r", function(d) { return Math.sqrt(d * scale); });
```

## SVG graphics

Always wrapped in an `<svg>` element, which should have a width & height (graphics will be clipped to this box). Within that, SVG code itself is a form of XML. 

Simple SVG shapes include rect, circle, ellipse, line, text, and path. The coordinate system is pixel based, with 0,0 at the top left. 

Common SVG properties are: fill (CSS color), stroke (CSS color), stroke-width, opacity (0.0 is transparent, 1.0 is opaque). [These can all be set with CSS styles](http://www.w3.org/TR/SVG/styling.html). All text will inherit the CSS-specified font styles of its parent element unless specified otherwise via CSS.

```html
<svg width=500 height=500>
	<rect x="0" y="0" width="500" height="10" />
	<circle cx="250" cy="20" r="5" fill="yellow" stroke="orange" stroke-width="2"/>
	<g transform="translate(250,30)">
		<ellipse cx="0" cy="0" rx="10" ry="5" class="pumpkin"/>
	</g>
	<line x1="0" y1="40" x2="500" y2="50" stroke="black"/>
	<text x="250" y="60">Easy-peasy</text>
</svg>
```
Objects draw with the 'painter's algorithm': objects are draw in order, and new objects will hide older objects (unless opacity is less than one). It is important to render axes, labels etc. last.

Here's an example of binding data to SVG:

```js
var dataset = [ 5, 10, 15, 20, 25 ];
// create a new <svg> element and size it:
var svg = d3.select("body")
            .append("svg")
            .attr("width", 500)  
            .attr("height", 50); 
// select 'circle' element in the svg, bind data, enter to create them, 
// append the elements
// and style them (position & size)
svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("cx", function(d, i) {
		return (i * 50) + 25;
	})
	.attr("cy", 25)
	.attr("r", function(d) {
		return d;
	});
```

Here's a different way, using group transforms:

```js
var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
```

To add labels, we would run another `selectAll("text")` and position accordingly.

## Better data handling

The data array does not need to be simply an array of numbers; it can be an array of objects. Each one of those objects will be passed to the attr() handlers for each item. It therefore makes a whole lot of sense to prepare and annotate this array of objects before passing to the svg.selectAll.

Scales are functions that map from an *input domain* to an *output range*. Since data is unlikely to be in the same range as the svg pixels, a scale function can be used to provide the transformation from an input domain of fahrenheit to an output range of celsius:

```js
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

There are methods for creating [margins and axes](http://bost.ocks.org/mike/bar/3/). 



## Dynamic data

Instead of generating data in JavaScript, it can be loaded from local files with d3.tsv(), [d3.csv()](https://github.com/mbostock/d3/wiki/CSV), [d3.json()](https://github.com/mbostock/d3/wiki/Requests), d3.xhr(), d3.text() etc.

D3 can also very easily, and powerfully, animate transitions. [A great in-browser demo here](http://alignedleft.com/projects/2014/easy-as-pi/).

When using transitions and dynamically updated data, it is very important to pass a second **key** argument to the `data()` call; this key is a function that returns the unique identifier of a given data record; that way D3 knows which records to animate when the data changes. 

With dynamic data (especially with transitions), we may need to separately state how to manage new items that appear, and old items that disappear, in addition to existing items that change. This is what the enter(), and exit() methods are for. See the [general update pattern](http://bl.ocks.org/mbostock/3808234).

**[More D3 tutorials](https://github.com/mbostock/d3/wiki/Tutorials)**

----

[![xkcd](http://imgs.xkcd.com/comics/movie_narrative_charts_large.png)](http://xkcd.com/657/)


----

# Open Data

[The Open Data Handbook](http://opendatahandbook.org/en/index.html)

[Tim Berners-Lee (www founder) TED talk](http://www.ted.com/talks/tim_berners_lee_the_year_open_data_went_worldwide?language=en)

> Do you know exactly how much of your tax money is spent on street lights or on cancer research? What is the shortest, safest and most scenic bicycle route from your home to your work? And what is in the air that you breathe along the way? Where in your region will you find the best job opportunities and the highest number of fruit trees per capita? When can you influence decisions about topics you deeply care about, and whom should you talk to?

> New technologies now make it possible to build the services to answer these questions automatically. Much of the data you would need to answer these questions is generated by public bodies. However, often the data required is not yet available in a form which is easy to use. This book is about how to unlock the potential of official and other information to enable new services, to improve the lives of citizens and to make government and society work better.

> The notion of open data and specifically open government data - information, public or otherwise, which anyone is free to access and re-use for any purpose - has been around for some years. In 2009 open data started to become visible in the mainstream, with various governments (such as the USA, UK, Canada and New Zealand) announcing new initiatives towards opening up their public information.

Open Data may come in the form of a whole static database (CSV, EXCEL, TXT etc.), or it may be served as an API. An API will require some kind of request structure, such as location for a weather report, and should describe the structure of the response to expect. The open data documentation should also explain whether it includes geospatial information, and how frequently it is refreshed (if appropriate).

## Mashups, Web Mining, Harvesting, ... 

Web mining is defined as the use of data mining, text mining, and information retrieval techniques to extract useful patterns and knowledge from the Web.

A [mashup](http://en.wikipedia.org/wiki/Mashup_(web_application_hybrid), in web development, is a web page, or web application, that uses content from more than one source to create a single new service displayed in a single graphical interface. The term implies easy, fast integration, frequently using open application programming interfaces (open API) and data sources to produce enriched results that were not necessarily the original reason for producing the raw source data. The main characteristics of a mashup are combination, visualization, and aggregation. 

## Big Data

[Big data](http://en.wikipedia.org/wiki/Big_data) is an all-encompassing term for any collection of data sets so large and complex that it becomes difficult to process them using traditional data processing applications.

The world's technological per-capita capacity to store information has roughly doubled every 40 months since the 1980s; as of 2012, every day 2.5 exabytes (2.5×1018) of data were created; as of 2014, every day 2.3 zettabytes (2.3×1021) of data were created. In addition to volume, data is increasing in velocity and variety. This is partly due to the increased quantity and detail of sensing in the environment, and partly due to the increased amount of information derivable from connecting existing data. 

Operating on big data presents many technical challenges, exceeding the capacities of ordinary computing systems. Massively parallel architectures such as Google's MapReduce (see the open source Hadoop implementation) divide queries and processes in parallel (the map step) and later combine and deliver results (the reduce step). 

The vastness also permits new methods: inductive statistics and nonlinear system identification can infer laws (relationships, causal effects) from very noisy data sources, revealing relationships and supporting prediction. It constitutes a new wave of purely statistical artificial intelligence (see Google Translate and Watson). 

It has attracted billions of dollars of research funding in the last decade. 

The ethical and organizational challenge is determining who should own big data initiatives. Apart from the apparent difficulties in keeping personal data private, analysis of massive quantities of anonymous data may be enough to identify and deeply characterize individuals and groups. Analysis of massive quantities of anonymous search terms may be enough to predict major socio-political and economic events. 

Many believe that big data spells the end of theory. However critics point out that analytic algorithms can only predict a future similar to the past; but if system dynamics change, only theory can make predictions for the future. Combining analytics and theory is possible through simulations. Big science has also been criticized for lack of rigour, risk of bias, and buzzword mythology.

## Open Government Data APIs

[Open Government Across Canada](http://open.canada.ca/en/maps/open-data-canada)

[Ontario open data catalogue](http://www.ontario.ca/government/open-data-ontario)

[Open Data - Toronto](http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=9e56e03bb8d1e310VgnVCM10000071d60f89RCRD) -- 311 (potholes, graffiti), bike share, off-street parking, TTC arrivals, etc.

[US government](https://www.data.gov/developers/apis)

[General governmental data](http://dev.socrata.com)

[United Nations, UNICEF, WHO](https://www.undata-api.org)


## Web-based Data/Service APIs

[Quick response test](http://httpbin.org)

There are now many open data application program interfaces (APIs) online for you to try. Many of them will require that you sign up to receive an ID. Not all are free. 

**Remember that many services will not expect you to be making large numbers or high rates of requests, and may even blacklist you if you try to do so.** Make your requests only as frequently as they are expected to change, and cache and re-use your results. 

**Also be sure to check that the data license is compatible with your intended use -- stay legal!**

[Weather](http://openweathermap.org/API) and [more options](http://superdevresources.com/weather-forecast-api-for-developing-apps/)

[Google Data APIs](https://developers.google.com/gdata/docs/directory) -- includes Picasa, YouTube, Maps, Translate etc.

[Open Street Map](http://wiki.openstreetmap.org/wiki/API)

[NASA](http://open.nasa.gov/developer/)

### Aggregators

[ProgrammableWeb: "The world's largest API repository"](http://www.programmableweb.com/apis/directory)

[Datahub, the free, powerful data management platform from the Open Knowledge Foundation](http://datahub.io)

[DataLook is all about finding and sharing data-driven projects for social good](http://datalook.io)

[Many more examples from this blog post](http://blog.visual.ly/data-sources/)

---

### Acquiring data that has already been collected about you. 

Most major online services have an API, and many allow you to acquire data surrounding your activity. If you have a Google site, Android/iOS app, or even a Unity game, you might already be collecting data via [Google Analytics](https://developers.google.com/analytics/devguides/collection). If you host a site or code repository at [Github](https://developer.github.com/v3/), they have some great APIs you can use. Similarly for accessing your [Facebook data](https://developers.facebook.com/docs/graph-api/overview/). Look further afield-- even your bank might have an API you can use, or offer you the option to download transaction histories as a static database. 

Your phone is a rich source of personal data. [You can probably browse your phone's location history here](https://maps.google.com/locationhistory/b/0/) -- however there is not currently a working API to download this en masse. [(A possible workaround is described here)](https://shkspr.mobi/blog/2014/04/extracting-your-own-location-information-from-google-the-hard-way/). 

### Flickr

1. (Get an API key](https://www.flickr.com/services/apps/create/apply)
- You'll need to use an existing Yahoo/Flickr account, or sign up for one.
- Choose the *non-commercial* option
- Pick a name. Choose wisely -- you won't be able to change it. 
2. Copy the API key and secret!
3. Make sure you have [read the terms and conditions](https://www.flickr.com/services/api/tos/). In particular:
- Flickr users own the photos, and can set their own restrictions. You must abide by them.
- Best practice is to not cache images for more than 24 hours
- You must not use the images for commercial gain, nor to break any law.
- You shall place the following notice prominently on your application: "This product uses the Flickr API but is not endorsed or certified by Flickr."
4. The Flickr API works a little bit differently and instead of JSON it works with JSONP (JSON with Padding). The difference between these two formats is that JSONP returns a name of a function in its response and this function will handle the response data in your code.

### Google Maps

- [Some lovely examples](https://developers.google.com/maps/documentation/javascript/)
- Pretty generous: "If your site or application generates 25 000 map loads or more each day, for more than 90 consecutive days, we’ll get in touch with you to talk about payment."
- [Tutorial](https://developers.google.com/maps/documentation/javascript/tutorial)

[![xkcd](http://imgs.xkcd.com/comics/api.png)](https://xkcd.com/1481/)


----



# Media are Data

![On Broadway - Lev Manovich](http://manovich.net/content/03-exhibitions/01-on-broadway/thumb.jpg)

Media objects themselves are considered databases. These objects could take the form of audio data (music, sound recordings, voice), visual data (paintings, photographs, drawings) and time-based visual data (cinema and other recordings), text (prose, poetry, software code), three-dimensional data (architecture, sculpture, spatially-captured data), etc. 

Lev Manovich has written extensively on the conceptualization of media as database, including characterizing computer games as navigable spatial databases ([Manovich, L. The Language of New Media. MIT Press, 2002.](http://mitpress.mit.edu/books/language-new-media)); and has extensive course notes on the treatment of [cultural artifacts as repositories of data](https://docs.google.com/document/d/1DsAQUQ7paWimVQMNwXDO5Qgm7xnpeqv9HQdpn9EPwsg). 

> After the novel, and subsequently cinema privileged narrative as the key form of cultural expression of the modern age, the computer age introduces its correlate — database. Many new media objects do not tell stories; they don't have beginning or end; in fact, they don't have any development, thematically, formally or otherwise which would organize their elements into a sequence. Instead, they are collections of individual items, where every item has the same significance as any other.

> Why does new media favor database form over others? Can we explain its popularity by analyzing the specificity of the digital medium and of computer programming? What is the relationship between database and another form, which has traditionally dominated human culture — narrative? These are the questions I will address in this article. [(Manovich, L. Database as a Symbolic Form, 1998)](http://manovich.net/content/04-projects/021-database-as-a-symbolic-form/19_article_1998.pdf)

Some example artists working in this area:

- [George Legrady](http://www.georgelegrady.com), 
- [Luke Dubois](http://lukedubois.com), 
- [Aaron Koblin](http://www.aaronkoblin.com/work.html), 
- [Ben Fry](http://benfry.com/distellamap/), 
- [Stefanie Posavec](http://www.stefanieposavec.co.uk/-everything-in-between/#/writing-without-words/), 
- [Lev Manovich](http://manovich.net/index.php/exhibitions),
- [Fernanda Viégas and Martin Wattenberg](http://hint.fm/projects/listen/)

## Gathering data from media

Objects-as-data can be considered alone, or as part of a collection; and may also be considered alongside metadata (such as song lyrics, film subtitles, historical documents, commentaries, dates and locations of capture, etc.)

Within each media object, we are often driven to extract salience in human terms. We may be looking for occurrences of certain sounds within and audio file, or for its pitches, rhythms, dynamics and spectral variations. Within images we may be looking for specific shapes, or considering the distributions of colors, edges, patterns and densities. Within moving images we may seek general and specific movements of these elements. Within text we may seek keywords, associations, patterns of language usage, grammatical variations. And within three-dimensional data we may seek surfaces and planes, specific shapes, features of interest, enclosures and passages etc. 

In all these media we thus make use of pattern recognition, feature extraction, statistical analysis and machine learning. And many cases, a preliminary process of cleaning, organising, reducing and filtering the data is called for (and potentially filtering the results). 

### Visual media

**Computer vision** is a field that includes methods for acquiring, processing, analyzing, and understanding images in order to produce numerical or symbolic information. A theme in the development of this field has been to duplicate the abilities of human vision by electronically perceiving and understanding an image. As a scientific discipline, computer vision is concerned with the theory behind artificial systems that extract information from images. The image data can take many forms, such as video sequences, views from multiple cameras, or multi-dimensional data from a medical scanner. As a technological discipline, computer vision seeks to apply its theories and models to the construction of computer vision systems.



Max/MSP/Jitter includes several image analysis externals: [jit.3m] returns the min, mean and max values of each plane of a matrix. [jit.bsort] bubble-sorts the cells of an incoming matrix across one dimension. [jit.findbounds] locates the bounding region of pixels in a given value range. [jit.fft] moves matrices between spectral domains. [jit.histogram] calculates the distribution of values on each plane (i.e. colors) for one or more input matrices. 

However the computer vision capabilities have been greatly extended by Jean-Marc Pelletier:

> [cv.jit](http://jmpelletier.com/cvjit/) is a collection of max/msp/jitter tools for computer vision applications. The goals of this project are to provide externals and abstractions to assist users in tasks such as image segmentation, shape and gesture recognition, motion tracking, etc. as well as to provide educational tools that outline the basics of computer vision techniques.

For the purposes of this course, I have prepared a version of cv.jit in the Max package format, which you can [download from this page (click on the "view raw" link)](https://github.com/grrrwaaa/courses/blob/master/datt3935/code/cv.jit_v1.7.2.zip). Once downloaded, unzip the contents into Documents/Max 7/Packages and restart Max. You can verify that the package installed correctly by opening the "cv.jit-Object Guide" from Max's Extras menu.



The externals are broadly grouped according to:

- Edge extraction
- Pattern detection (lines, edges, salient points, faces, training)
- Shape detection (edges, directions, thinness, compactness
- Tracking (selected pixels, blobs, bright regions)
- Blob detection, and labeling, for tracking notable features within a moving image
- Optical flow (movement detection)
- Statistics (variance, deviation, running average, mean)
- Filtering (and morphology changes, such as erosion & dilation)

In most cases input needs to be converted to greyscale, and possibly even thresholded to obtain a binary image. This is a radical reduction of input data that should be done carefully to preserve meaning.

### Audio

Descriptors are metadata to describe multimedia information to assist searching, classifying and understanding content. Audio descriptors are typically derived from temporal and spectral analyses. 

Max/MSP/Jitter comes with several analysis objects, including basic level following with [peakamp~] and [avg~], and time-domain level crossing detection with [zerox~], [thresh~], [edge~], [change~] and [spike~]; and more capabilities in this regard via gen~. There is also the [sync~] object, which can derive BPM from received bangs. In the spectral domain, there are several examples using fft~ and pfft~. However richer, more powerful or more accurate feature detection algorithms have been contributed by the community:

[Zsa.descriptors](http://www.e--j.com/index.php/what-is-zsa-descriptors/) is a library for real-time sound descriptors analysis for Max developed by Mikhail Malt and Emmanuel Jourdan. The free version has a pop-up splash screen but is otherwise fully functional, and comes as an easily installable package (drop into Documents/Max 7/Packages). Analyses include:

[A set of audio analysis externals from Adam Stark](http://www.eecs.qmul.ac.uk/~adams/software.html), including beat tracking and tempo estimation, chroma (pitch class) estimation, and chord detection. OSX only, unfortunately.

[Another set of spectrally-driven audio feature analysis, from Tristan Jehan](http://web.media.mit.edu/~tristan/maxmsp.html), including pitch, loudness, brightness, noisiness, perceptually-driven spectrum, onset and beat detection -- however these are older and I have experienced them to be less stable.

[ml.lib](http://artfab.art.cmu.edu/ml-lib/) is a collection of gesture analysis and machine learning externals based on the [Gesture Recognition Toolkit](http://www.nickgillian.com/software/grt#MachineLearningAlgorithms). A particularly useful page on the latter site is [a guide to selecting the algorithm for the task at hand](http://www.nickgillian.com/wiki/pmwiki.php/GRT/GettingStarted#AlgorithmSelection). The main goal of the library is to train a system to recognize specific patterns in an input stream based upon a collection of prior examples. I can upload a working archive for OSX if needed.


### Filtering & storing analyses

Before submitting to analysis, it may be useful or even necessary to pre-filter. Audio signals may need dc blocking (a solution exists in gen~), and perhaps also thresholding to remove quiet moments. They may also neen normalization. Images may benefit from reduction in resolution, posterization and blur, or other techniques to reduce noise. 

The raw results of analyses can also be noisy, and it may be wise to smoothen the data (numbers with [zl stream] -> [zl mean], matrices with [jit.slide] or [cv.jit.ravg], audio signals with [slide~] or [rampsmooth~] etc.). 

A rather direct working method to store data is to use the analyses to simply reduce and compile the input media into shorter fragments, e.g. cutting out all uninteresting segments (noisy frames, quiet moments, shaky camera, keeping only images with faces in, etc.), filtering on features of interest. Sometimes simply compiling these fragments into a new media file has been sufficient to present as a work of art.

Another common process is to create annotation databases for media files. In the case of audio and movie inputs these annotations should be timestamped. There is no right or wrong way to store annotations -- it mostly depends on the intended use. Older patchers will likely used [coll], but today [dict] is more advisable (and it can also export to YML and JSON). A third option, for purely numeric data of known length, is to store annotations within a [jit.matrix], which can be saved and also exported as CSV.  Of course CSV and JSON can both be read by D3.js, opening up the option to perform analysis in Max but visualize in the browser.

### Big data & media

Today there is a huge effort to understand media by means of big data. [Here's a recent TED talk on this topic](http://www.ted.com/talks/fei_fei_li_how_we_re_teaching_computers_to_understand_pictures) -- [(And here's the API...)](http://www.image-net.org/download-API) They analyzed 25 million images, using Amazon's Mechanical Turk to employ people to identify objects and other semantics by keyword, then supplied this data to a convolutional neural net. [And here's a talk at the Facebook conference also referring to the use convolution neural networks to understand language, for example](https://www.youtube.com/watch?v=UDu-cnXI8E8&feature=youtu.be).

---

### Unsorted

[Trend analysis](http://www.google.com/trends/explore?hl=en-US#q=doge&cmpt=q)


----


# What is a database?

Data ([from Latin, literally ‘something given,’ neuter past participle of dare ‘give.’](http://www.etymonline.com/index.php?term=data))    
Base ([from Latin basis "foundation," from Greek basis "step, pedestal," from bainein "to step"](http://www.etymonline.com/index.php?term=base))

A database is a persistent, organized collection of data. It is a form of structured memory that can easily become very large. 

## Activities

- Definition of database organization and structure (ontology design)   
The mode of organization -- model and metamodel -- is designed to support desirable modes of accessing and processing information. Models typically reflect aspects of reality, and thus are often termed **ontologies**. (The word ontology originates in philosophy, where it refers to study of the nature of reality, such as the basic categories of existence and their relations.) 

- Updates of actual data, and queries retreiving of sub-sets for application use   
[CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete): Create / Read / Update / Delete, the "four basic functions of persistent storage".   
In SQL: `INSERT, SELECT, UPDATE, DELETE`
>	- Create & Delete relate to unique existence (identity)
>	- Read & Update relate to input/output (send/receive, read/write), and also privileges.
>	- What is missing from CRUD? Search? List?
>	- Is an annotation an update or a create? What about a link? (i.e. the simplest annotation of 'is related to')

- Administration of the database to ensure its validity (absolute or approximate), accessibility & security, performance, and handling unexpected failures. 

- Visualization of the data, including mashing up multiple queries and data sources; related to infoviz, dataviz, sciviz, infographics, visual analytics, ...


## Models (a brief history)

Early databases used **navigational** models. A navigational database is a type of database in which records or objects are found primarily by following references from other objects. The simplest forms are the linked list and indexable array (and by extension, N-dimensional array). 

In the **hierarchical** model, a record has one parent but potentially many children, i.e. a tree structure. This model is still evident in e.g. file systems and the Document Object Model (DOM) of the web. In the network model a record can have multiple parent and child records, allowing arbitrary graph structures; a contemporary example is the WWW itself. In both cases records have an entity *type*, which defines the record structure. [WikiMindMap example](http://www.wikimindmap.org/viewmap.php?wiki=en.wikipedia.org&topic=data+visualization)

The **relational** model instead uses declarative techniques to ask *what* to fetch rather than *where* to find it. Relational databases store data records as rows in tables, where columns are typed and named fields, including a unique "primary" key column to identify the row. A database may have multiple tables, which can be linked to each other through the keys (the unique key column of one table can appear as a "foreign key" column in another). This allows complex structured queries spanning multiple tables, and returning results as new temporary tabular structures. Most relational databases use the SQL language, and this is currently industry dominant.

> [SQL](http://en.wikipedia.org/wiki/SQL) is a language modelling the relational theory for databases. SQL databases such as Microsoft's, Oracle's, PostgreSQL, MySQL etc. are very widely used in industry. SQL itself is a language to interact with a relational database, including creating, reading, updating and destroying data, through a somewhat natural language. The most frequent statement is SELECT, for performing queries. For example, to return an alphabetized list of sci-fi authors:

`SELECT author FROM book WHERE genre = "scifi" ORDER BY author`

**NoSQL** ("Not only SQL") databases store data in a form unlike a tabular relational model, such as key-value stores, graph stores, or document stores. Motivations include simplicity, horizontal scaling and fine access control. NoSQL databases are increasingly used in big data and real-time web applications, where the simplified design offers performance benefits. This is an active area of research!

- Document stores often use XML, JSON or YAML languages. In contrast to relational database rows, they have have complex internal structure that can vary between records; however each document does have a unique key (which may be a URI or path). 
- Key-value stores are based on the associative array data structure of computer science, also known as map, dictionary or symbol type. It is a collection of key-value pairs, in which each key must appear only once. For example, the JavaScript Object type is a key-value collection. 
	- [Entity Attribute Value](http://en.wikipedia.org/wiki/Entity–attribute–value_model) is a data model to describe entities where the number of attributes (properties, parameters) that can be used to describe them is potentially vast, but the number that will actually apply to a given entity is relatively modest. In mathematics, this model is known as a sparse matrix. AKA open schema. 
- Graph databases combines nodes, edges and properties in its ontologies, and records (nodes) have direct links to their adjacent nodes (no index lookups). It is thus a form of navigational database. Edges are the direct links between nodes. Both nodes and edges can have properties (key-value pairs). Graph databases can scale better than relational databases to larger sizes if the edge density is not too high, and better support ad hoc and changing schema. 


## Metadata

Data about data:

- **Structural**: describes the design, specification or layout of the data
- **Descriptive**: describes the content in a condensed manner, useful for sorting, searching etc.

Library card catalogs were a database of metadata about books. Metadata standards describe how to read & write metadata, and are often domain-specific. The Dewey Decimal System is a pre-digital example. 

Digital binary files, such as audio files, movies, images etc., often include a few bytes of metadata at the start (the "header") to describe the binary data that follows, and thus inform software **how to read it**. 

Web pages also have headers (contained in the `<header>` tag), which can include `<meta>` tags to describe the page content, title, keywords, language, etc. This metadata is mostly designed to aid **search and resource discovery**, whether by human browsing or automated indexing. 

Purposes:

- How, when, where the data was created
- Who it was created by
- What the data is for
- Standards used
- How to read the data
- Relevant relations and contexts for the data 



## Infographics / data visualization

![Charles Joseph Minard's vectorized map (1869) displaying the movements and the number of Napoleonic troops during the Russian campaign (1812-1813), as well as the temperature on the return path.](http://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Minard%27s_Map_%28vectorized%29.svg/1000px-Minard%27s_Map_%28vectorized%29.svg.png)

[Data visualization](http://en.wikipedia.org/wiki/Data_visualization), a modern equivalent of visual communication, involves the creation and study of the visual representation of data. Both an art and a science, data visualization refers to the techniques used to communicate data or information by encoding it as visual objects (e.g., points, lines or bars). A primary goal is to communicate information clearly and efficiently via information graphics, making complex data more accessible and usable, typically to support analysis, reasoning and decision-making.

To convey ideas effectively, both aesthetic form and functionality need to go hand in hand. An ideal visualization should not only communicate clearly, but stimulate viewer engagement and attention.

For Edward Tufte, the *design principle* of the information graphic should support the analytical task.

[Scientific visualization](http://en.wikipedia.org/wiki/Scientific_visualization) is primarily concerned with the visualization of three-dimensional phenomena, to graphically illustrate scientific data to enable scientists to understand, illustrate, and glean insight from their data. [Information visualization](http://en.wikipedia.org/wiki/Information_visualization) is the study of (interactive) visual representations of abstract data to reinforce human cognition. The abstract data include both numerical and non-numerical data, such as text and geographic information. 

----

## REST: Representational state transfer

[REST](http://en.wikipedia.org/wiki/Representational_state_transfer) is an architectural style, consisting of constraints imposed on a hypermedia system, which is abstracted from the structure of the World Wide Web (WWW). A system is **RESTful** if it fulfils these constraints:

- Client-server model   
A uniform interface separates clients and servers; e.g. clients are not concerned with data storage, and servers are not concerned with information display. This "separation of concerns" aids portability and scalability.
	- Layered   
A client cannot tell whether it is connected to the server directly or through an intermediary (such as load balancer). 
	- Stateless   
No client context is stored on the server between requests; each request includes all information needed to service it (session context is held in the client). 
	- Cacheable   
Response data can be safely cached and re-used without becoming stale or inappropriate.
- Uniform Interface  
	- Resources (such as entries in a database) can be requested through an identification system, such as URIs in the web, and returned as another representation such as XML, JSON etc.   
	- This representation, and its metadata, are enough to allow the client to issue another request to modify or delete it.   
	- Each message should include enough information to describe how it should be processed (such as what media type it includes, whether it is cacheable, etc.).  
	- Clients make state transitions only through the actions identified by the server response, such as hyperlinks in returned hypertext (HATEOAS; this differentiates it from a service-oriented architecture, in which clients and servers interact through a fixed interface).
