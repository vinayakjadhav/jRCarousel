/**
 * Author: Vinayak Rangnathrao Jadhav
 * Version: 0.1
 */
(function($){
	
	$.fn.jRCarousel = function(options){
		var _defaults = {
				width : 320,
				height: 142,
				slides : [],
				slideLayout : 'contain',
				animation: 'slide',
				animationDuration: 1200,
				animationInterval: 1000,
				autoplay: true
		}
		var _settings = $.extend( true, {}, _defaults, options );
		var _container = this;
		var _width = _settings.width;
		var _height = _settings.height;
		var _aspectRatio = _settings.width/_settings.height;
		var _wrapper = $( "<div class='jRCarousel' />" ).css({display:'block', position: 'relative', overflow: 'hidden', width: '100%', height: '100%'}).appendTo(_container.empty());
		var _totalSlides = _settings.slides.length;
		var _currentSlide;
		var _animations = new Animations();
		var _previousButton;
		var _nextButton;
		var _timer;
		
		//a = _wrapper;
		(function setup(){
			/* set initial size */
			_container.css({width: _width+'px', height: _height+'px' });
			
			/* create jRCarousel stack, and keep first slide at top of stack */
			for(var i = 1;  i < _totalSlides; i++){
				var img = $( "<img class='slide' />" )
						.css({position: 'absolute', left: 0, top:0, width:'100%', height:'100%', objectFit:_settings.slideLayout, backgroundColor:'#fff'})
						.prop({src:_settings.slides[i], alt:"'"+_settings.slides[i]+"'"});
				_wrapper.append(img)
			}
			_currentSlide = $( "<img class='slide' />" )
				.css({position: 'absolute', left: 0, top:0, width:'100%', height:'100%', objectFit:_settings.slideLayout, backgroundColor:'#fff'})
				.prop({src:_settings.slides[0], alt:"'"+_settings.slides[0]+"'"});
			_wrapper.append(_currentSlide)
			
			/* create control buttons */
			_previousButton = $( "<div class='previous' style='left: 8px;transform: rotate(-45deg);'></div>");
			_nextButton = $( "<div class='next' style='right: 8px;transform: rotate(135deg);'></div>");
			_wrapper.append(_previousButton, _nextButton)
			_previousButton.add(_nextButton).css({position: 'absolute', top:'40%', zIndex:1, display: 'inline-block', padding: '18px', boxShadow: '8px 8px 0 2px #777 inset', cursor:'pointer'})
			
			/* start carousel if autoplay */
			if(_settings.autoplay){
				_timer = setInterval(function(){
					 		console.log('polling '+_timer +': '+ new Date().toTimeString())
					 		_showNextSlide()
					},_settings.animationInterval+_settings.animationDuration)
				_previousButton.add(_nextButton).hide()
			}
			
			/* adjust size according to device */
			addEventListener('resize', _makeResposive);
			_makeResposive()
			
		})()
		
		_previousButton.on('click', function(){
			_showPreviousSlide();
		});
		_nextButton.on('click', function(){
			_showNextSlide();
		});
		
		_wrapper.hover(function(){
			clearInterval(_timer);
			_previousButton.add(_nextButton).fadeIn();
		},function(){
			_previousButton.add(_nextButton).fadeOut();
			_timer = setInterval(function(){
						_showNextSlide();
					},_settings.animationInterval+_settings.animationDuration)
		});
		
		function Animations(){
			this.animations = {
					slide : _slide,
					scroll: _scroll,
					fade: _fade,
					zoomInSlide: _zoomInSlide,
					zoomInScroll: _zoomInScroll
				}
		}
		Animations.prototype.run = function run(animation, direction){
				this.animations[animation](direction);
		}
		
		function _getCurrentSlide(slideNumber){
			return _getSlide(slideNumber);
		}
		function _setCurrentSlide(slide){
			_currentSlide = slide;
		}
		function _getSlide(slideNumber){
			_setCurrentSlide(_wrapper.find('.slide').eq((slideNumber-1)%_totalSlides))
			return _currentSlide;
		}
		function _showPreviousSlide(){
			_getCurrentSlide(0)
			_animations.run(_settings.animation, 0);
		}
		function _showNextSlide(){
			/* get next slide to appear on top of stack */
			_wrapper.append(_getCurrentSlide(1).detach())
			_animations.run(_settings.animation, 1);
		}
		
		function _slide(slideNumber){
			if(slideNumber==1){
				_currentSlide.css({
					left:_width+'px'
				})
				.animate({
					left: 0
				},
				{
					duration: _settings.animationDuration,
					complete: function(){
						
					}
				})
			}else{
				_currentSlide.css({left:0}).stop()
				.animate({
					left: _width+'px'
				},
				{
					duration: _settings.animationDuration,
					complete: function(){
						_wrapper.prepend(_currentSlide.css({left:0}).detach())	
					}
				})
			}
		}
		
		function _scroll(slideNumber){
			if(slideNumber==1){
				_currentSlide.css({
					top: _height+'px'
				})
				.animate({
					top: 0
				},
				{
					duration: _settings.animationDuration,
					complete: function(){
						
					}
				})
				
			}else{
				_currentSlide.stop()
				.animate({
					top: _height+'px'
				},
				{
					duration: _settings.animationDuration,
					complete: function(){
						_wrapper.prepend(_currentSlide.css({top:0}).detach())	
					}
				})
			}
		}
		
		function _fade(slideNumber){
			if(slideNumber==1){
				_currentSlide.css({
					opacity: 0
				})
				.animate({
					opacity: 1
				},
				{
					duration: _settings.animationDuration,
					complete: function(){
						
					}
				})
			}else{
				_currentSlide.stop()
				.animate({
					opacity: 0
				},
				{
					duration: _settings.animationDuration,
					complete: function(){
						_wrapper.prepend(_currentSlide.css({opacity: 1}).detach())	
					}
				})
			}
		}
		
		function _zoomInScroll(slideNumber){
			if(slideNumber==1){
				_currentSlide.css({
					height: 0
				})
				.animate({
					height: '100%'
				},
				{
				duration: _settings.animationDuration,
				complete: function(){
					
				}
			})
			}else{
				_currentSlide.stop()
				.animate({
					height: 0
				},
				{
					duration: _settings.animationDuration,
					complete: function(){
						_wrapper.prepend(_currentSlide.css({height:'100%'}).detach())	
					}
				})
			}
		}
		
		function _zoomInSlide(slideNumber){
			if(slideNumber==1){
				_currentSlide.css({
					width: 0,
					left: _width+'px'
				})
				.animate({
					width: '100%',
					left:0
				},
				{
				duration: _settings.animationDuration,
				complete: function(){
					
				}
			})
			}else{
				_currentSlide.stop()
				.animate({
					width: 0
				},
				{
					duration: _settings.animationDuration,
					complete: function(){
						_wrapper.prepend(_currentSlide.css({width:'100%'}).detach())	
					}
				})
			}		
		}
		
		function _makeResposive(){
			_container.width('100%')
			_width = _container.width() < _settings.width ? _container.width() : _settings.width;
			_height = _width/_aspectRatio;
			_container.css({width: _width+'px', height: _height+'px' })
		}	
		
		return this;
	}
	
})(jQuery);
