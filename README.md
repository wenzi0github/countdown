# countdown
这是一个javascript的倒计时插件，能够实现一个简单的倒计时功能，同时还监听了滚动事件，当倒计时处于文档的下面时，倒计时不会启动，减少页面资源的浪费。

这个插件是基于jQuery的，因此在引入这个插件之前，必须先引入jQuery库文件。

这个插件使用起来非常的简单，我们通过一个例子来看看倒计时的使用方法：
```html
<div id="timer" diff="30"></div>
```
```javascript
var counter = new TimeCounter($('#timer'),{
   	format: 'MM:SS.TT', // 倒计时的样式，可自己定义
   	dtime: 100,
   	onStart: function(){
       	this.$target.html(this.html);
   	},
   	onEnd: function(){
       	this.$target.siblings().html("");
       	this.$target.html("已结束");
   	}
});
```
首先是要定义一个显示倒计时的DOM元素，这里的diff属性**非常重要**，插件里是根据这个值来计算出倒计时的，因此必须存在且赋值，这个数值的单位是秒(s)，然后插件里计算出时、分、秒、毫秒等数据。  
我们看上面javascript部分的构造器，在构造器TimeCounter()里传递了两个参数$obj和options两个参数:$obj是要参与倒计时的jQuery对象，而options是我们定义的一些变量，为了实现我们自己想要的效果，我们会传入一些我们特有的值来定义我们的倒计时。

这里再介绍一个很重要的方法**stop()**，当我们的倒计时new出来以后倒计时就开始了，可是如果我想在结束之前就要手动结束呢？这里提供了一个stop()方法来供我们调用，用new出来的对象counter调用即可：
```javascript
counter.stop(); // 停止倒计时
```
