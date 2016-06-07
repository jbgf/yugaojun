+function($){
	"use strict";
	var Tile = function(element,options){
		this.$element = $(element);
		this.options  = options;
		this.state;
		this.frames = this.$element.children('.windowsTile-content')
		this.currentIndex = 0;
		this.interval = 0;
		this.size = {
			'width':this.$element.width(),
			'height':this.$element.height()
		};
		if (this.options.direction == undefined){this.options.direction == Tile.DEFAULTS.direction;}
		if (this.options.period == undefined){this.options.period == Tile.DEFAULTS.period}
		if (this.options.duration == undefined){this.options.duration == Tile.DEFAULTS.duration};
		if (this.options.easing == undefined){this.options.easing == Tile.DEFAULTS.easing;}
//easing插件
		$.easing.doubleSqrt = function (t){return Math.sqrt(Math.sqrt(t));}

	};

	Tile.DEFAULTS = {
		direction:'slidLeft',
		period:3000,
		duration:700,
		easing:'doubleSqrt'
	};
	//启动执行动画；
	Tile.prototype.start = function (){
		var that = this;
		that.state = "move";
		this.interval = setInterval(function(){
			that.animate();
		},that.options.period)
	}
	//暂停动画；
	Tile.prototype.pause = function (){
		var that = this;
		that.state = "pause";
		clearInterval(that.interval)

	}
	//动画处理入口，再分别调用各自方向的动画处理效果；
	Tile.prototype.animate =function(){
		var that = this;
		var currentFrame = this.frames[this.currentIndex],nextFrame;
		this.currentIndex +=1;
		//如果索引>=长度，即遍历完毕；
		if (this.currentIndex >= this.frames.length) this.currentIndex = 0;
		nextFrame = this.frames[this.currentIndex];
	
	 	switch (this.options.direction) {
	 		case 'slidLeft' :this.slideLeft(currentFrame,nextFrame);break;
	 		case 'slideRight':this.slideRight(currentFrame,nextFrame);break;
	 		case 'slideDown' :this.slideDown(currentFrame,nextFrame);break;
	 		case 'slideUpDown':this.slideUpDown(currentFrame,nextFrame);break;
	 		case 'slideLeftRight':this.slideLeftRight(currentFrame,nextFrame);break;
	 		default:this.slideUp(currentFrame,nextFrame);

	 	};
	 	
	 	//that.$element.find('.label').text(that.currentIndex)''
	}
	 	Tile.prototype.slideLeftRight = function(currentFrame,nextFrame){
	 		if (this.currentIndex % 2 ==1) //奇偶数决定滚动方向；
	 			this.slideLeft(currentFrame,nextFrame);
	 		else
	 			this.slideRight(currentFrame,nextFrame);
	 	}

	 	Tile.prototype.slideUpDown = function (currentFrame,nextFrame){
	 		if (this.currentIndex % 2 ==1)
	 			this.slideUp(currentFrame,nextFrame);
	 		else
	 			this.slideDown(currentFrame,nextFrame);
	 	}
	 	//一直向下滚动效果；
	 	Tile.prototype.slideUp = function(currentFrame,nextFrame){
	 		var move =this.size.height;
	 		var options ={
	 			'duration':this.options.duration,
	 			'easing':this.options.easing
	 		};
	 		$(currentFrame).animate({top:move}, options);
	 		//下一帧移动到位，显示，应用动画；
	 		$(nextFrame)
	 				.css({top:-move})
	 				.show()
	 				.animate({top:0},options);
	 	}
	 	//一直向左滚动效果；
	 	Tile.prototype.slideLeft = function (currentFrame,nextFrame){
	 		var move = this.size.width;
	 		var options = {
	 			'duration':this.options.duration,
	 			'easing':this.options.easing
	 		};
	 		$(currentFrame).animate({left:-move}, options);
	 		$(nextFrame)
	 				.css({left:move})
	 				.show()
	 				.animate({left:0},options)
	 	}
	 	//一直向右滚动效果
	 	Tile.prototype.slideRight = function (currentFrame,nextFrame){
	 		var move =this.size.width;
	 		var options = {
	 			'duration':this.options.duration,
	 			'easing':this.options.easing
	 		};
	 		$(currentFrame).animate({left:move},options);
	 		$(nextFrame)
	 				.css({left:-move})
	 				.show()
	 				.animate({left:0},options)
	 	}

var old = $.fn.tile;

$.fn.tile =function(option){
	return this.each(function() {
		var $this = $(this)
		var data = $this.data('bs.tile')

		var options = $.extend({},Tile.DEFAULTS,$this.data(),
			typeof option=='object' && option)

		if(!data) $this.data('bs.tile',(data = new Tile(this,options)))

		option === 'pause'? data.pause():data.start();
		if(this.state == "move"){
			$this.hover(function() {
				data.pause()
			}, function() {
				data.start()
			});
		};
	/*	*/

	})
}
$.fn.tile.Constructor = Tile;
$.fn.tile.noConflict = function (){
	$.fn.tile = old;
	return this
}

//绑定触发事件；
/*$(window).on('load',function(){
	$('[data-toggle="tile"]').each(function(){
		$(this).tile();
		console.log('test')
	})
})*/
}(window.jQuery)


