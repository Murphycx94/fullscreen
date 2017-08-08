# fullscreen
## fullscreen插件：一款基于Jquery超小的制作全屏网站插件，支持手机端触摸滑动。  
  使用方法：
```css
body{
	padding: 0;
	margin: 0;
	overflow: hidden;
}
```
```javascript
<script src="js/jquery-1.11.3.min.js" type="text/javascript" charset="UTF-8"></script>
<script src="js/fullscreen.js" type="text/javascript" charset="UTF-8"></script>
```
```html
<div id="fullscreen">
	<div>第一页</div>
	<div>第二页</div>
	<div>第三页</div>
	<div>第四页</div>
</div>
```
```javascript
<script>
	$("#fullscreen").fullscreen();
</script>
```
