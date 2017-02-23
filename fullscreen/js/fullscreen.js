/*
 * 	fullscreen 1.0
 * 	author:cx(shmilyclxy@163.com)
 * 	2017-02-22 11:30:09
 */

(function($) {
	$.fn.fullscreen = function() {		
		var $parent = this;
		var $children=this.children();
		var fullScreen = {
			h: 0,
			size: 0,
			index: 0,
			time: 700,
			parent: $parent,
			children:$children,
			init: function() {
				this.size = this.children.size();
				this.h = $(window).height();
				this.setHight();
				this.listenWindow();
				this.checkScroll();
				this.checkTouch();
			},
			setHight: function() { //设置窗口大小
				this.parent.css({ width: "100%", overflow: "hidden", transition: "all " + this.time + "ms ease" });
				this.children.height(this.h).css({ width: "100%", overflow: "hidden" }).addClass("section");
				this.parent.css({ transform: "translateY(-" + this.index * this.h + "px)" });
			},
			listenWindow: function() { //监听窗口变化
				$(window).resize(() => {
					this.h = $(window).height();
					this.setHight();					
				})
			},
			checkScroll: function() {//监听滚轮
				var couldRun = true;
				var scrollFunc = function(e) {
					if(couldRun) {
						couldRun = false;
						e = e || window.event;
						if(e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件               
							if(e.wheelDelta > 0) { //当滑轮向上滚动时  
								if(this.index > 0) {
									this.index--;
									this.parent.css({ transform: "translateY(-" + this.index * this.h + "px)" })
								}
							}
							if(e.wheelDelta < 0) { //当滑轮向下滚动时  
								if(this.index < this.size - 1) {
									this.index++;
									this.parent.css({ transform: "translateY(-" + this.index * this.h + "px)" })
								}
							}
						} else if(e.detail) { //Firefox滑轮事件  
							if(e.detail < 0) { //当滑轮向上滚动时  
								if(this.index > 0) {
									this.index--;
									this.parent.css({ transform: "translateY(-" + this.index * this.h + "px)" })
								}
							}
							if(e.detail > 0) { //当滑轮向下滚动时  
								if(this.index < this.size - 1) {
									this.index++;
									this.parent.css({ transform: "translateY(-" + this.index * this.h + "px)" })
								}
							}
						}
						setTimeout(function() {
							couldRun = true;
						}, this.time);
					}
				}.bind(this);
				if(document.addEventListener) { //firefox  
					document.addEventListener('DOMMouseScroll', scrollFunc, false);
				}
				//滚动滑轮触发scrollFunc方法  //ie 谷歌  
				window.onmousewheel = document.onmousewheel = scrollFunc;
			},
			checkTouch: function() {
				var startX = startY = 0;
				var endX = endY = 0;
				//touchstart
				function touchStartFunc(e) {
					e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  
					var touch = e.targetTouches[0]; //获取第一个触点  
					var x = Number(touch.pageX); //页面触点X坐标  
					var y = Number(touch.pageY); //页面触点Y坐标  
					startX = x;
					startY = y;
				}
				//touchend事件 
				function touchEndFunc(e) {
					e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  
					var touch = e.changedTouches[0]; //获取第一个触点  
					var x = touch.pageX; //页面触点X坐标	  
					var y = Number(touch.pageY); //页面触点Y坐标  
					endX = x;
					endY = y;
					if(startY - endY > 50) { //向下翻页
						if(this.index < this.size - 1) {
							this.index++;
							this.parent.css({ transform: "translateY(-" + this.index * this.h + "px)" })
						}
					} else if(startY - endY < -50) { //向上翻页
						if(this.index > 0) {
							this.index--;
							this.parent.css({ transform: "translateY(-" + this.index * this.h + "px)" })
						}
					}
				}
				document.addEventListener("touchstart", touchStartFunc.bind(this), false);
				document.addEventListener("touchend", touchEndFunc.bind(this), false);
			}
		}
		fullScreen.init();
	};
})(jQuery);