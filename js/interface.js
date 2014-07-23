//interface document
window.ios = {};
/*-------------------------------------------------------------------------------------
							addApp()
							功能：添加应用;
							  status-color:状态栏颜色，可选：默认透明栏
														 black 不透明黑
														 white 不透明白，并且字体变为蓝色
							  status_hide:布尔值，默认为false，若为true，则隐藏status
-------------------------------------------------------------------------------------*/
openApp = function(appName, status_color, status_hide) {
	if(!appName) appName = "developing";
	$("#app-content iframe").css("display","block");
	switch(status_color){
		case "black": 
			$("#status-top").css("background","rgba(0, 0, 0, 1)");
			break;
		case "white":
			//some code.Change color
			break;
		default:
			"";
	};
	
	switch(status_hide){
		case true:
			$("#status-top").animate({"top":"-21px"})
			break;
		default:
			"";
	};
	var url = "apps/" + appName + "/" + appName + ".html";
	$("#app-content iframe").attr("src",url);
	setTimeout(function(){ $(".preview-pic").hide()}, 1600);
};
window.ios.openApp = openApp;
closeApp = function() {
	$("#app-content iframe").attr("src","about:blank");
};
window.ios.closeApp = closeApp;
/*-------------------------------------------------------------------------------------
							addButton(el, shape, context, color, attr-name, attr-value)
							功能：添加一个按钮
							  elem:按钮的父元素
							  shape:按钮的形状
							  context:按钮的内容
							  color:字体颜色
							  attr-name(可选):为按钮增加属性，若有一个以上，以json格式填写
-------------------------------------------------------------------------------------*/
function addButton(el, shape, context, color, attr_name, attr_value) {
	var adjustWidthLeft;
	var adjustWidthRight;
	var adjust;
	var content_length = context.length;
	switch(shape){
		case "rect":
			adjustWidthLeft = 5;
			adjustWidthRight = 5;
			//adjust = content_length * ;
			break;
		case "polygon":
			adjustWidthLeft = 13;
			adjustWidthRight = 5;
			adjust = 8;
			break;
		default:
			adjustWidthLeft = 0;
			adjustWidthRight = 0;
			adjust = 0;
	};
	var img = new Image();
	var img_pressed = new Image();
	img.src = "/ios/images/button/button-" + shape + ".png";
	img_pressed.src = "/ios/images/button/button-" + shape + "-pressed.png";
	
	var mainbox = document.createElement("div");
	var canvas = document.createElement("canvas");
	var canvas_pressed = document.createElement("canvas");
	$(canvas_pressed).css("display","none");
	var p = document.createElement("p");
	$(p).html(context).css("display","none");
	$(mainbox).append(p);
	$(el).append(mainbox);
	var textWidth = $(p).width() - adjust;
	
	canvas.width = adjustWidthLeft + textWidth + adjustWidthRight;
	canvas.height = 30;
	var left = (adjustWidthLeft + adjustWidthRight - adjust/2);
	
	img.onload = function(){
		var ctx1 = canvas.getContext("2d");
		ctx1.drawImage(img, 0, 0, adjustWidthLeft, 30, 0, 0, adjustWidthLeft, 30);
		ctx1.drawImage(img, adjustWidthLeft, 0, 1, 30, adjustWidthLeft, 0, textWidth, 30);
		ctx1.drawImage(img, adjustWidthLeft + 1, 0, 5, 30, adjustWidthLeft + textWidth, 0, 5, 30);
		ctx1.font = "12px Verdana, Geneva, sans-serif";
		ctx1.fillStyle = color;
		ctx1.fillText(context, left, 20);
	};
	
	img_pressed.onload = function(){
		var ctx2 = canvas_pressed.getContext("2d");
		ctx2.drawImage(img_pressed, 0, 0, adjustWidthLeft, 30, 0, 0, adjustWidthLeft, 30);
		ctx2.drawImage(img_pressed, adjustWidthLeft, 0, 1, 30, adjustWidthLeft, 0, textWidth, 30);
		ctx2.drawImage(img_pressed, adjustWidthLeft + 1, 0, 5, 30, adjustWidthLeft + textWidth, 0, 5, 30);
		ctx2.font = "12px Verdana, Geneva, sans-serif";
		ctx2.fillStyle = color;
		ctx2.fillText(context, left, 20);
	};
	
	$(mainbox).append(canvas).append(canvas_pressed);
	/*---------------------------设置属性----------------------------------------*/
	if(typeof attr_name === "object") {
		$(mainbox).attr(attr_name);
	} else if(attr_value !== undefined) {
		$(mainbox).attr(attr_name, attr_value);
	};
	/*---------------------------设置行为----------------------------------------*/
	$(mainbox).mousedown(function(){
		$(canvas).hide();
		$(canvas_pressed).show();
	}).mouseup(function(){
		setTimeout(function(){
			$(canvas).show();
			$(canvas_pressed).hide();
		}, 100);
	});
};
window.ios.addButton = addButton;
/*-------------------------------------------------------------------------------------
							draggable(el, top, left, json)
							功能：具有ios特色的拖拽，基于jQuery UI draggable
							  el:拖拽元素
							  top:初始高度, 无单位, 默认为0
							  left:初始左边界值, 无单位, 默认为0
							  json:以jQuery UI draggable为准的方法
-------------------------------------------------------------------------------------*/
function draggable(el, json, top, left) {
	if(!top) var top = 0;
	if(!left) var left = 0;
	var start_time;
	var stop_time;
	$(el).draggable({
		"start": function() {
			start_time = new Date();
		},
		"drag": function() {
			
		},
		"stop": function() {
			stop_time = new Date();
			var drag_time = stop_time - start_time;
			var stop_top = parseInt($(this).css("top"));
			var drag_top = stop_top - top;
			var speed = drag_top / drag_time;
			
			if(stop_top > top) {
				$(this).animate({"top": top - 5 + "px"}, 400).animate({"top": top + "px"}, 200);
			};
		}
	}).draggable(json);
};
window.ios.draggable = draggable;
