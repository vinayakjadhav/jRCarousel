/**
 * Author: Vinayak Rangnathrao Jadhav
 * Project: jRCarousel
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
				animationSpeed: 400,
				animationInterval: 1000,
				autoplay: true,
				controls: true,
				navigation: 'circles',
				onSlideShow: function(){}
		}
		var _settings = $.extend( true, {}, _defaults, options );
		var _container = this;
		var _width = _settings.width;
		var _height = _settings.height;
		var _aspectRatio = _settings.width/_settings.height;
		var _wrapper = $( "<div class='jRCarousel' />" ).css({ display:'block', position: 'relative', overflow: 'hidden', width: '100%', height: '100%' })
														.appendTo(_container.empty());
		var _totalSlides = _settings.slides.length;
		var _currentSlide;
		var _targetSlideIndex;
		var _animations = new Animations();
		var _previousButton;
		var _nextButton;
		var _navButtons;
		var _timer;
		
		(function setup(){
			/* set initial container size */
			//_container.css({width: _width+'px', height: _height+'px' });
			
			/* create jRCarousel stack, and keep first slide at top of stack */
			for(var i = 0;  i < _totalSlides; i++){
				var slide = $( "<img class='slide' data-index="+i+" />" )
						.css({position: 'absolute', left: 0, top:0, width:'100%', height:'100%', objectFit:_settings.slideLayout, backgroundColor:'#fff'})
						.prop({src:_settings.slides[i], alt:"'"+_settings.slides[i]+"'"});
				_wrapper.append(slide);
			}
			_currentSlide = _wrapper.find('.slide').first().detach();
			_wrapper.append(_currentSlide);
			
			if(_settings.navigation){
				/* create navigation bar */
				var _navigation = $('<div class=navWrapper />').css({ textAlign: 'right' });
				for(var i = 0;  i < _totalSlides; i++){
					_navigation.append('<div class=nav></div>');
				}
				_navigation.find('.nav').css({ display: 'inline-block', margin: '5px', cursor: 'pointer', borderRadius: '12px', backgroundColor: '#777', width: '12px', height: '12px' }).first().css({border: '2px dashed #ccc'});
				_wrapper.after(_navigation);
				
				 /* event handler */
				_container.on('click', '.nav', function(){
					_startCarousel(_getSlideByIndex($(this).index()));
				})
			}
			
			if(_settings.controls){
				/* create control buttons */
				_previousButton = $( "<div class='previous' style='left: 9px;transform: rotate(-45deg);'></div>");
				_nextButton = $( "<div class='next' style='right: 9px;transform: rotate(135deg);'></div>");
				_navButtons = _previousButton.add(_nextButton)
								.css({position: 'absolute', top:'42%', zIndex:1, display: 'inline-block', padding: '18px', boxShadow: '7px 7px 0 1px #777 inset', cursor:'pointer',opacity:'0.7'});
				_wrapper.append(_previousButton, _nextButton);
				
				 /* event handlers */
				_previousButton.on('click', function(){
					_navButtons.hide();
					_startCarousel(_getPreviousSlide());
					_navButtons.fadeIn();
				});
				_nextButton.on('click', function(){
					_navButtons.hide();
					_startCarousel(_getNextSlide());
					_navButtons.fadeIn();
				});
			}
			
			/* start jRCarousel if autoplay */
			if(_settings.autoplay){
				_timer = setInterval(_startCarousel, _settings.animationInterval+_settings.animationSpeed);
				_navButtons.hide();
				
				/* event handlers */	
				_container.hover(function(){
					clearInterval(_timer);
					_navButtons.fadeIn();
				},function(){
					_navButtons.fadeOut();
					_timer = setInterval(_startCarousel, _settings.animationInterval+_settings.animationSpeed);
				});
			}
			
			/* adjust size according to device */
			addEventListener('resize', _makeResposive);
			_makeResposive();
			
		})();
		
		function _getPreviousSlide(){
			return _wrapper.find('.slide').eq(-2);
		}
		function _getCurrentSlide(){
			return _wrapper.find('.slide').last();
		}
		function _getNextSlide(){
			return _wrapper.find('.slide').first();
		}
		function _getSlideByIndex(idx){
			return _wrapper.find('.slide[data-index='+idx+']');
		}
		
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
		
		function _startCarousel(slide){
			slide = slide || _getNextSlide();
			_targetSlideIndex = slide.data('index');
			var currentSlideIndex = _getCurrentSlide().data('index');
			
			if(currentSlideIndex == _targetSlideIndex){
				return -1;
			}
			if(currentSlideIndex < _targetSlideIndex){
				/* get next slide & make it to appear on top of stack to run animation*/
				while(_getNextSlide().data('index') != _targetSlideIndex){
					_currentSlide = _getNextSlide().hide().detach().appendTo(_wrapper);
				}
				_currentSlide = _getNextSlide().detach().appendTo(_wrapper);
				_animations.run(_settings.animation, 1);
			}else{
				/* get previous slide, run animation & make target slide to appear on top of stack after animation */
				_currentSlide = _getCurrentSlide();
				_wrapper.find('.slide').not([_currentSlide[0],_getSlideByIndex(_targetSlideIndex)[0]]).hide();
				_animations.run(_settings.animation, -1);
			}
			_container.find('.nav').css({border:'none'});
			_container.find('.nav').eq(_targetSlideIndex).css({border: '2px dashed #ccc'});	
		}
		
		function onAnimationComplete(direction){
			/* make target slide to appear on top of stack after animation */
			if(direction != 1){
				while(_getCurrentSlide().data('index') != _targetSlideIndex){
					_currentSlide = _getCurrentSlide().detach().prependTo(_wrapper);
				}
				_currentSlide = _getCurrentSlide();
			}
			_wrapper.find('.slide').show();
//			_navButtons.show();
			_settings.onSlideShow.call(this, _currentSlide);
		}
		
		/* direction is 1 = next & -1 = previous */
		function _slide(direction){
			if(direction == 1){
				_currentSlide.css({ left:_width+'px' })
				.animate({
					left: 0
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){	
						onAnimationComplete(direction);
					}
				})
			}else{
				_currentSlide
				.animate({
					left: _width+'px'
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_currentSlide.css({ left: 0 });
						onAnimationComplete(direction);						
					}
				})
			}
		}
		
		function _scroll(direction){
			if(direction == 1){
				_currentSlide.css({	top: _height+'px' })
				.animate({
					top: 0
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						onAnimationComplete(direction);
					}
				})
				
			}else{
				_currentSlide
				.animate({
					top: _height+'px'
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_currentSlide.css({ top: 0 });
						onAnimationComplete(direction);
					}
				})
			}
		}
		
		function _fade(direction){
			if(direction==1){
				_currentSlide.css({	opacity: 0 })
				.animate({
					opacity: 1
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						onAnimationComplete(direction);
					}
				})
			}else{
				_currentSlide
				.animate({
					opacity: 0
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_currentSlide.css({ opacity: 1 });
						onAnimationComplete(direction);
					}
				})
			}
		}
		
		function _zoomInScroll(direction){
			if(direction==1){
				_currentSlide.css({	height: 0 })
				.animate({
					height: '100%'
				},
				{
				duration: _settings.animationSpeed,
				complete: function(){
					onAnimationComplete(direction);
				}
			})
			}else{
				_currentSlide
				.animate({
					height: 0
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_currentSlide.css({ height:'100%' });
						onAnimationComplete(direction);
					}
				})
			}
		}
		
		function _zoomInSlide(direction){
			if(direction==1){
				_currentSlide.css({
					width: 0,
					left: _width+'px'
				})
				.animate({
					width: '100%',
					left:0
				},
				{
				duration: _settings.animationSpeed,
				complete: function(){
					onAnimationComplete(direction);
				}
			})
			}else{
				_currentSlide.stop()
				.animate({
					width: 0
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_currentSlide.css({ width:'100%' });
						onAnimationComplete(direction);
					}
				})
			}		
		}
		
		function _makeResposive(){
			_container.width('100%');
			_width = _container.width() < _settings.width ? _container.width() : _settings.width;
			_height = _width/_aspectRatio;
			_container.css({width: _width+'px', height: _height+'px' });
		}	
		
		return this;
	}
	
})(jQuery);
