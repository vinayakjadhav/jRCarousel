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
				animationSpeed: 400,
				animationInterval: 1000,
				autoplay: true,
				onSlideShow: function(){}
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
		var _navigations ='';
		var _timer;
		
		//a = _wrapper;
		(function setup(){
			/* set initial size */
			_container.css({width: _width+'px', height: _height+'px' });
			
			/* create jRCarousel stack, and keep first slide at top of stack */
			for(var i = 0;  i < _totalSlides; i++){
				var slide = $( "<img class='slide' data-index="+i+" />" )
						.css({position: 'absolute', left: 0, top:0, width:'100%', height:'100%', objectFit:_settings.slideLayout, backgroundColor:'#fff'})
						.prop({src:_settings.slides[i], alt:"'"+_settings.slides[i]+"'"});
				_wrapper.append(slide)
				_navigations += '<div class=nav></div>'
			}
			_currentSlide = _wrapper.find('.slide').first().detach();
			_wrapper.append(_currentSlide);
			
			_wrapper.append($('<div class=navWrapper />').css({
				position: 'absolute',
			zIndex: 1,
		    bottom: 0,
		    textAlign: 'center',
		    width: '100%'})
		    .append($(_navigations).css({
			display: 'inline-block',
		    margin: '5px',
		    cursor: 'pointer',
		    borderRadius: '12px',
		    backgroundColor: '#777',
		    opacity: '0.7',
		    width: '12px',
		    height: '12px'})));
			
			/* create control buttons */
			_previousButton = $( "<div class='previous' style='left: 9px;transform: rotate(-45deg);'></div>");
			_nextButton = $( "<div class='next' style='right: 9px;transform: rotate(135deg);'></div>");
			_previousButton.add(_nextButton).css({position: 'absolute', top:'42%', zIndex:1, display: 'inline-block', padding: '18px', boxShadow: '7px 7px 0 1px #777 inset', cursor:'pointer',opacity:'0.7'})
			_wrapper.append(_previousButton, _nextButton);
			
			/* start carousel if autoplay */
			if(!_settings.autoplay){
				_timer = setInterval(_startAnimation, _settings.animationInterval+_settings.animationSpeed)
				_previousButton.add(_nextButton).hide()
			}
			
			/* adjust size according to device */
			addEventListener('resize', _makeResposive);
			_makeResposive()
			
		})()
		
		_previousButton.on('click', function(){
			_previousButton.add(_nextButton).hide();
			_startAnimation(_getPreviousSlide().data('index'));
		});
		_nextButton.on('click', function(){
			_previousButton.add(_nextButton).hide();
			_startAnimation(_getNextSlide().data('index'));
		});
		
		_wrapper.hover(function(){
			clearInterval(_timer);
			_previousButton.add(_nextButton).fadeIn();
		},function(){
			_previousButton.add(_nextButton).fadeOut();
			_timer = setInterval(_startAnimation, _settings.animationInterval+_settings.animationSpeed)
		});
		
		_wrapper.on('click', '.nav', function(){
			_startAnimation($(this).index());
		})
		
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
		
		function _startAnimation(targetSlideIndex){
			if(_getCurrentSlide().data('index')==targetSlideIndex){return};
			
			if(_getCurrentSlide().data('index')<targetSlideIndex){
				/* get next slide & make it to appear on top of stack */
				while(_getNextSlide().data('index')!=targetSlideIndex){
					_currentSlide = _getNextSlide().hide().detach().appendTo(_wrapper);
				}
				_currentSlide = _getNextSlide().detach().appendTo(_wrapper)
				_animations.run(_settings.animation, 1);
			}else{
					/* get next slide & make it to appear on top of stack */
				_currentSlide = _getCurrentSlide()
				_wrapper.find('.slide').not(_currentSlide).hide()
				b = _wrapper.find('.slide[data-index='+targetSlideIndex+']').show()
				_animations.run(_settings.animation, -1);
			}
			_wrapper.find('.nav').css({border:'none'});
			_wrapper.find('.nav').eq(targetSlideIndex).css({border: '2px solid #ccc'})			
		}
		
		function _getPreviousSlide(){
			return _wrapper.find('.slide').eq(-2);
		}
		function _getCurrentSlide(){
			return _wrapper.find('.slide').last();
		}
		function _getNextSlide(){
			return _wrapper.find('.slide').first();
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
					duration: _settings.animationSpeed,
					complete: function(){	
						_settings.onSlideShow.call(this, _currentSlide);
						_wrapper.find('.slide').show()
						_previousButton.add(_nextButton).show()
					}
				})
			}else{
				_currentSlide.css({left:0})
				.animate({
					left: _width+'px'
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_currentSlide.css({left:0}).detach().prependTo(_wrapper);
						while(_getCurrentSlide().data('index')!=b.data('index')){
							_currentSlide = _getCurrentSlide().detach().prependTo(_wrapper);
						}
						_currentSlide = _getCurrentSlide();
						_settings.onSlideShow.call(this, _currentSlide);
						_wrapper.find('.slide').show()
						_previousButton.add(_nextButton).show()
						
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
					duration: _settings.animationSpeed,
					complete: function(){
						_settings.onSlideShow.call(this, _currentSlide);
					}
				})
				
			}else{
				_currentSlide.stop()
				.animate({
					top: _height+'px'
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_wrapper.prepend(_currentSlide.css({top:0}).detach());
						_settings.onSlideShow.call(this, _currentSlide);
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
					duration: _settings.animationSpeed,
					complete: function(){
						_settings.onSlideShow.call(this, _currentSlide);
					}
				})
			}else{
				_currentSlide.stop()
				.animate({
					opacity: 0
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_wrapper.prepend(_currentSlide.css({opacity: 1}).detach());
						_settings.onSlideShow.call(this, _currentSlide);
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
				duration: _settings.animationSpeed,
				complete: function(){
					_settings.onSlideShow.call(this, _currentSlide);
				}
			})
			}else{
				_currentSlide.stop()
				.animate({
					height: 0
				},
				{
					duration: _settings.animationSpeed,
					complete: function(){
						_wrapper.prepend(_currentSlide.css({height:'100%'}).detach());
						_settings.onSlideShow.call(this, _currentSlide);
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
				duration: _settings.animationSpeed,
				complete: function(){
					_settings.onSlideShow.call(this, _currentSlide);
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
						_wrapper.prepend(_currentSlide.css({width:'100%'}).detach());
						_settings.onSlideShow.call(this, _currentSlide);
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
