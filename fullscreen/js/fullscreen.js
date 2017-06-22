/*
 * 	fullscreen 1.0
 * 	author:cx(shmilyclxy@163.com)
 * 	2017-02-22 11:30:09
 */

(function($) {
	$.fn.fullscreen = function() {
		const $parent = this
		const $children = this.children()
		const fullScreen = {
			h: 0,
			size: 0,
			index: 0,
			time: 700,
			parent: $parent,
			children: $children,
			init () {
				this.size = this.children.size()
				this.h = $(window).height()
				this.setHight()
				this.listenWindow()
				this.checkScroll()
				this.checkTouch()
			},
			setHight () { //设置窗口大小
				this.parent.css({
					width: "100%",
					overflow: "hidden",
					transition: `all ${this.time}ms ease`,
					boxSizing: "border-box",
					transform: `translateY(-${this.index * this.h}px)`
				})
				this.children.height(this.h).css({
					width: "100%",
					overflow: "hidden",
					boxSizing: "border-box"
				}).addClass("section")
			},
			listenWindow () { //监听窗口变化
				$(window).resize(() => {
					this.h = $(window).height()
					this.setHight()
				})
			},
			checkScroll () { //监听滚轮
				let couldRun = true
				const scrollFunc = (e) => {
					if (couldRun) {
						couldRun = false
						e = e || window.event
						if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件
							if (e.wheelDelta > 0 && this.index > 0) this.index-- //当滑轮向上滚动时
							if (e.wheelDelta < 0 && this.index < this.size - 1) this.index++ //当滑轮向下滚动时
						}
						if (e.detail) { //Firefox滑轮事件
							if (e.detail < 0 && this.index > 0) this.index-- //当滑轮向上滚动时
							if (e.detail > 0 && this.index < this.size - 1) this.index++ //当滑轮向下滚动时
						}
						this.parent.css({ transform: `translateY(-${this.index * this.h}px)` })
						setTimeout(() => couldRun = true, this.time)
					}
				}
				if (document.addEventListener) document.addEventListener('DOMMouseScroll', scrollFunc, false); //firefox
				//滚动滑轮触发scrollFunc方法  //ie 谷歌
				window.onmousewheel = document.onmousewheel = scrollFunc
			},
			checkTouch () {
				let startX = startY = 0
				let endX = endY = 0
				const touchStartFunc = (e) => {
					if (e.cancelable && !e.defaultPrevented) e.preventDefault()
					let touch = e.targetTouches[0] //获取第一个触点
					startX = Number(touch.pageX) //页面触点X坐标
					startY = Number(touch.pageY) //页面触点Y坐标
				}
				//touchend事件
				const touchEndFunc = (e) => {
					if (e.cancelable && !e.defaultPrevented) e.preventDefault()
					let touch = e.changedTouches[0] //获取第一个触点
					endX = touch.pageX //页面触点X坐标
					endY = Number(touch.pageY) //页面触点Y坐标
					if (startY - endY > 50 && this.index < this.size - 1) this.index++ //向下翻页
					if (startY - endY < -50 && this.index > 0) this.index-- 						//向上翻页
					this.parent.css({ transform: `translateY(-${this.index * this.h}px)` })
				}
				document.addEventListener("touchstart", touchStartFunc, false)
				document.addEventListener("touchend", touchEndFunc, false)
			}
		}
		fullScreen.init();
	};
})(jQuery);
