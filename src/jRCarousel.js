/**
 * Author: Vinayak Rangnathrao Jadhav
 * Version: 0.1
 */
(function($){
	
	$.fn.jRCarousel = function(options){
		var defaults = {
				width : 400,
				height: 178,
				images : [],
				transition: 'slide',
				transitionDuration: 2000,
				transitionInterval: 1000
		}
		var settings = $.extend( true, {}, defaults, options );
		
		var wrapper = $( "<div class='jRCarousel' style='position: relative;overflow:hidden; height:"+settings.height+"px' />" ).appendTo(this);
	 
		// create image carousel
		for(i in settings.images){
			wrapper.append( "<img style='position: absolute; left: 0; width:"+settings.width+"px;' src='"+settings.images[i]+"' alt="+settings.images[i]+" />" );
		}
		var slides = settings.images.length;
		function transitions(){
			return{
				slide : slide,
				scroll: scroll
			}
		}
		
		function slide(){
			var currentSlide = getNextSlide().css({
				left:''+settings.width+'px'
				})
				.animate({
					left:'0'
				},
				{
					duration: settings.transitionDuration,
					complete: function(){
						setTimeout(transitions()[settings.transition],settings.transitionInterval)
						}
				}).detach()
				
				wrapper.append(currentSlide)	
		}
		
		function scroll(){
			var currentSlide = getNextSlide().css({
				top:'-'+settings.height+'px'
				})
				.animate({
					top:'0'
				},
				{
					duration: settings.transitionDuration,
					complete: function(){
						setTimeout(transitions()[settings.transition],settings.transitionInterval)
						}
				}).detach()
				
				wrapper.append(currentSlide)	
		}
		

		transitions()[settings.transition]();
		
		var currentSlide;
		function getCurrentSlide(){
			return wrapper.find('img').first();
		}
		function setCurrentSlide(slideNumber){
			currentSlide = slideNumber;
		}
		function setNextSlide(){
			currentSlide = (currentSlide+1)%slides;
		}
		function getNextSlide(){
			setNextSlide();
			return getCurrentSlide();
		}
		
		return this;
	}
	
	
	
})(jQuery);
