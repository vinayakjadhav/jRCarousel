# jRCarousel
**j**Query **R**esponsive **Carousel** - __jRCarousel__ by Vinayak Rangnathrao Jadhav

###### jRCarousel is a jQuery plugin for responsive carousel with modern effects and multiple options.

## Features
- Modern effects
- Fullscreen Carousel
- Tiny plugin (gzipped ~ 1.6kb, uncompressed ~ 4.8kb)
- Infinite scroll
- Multiple slideLayouts to maintain aspect ratio
- Minimal configuration, easy to install
- Useful public API for extending the functionalities
- Large browsers support ( Internet Explorer(9+), Chrome, Firefox, Safari ..)
 
## Live Demo
    [Click here](http://vinayakjadhav.github.io/jRCarousel/) for live demo.

## Installation

	<!-- add jQuery if not already present in your project -->
``` javascript
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
```
	<!-- add jRCarousel plugin -->
``` javascript
<script src="https://cdn.rawgit.com/vinayakjadhav/jRCarousel/master/dist/jRCarousel.min.js"></script>
```

##### Setup images source
```
var slides = [
	{src: 'http://lorempixel.com//1366/768'},
	{src: 'http://lorempixel.com//1366/761'},
	{src: 'http://lorempixel.com//1366/762'},
	{src: 'http://lorempixel.com//1366/763'},
	{src: 'http://lorempixel.com//1366/764'},
	{src: 'http://lorempixel.com//1366/765'},
	{src: 'http://lorempixel.com//1366/766'}
];
```

##### Minimal configuration with defaults
```
$('.jRCarouselGallery').jRCarousel({
					slides: slides
				});
```

##### Configuring all available options
```
$('.jRCarouselGallery').jRCarousel({
 	width: 800, 				/* largest allowed width */
	height: 356, 				/* largest allowed height */
	slides: slides, 			/* array of images source or gets slides by 'slide' class */
	slideLayout : 'contain',  	/* "contain"-fit as per to aspect ratio | "fill"-stretches to fill |  "cover"-overflows but maintains ratio */
	animation: 'scroll', 		/* slide | scroll | fade | zoomInSlide | zoomInScroll */
	animationSpeed: 400,    	/* animation speed in milliseconds */
	animationInterval: 4000,	/* Interval between transitions or per slide show time in milliseconds */
	autoplay: true,         	/* start playing Carousel continuously, pauses when slide is hovered */
	onSlideShow: show,			/* callback when Slide show event occurs */
	navigation: 'circles'		/* circles | squares */
});
```
##### Images source provided in javascript
```
<div class="jRCarouselGallery"></div>
```

##### Images source provided in template by adding class `slide`
```
<div class="jRCarouselGallery">
  <img class="slide" src="http://lorempixel.com//800/351" />
  <img class="slide" src="http://lorempixel.com//800/352" />
  <img class="slide" src="http://lorempixel.com//800/353" />
  <img class="slide" src="http://lorempixel.com//800/354" />
  <img class="slide" src="http://lorempixel.com//800/355" />
</div>
```
## jRCarousel Example
![jRCarousel](https://cloud.githubusercontent.com/assets/7734229/10716647/cf343360-7b65-11e5-9e36-15dc866456a3.png)

## Public API
- ##### showSlide(slideIndex) 	:
		shows the slide specified by the slideIndex by running animation, the slideIndex starts from 0.

- ##### showPreviousSlide()		:
		shows the previous slide from current slide by running animation

- ##### showNextSlide()		:
		shows the slide specified by the slideIndex by running animation

- ##### getSlideByIndex(slideIndex)	:
		returns the slide's jquery object specified by the slideIndex

- ##### getCurrentSlide()		:
		returns the current slide's jquery object

- ###### Usage
```
var myJRCarousel = $('.jRCarouselGallery').jRCarousel({
				slides: slides
});

myJRCarousel.showSlide(0);
myJRCarousel.showPreviousSlide();
myJRCarousel.howNextSlide();
var slide = myJRCarousel.getSlideByIndex(1);
var currentSlide = myJRCarousel.getCurrentSlide();
```
------------------------------------------------------------------------------------------------------------------
