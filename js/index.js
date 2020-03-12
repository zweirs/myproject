//获取元素
var getElem=function(selector){
	return document.querySelector(selector);
}
var getAllElem=function(selector){
	return document.querySelectorAll(selector);
}
//获取元素样式
var getCls=function(element){
	return element.getAttribute('class');
}
//设置元素样式
var setCls=function(element,cls){
	return element.setAttribute('class',cls);
}
//为元素添加样式
var addCls=function(element,cls){
	var baseCls=getCls(element);
	if(baseCls.indexOf(cls)===-1){
		setCls(element,baseCls+' '+cls);
	}
}
//为元素删除样式
var delCls=function(element,cls){
	var baseCls=getCls(element);
	if(baseCls.indexOf(cls)!==-1){
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}
// 第一步：初始化样式 init
var screenAnimateElements={
	'.screen-1':[
	    '.screen-1__heading',
	    '.screen-1__subheading'
	],
	'.screen-2':[
	    '.screen-2__heading',
	    '.screen-2__subheading',
	    '.screen-2__sc2-1',
	    '.screen-2__sc2-2',
	],
	'.screen-3':[
	    '.screen-3__pic', 
	    '.screen-3__heading', 
	    '.screen-3__subheading',
	    '.screen-3__items',
	],
	'.screen-4':[
	    '.screen-4__heading', 
	    '.screen-4__subheading',
	    '.screen-4__features',
	],
	'.screen-5':[
	    '.screen-5__heading', 
	    '.screen-5__subheading',
	    '.screen-5__pic',
	],

};
//设置屏内元素为初始状态
var setScreenAnimateInit=function(screenCls){
	var screen=document.querySelector(screenCls);//获取当前屏的元素
	var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
	for(var i=0;i<animateElements.length;i++){
				var element=document.querySelector(animateElements[i]);
				var baseCls=element.getAttribute('class');
				element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
			}
}
//设置播放屏内的元素动画
var playScreenAnimateDone=function(screenCls){
	var screen=document.querySelector(screenCls);//获取当前屏的元素
	var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
	for(var i=0;i<animateElements.length;i++){
				var element=document.querySelector(animateElements[i]);
				var baseCls=element.getAttribute('class');
				element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
			}
}
window.onload=function(){
	for(k in screenAnimateElements){
		if(k==='.screen-1'){
			continue;
		}
	setScreenAnimateInit(k);
    }
}
//第二步：滚动条到哪里，就播放到哪里
var navItems=getAllElem('.header__nav-item');
var outLineItems=getAllElem('.outline__item');
var switchNavItemsActive=function(idx){
	for(var i=0;i<navItems.length;i++){
    	delCls(navItems[i],'header__nav-item_status_active');
   }
   addCls(navItems[idx],'header__nav-item_status_active');

    for(var i=0;i<outLineItems.length;i++){
    	delCls(outLineItems[i],'outline__item_status_active');
   }
   addCls(outLineItems[idx],'outline__item_status_active');
}

switchNavItemsActive(0);
window.onscroll=function(){
	var top=document.documentElement.scrollTop;
	console.log(top);
	if (top>60) {
		addCls(getElem('.header'),'header_status_back');
		addCls(getElem('.outline'),'outline_status_in');
	}else{
		delCls(getElem('.header'),'header_status_back');
		delCls(getElem('.outline'),'outline_status_in');

		switchNavItemsActive(0);
	}
	if (top>1) {
		playScreenAnimateDone('.screen-1');
	}
	if (top>640*1-100) {
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
	}
	if (top>640*2-100) {
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
	}
	if (top>640*3-100) {
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
	}
	if (top>640*4-100) {
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
	}
} 
// 第三步：双向定位

var setNavJump=function(i,lib){
	var item=lib[i];
	item.onclick=function(){
		document.documentElement.scrollTop=i*640;
	}
}
for(var i=0;i<navItems.length;i++){
		setNavJump(i,navItems);
}
for(var i=0;i<outLineItems.length;i++){
		setNavJump(i,outLineItems);
}
// 第四步：滑动门特效
var navTip=getElem('.header__nav-tip');
var setTip=function(idx,lib){
	lib[idx].onmouseover=function(){
		navTip.style.left=(idx*100)+'px';
	}
	var activeIdx=0;
	lib[idx].onmouseout=function(){
		for(var i=0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header__nav-item_status_active')>-1){
				activeIdx=i;
				break;
			}
		}
		navTip.style.left=(activeIdx*100)+'px';
	}
}
for(var i=0;i<navItems.length;i++){
	setTip(i,navItems);
}

setTimeout(function(){
    playScreenAnimateDone('.screen-1');
},200);
