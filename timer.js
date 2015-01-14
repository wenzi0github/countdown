var defaults = {
    format: "<em>DD</em><em>HH</em><em>MM</em><em>SS</em>",
    dtime:1000,
    scroll:true,
    onStart: function(){},
    onEnd: function(){}
}

var TimeUtil ={
	/*
		开始
	*/
	start:function(o,arr){
		var _difs = this.getDiffs(o.selector)
		o._timer = setInterval(function(){
			if(_difs.length>0)
				TimeUtil.dealTimer(o,_difs);
			if(o.diffs && o.diffs.length>0){
				for(var i=0;i<o.diffs.length;i++){
					TimeUtil.dealTimer(o.diffs[i].option,o.diffs[i].data);
				}
			}
		}, o.dtime);
	},
	/*
		时间处理函数
	*/
	dealTimer:function(o,arr){
		var _this = {};
		for(var i =0;i<arr.length;i++){
			var dif = arr[i].diff   = arr[i].diff -o.dtime/1000;
			if(o.scroll && !TimeUtil.bindScroll(arr[i].$selector)) continue;
			_this.$target = arr[i].$selector;
			if(dif && dif > 0  ){
				_this.html = TimeUtil.getDifTime(dif,o.format);
				o.onStart.apply(_this);
			}else{
				o.onEnd.apply(_this);
				arr.splice(i,1);
				i--;
			}
		}

	},
	getDiffs:function(selectors){
		var arr=[];
		selectors.each(function(){
		if($(this).attr('diff') && $(this).attr('diff')>0)
    		arr.push({$selector:$(this),diff:$(this).attr('diff')});
		})
		return arr;
	},
	bindScroll:function(selector){
		var $window = $(window);
		var winScrlTop = $window.scrollTop();
     	var winScrlTopHeight = winScrlTop + $window.height();
   	 	var pos = selector.offset();
     	return pos.top + 30 > winScrlTop && pos.top < winScrlTopHeight;
	},

	getDifTime:function(dif,timeFormat){
        var t = {DD: '00', D: '0', HH: '00', MM: '00', SS: '00',TT:'00', H: '0', M: '0', S: '0',T:'0'},
        ld, ls, lh, lm, lms, tms,
        dif = parseInt(dif * 1000),
        ls = dif;
        if (ls > 0) {
            ld = parseInt(ls / 86400000).toString();
            t.DD = t.D = ld;
            ld.toString().length<2 &&(t.DD='0' + ld);

            ls = ls % 86400000;
            lh = parseInt(ls / 3600000).toString();
            t.HH = t.H = lh;
            lh.toString().length<2 &&(t.HH='0' + lh);


            ls = ls % 3600000;
            lm = parseInt(ls / 60000).toString();
            t.MM = t.M = lm;
            lm.toString().length<2 &&(t.MM='0' + lm);

            lms = parseInt((ls % 60000) / 100);
            ls = parseInt(lms / 10);
            t.TT = t.T = lms - ls * 10;
            t.SS = t.S= ls;
            ls.toString().length<2 &&(t.SS='0' + ls);
            return timeFormat.replace(/\b[DHMST]+\b/g, function(m){return t[m]|| 0});
        }else{
            return '';
        }
    },
}

var TimeCounter = function(selector,settings){
	var o =$.extend({},defaults, settings);
	o.selector  = selector;
	this.__o =o;
	TimeUtil.start(this.__o);
};

TimeCounter.prototype = {
	/*
		停止倒计时
	*/
	stop: function(){
		clearInterval(this.__o._timer);
	},
	/*
		添加倒计时
	*/
	add:function(selector,opt){
		var _opt =$.extend({},defaults, opt);
		var _t ={
			data:TimeUtil.getDiffs(selector),
			option:_opt
		}
		if(this.__o.diffs  instanceof  Array) 
			this.__o.diffs.push(_t);
		else
			this.__o.diffs=[_t]				
	}
};
