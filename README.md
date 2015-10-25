# jRCarousel
**j**Query **R**esponsive **Carousel** - __jRCarousel__

######jRCarousel is a jQuery plugin for responsive carousel with modern effects and multiple options.

## Features
- Modern effects
- Fullscreen Carousel
- Tiny plugin (gzipped ~ 1.6kb, uncompressed ~ 4.8kb)
- Infinite scroll
- Multiple slideLayouts to maintain aspect ratio
- Minimal configuration, easy to install
- Useful public API for extending the functionalities
- Large supports for browsers ( Internet Explorer(9+), Chrome, Firefox, Safari ..)
 

## Installation

```
<!-- add jQuery if not already present in your project -->
<script type="text/javascript" 
src='https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
<!-- add jRCarousel plugin -->
<script type="text/javascript" 
src="https://raw.githubusercontent.com/vinayakjadhav/jRCarousel/master/dist/jRCarousel.min.js">
</script>

```
#####Setup images source
```
var slides = [{src: 'http://lorempixel.com//1366/768'},
	      {src: 'http://lorempixel.com//1366/761'},
	      {src: 'http://lorempixel.com//1366/762'},
	      {src: 'http://lorempixel.com//1366/763'},
	      {src: 'http://lorempixel.com//1366/764'},
	      {src: 'http://lorempixel.com//1366/765'},
	      {src: 'http://lorempixel.com//1366/766'}];
```

#####Minimal configuration with defaults
```
var myJRcarousel = $('.jRCarouselGallery').jRCarousel({
						slides: slides
					});
```

#####Configuring all available options
```
$('.jRCarouselGallery').jRCarousel({
 	width: 800, 				/* largest allowed width */
	height: 356, 				/* largest allowed height */
	slides: slides, 			/* array of images source or gets slides by 'slide' class */
	slideLayout : 'contain',  /* "contain"-fit as per to aspect ratio | "fill"-stretches to fill |  "cover"-overflows but maintains ratio */
	animation: 'scroll', 		/* slide | scroll | fade | zoomInSlide | zoomInScroll */
	animationSpeed: 400,    /* animation speed in milliseconds */
	animationInterval: 4000,/* Interval between transitions or per sllide show time in milliseconds*/
	autoplay: true,         /* start playing Carousel continuously, pauses when slide is hovered*/
	onSlideShow: show,		/* callback when Slide show event occurs */
	navigation: 'circles'		/* circles | squares */
});
```
#####Images source provided in javascript
`<div class="jRCarouselGallery"></div>`

#####Images source provided in template by adding class `slide`
```
<div class="jRCarouselGallery">
  <img class="slide" src="http://lorempixel.com//800/351" />
  <img class="slide" src="http://lorempixel.com//800/352" />
  <img class="slide" src="http://lorempixel.com//800/353" />
  <img class="slide" src="http://lorempixel.com//800/354" />
  <img class="slide" src="http://lorempixel.com//800/355" />
</div>
```

