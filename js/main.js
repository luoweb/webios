// JavaScript Document
$(function(){
	var unlock = new ios_lockGroup();
	var position = new ios_position();
	var init = new ios_init();
	var app = new ios_app();
	init.hiddenInit();
	unlock.lockInit();
	$(".icon img, .dock img").mousedown(function(){
			var name = $(this).parent().attr("name");
			var height = $(this).parent().attr("height");
			var status = $(this).parent().attr("status");
			position.showMouseDown(this);
			setTimeout(function(){
				position.dockOut();
				position.iconOut();
				position.showPreviewPic(name);
				position.showAppBg(height);
				position.hideMouseDown();
			},200);
			setTimeout(function(){
				ios.openApp(name, status);
			},600);
		})
	$("#home-bottom").click(function(){
		$("#lock-group").css("display") != "none"? ""
			: ((function(){
				setTimeout(function(){
					position.hidePreviewPic();
					position.dockIn();
					position.iconIn();
					init.initStatus();
					position.hideAppBg();
					ios.closeApp();
				}, 200)
				app.closeApp();
		}))();
	});
	/*----------------------------------------------------------------------------------------------------
												init类
	-----------------------------------------------------------------------------------------------------*/
	function ios_init() {
		/*-----------------------------------------------------------------------------------
												iconInit()
												初始化所有图标的位置
		-----------------------------------------------------------------------------------*/
		this.iconInit = function() {
			$("#one-top-left").css({"left":"-160px", "top":"-140px"});
			$("#one-top-right").css({"right":"-140px", "top":"-160px"});
			$("#one-bottom-left").css({"left":"-160px;", "top":"352px"});
			$("#one-bottom-right").css({"right":"-160px", "top":"352px"});
		};
		/*-----------------------------------------------------------------------------------
												hiddenInit()
												初始化所有隐藏的图层
		-----------------------------------------------------------------------------------*/
		this.hiddenInit = function(){
			$("#screen").hide();
		};
		/*-----------------------------------------------------------------------------------
												dockInit()
												初始化所有隐藏的图层
		-----------------------------------------------------------------------------------*/
		this.dockInit = function() {
			$("#dock").css("bottom","-75px");
		};
		this.initStatus = function() {
			$("#status-top").css({"background":"rgba(0, 0, 0, 0.6)"});
		};
	};
/*----------------------------------------------------------------------------------------------------
											position类
-----------------------------------------------------------------------------------------------------*/
	function ios_position() {
		var in_speed = 400;
		var out_speed = 500;
		/*-----------------------------------------------------------------------------------
												iconIn()
												点击Home键时候的效果
		-----------------------------------------------------------------------------------*/
		this.iconIn = function() {
			$("#screen").css("display","block");
			$("#one-top-left").animate({"left":"0px", "top":"20px"}, in_speed);
			$("#one-top-right").animate({"right":"0px", "top":"20px"}, in_speed);
			$("#one-bottom-left").animate({"left":"0px", "top":"192px"}, in_speed);
			$("#one-bottom-right").animate({"right":"0px", "top":"192px"}, in_speed);
		};
		/*-----------------------------------------------------------------------------------
												iconOut()
												当点击一个图标的时候，所有图标的运动效果
		-----------------------------------------------------------------------------------*/
		this.iconOut = function() {
			$("#one-top-left").animate({"left":"-160px", "top":"-140px"}, out_speed);
			$("#one-top-right").animate({"right":"-160px", "top":"-140px"}, out_speed);
			$("#one-bottom-left").animate({"left":"-160px", "top":"352px"}, out_speed);
			$("#one-bottom-right").animate({"right":"-160px", "top":"352px"}, out_speed);
		};
		/*-----------------------------------------------------------------------------------
												dockIn()
												dock栏显示效果
		-----------------------------------------------------------------------------------*/
		this.dockIn = function() {
			$("#dock").animate({"bottom":"5px"}, 400);
		};
		/*-----------------------------------------------------------------------------------
												dockOut()
												dock栏隐藏效果
		-----------------------------------------------------------------------------------*/
		this.dockOut = function() {
			$("#dock").animate({"bottom":"-90px"}, 400);
		};
		/*-----------------------------------------------------------------------------------
												showPreviewPic()
												显示预览图片
		-----------------------------------------------------------------------------------*/
		this.showPreviewPic = function(name) {
			var img = $("<img />");
			img.attr({"src":"/ios/images/preview-pic/" + name + ".png", "id":"pre-" + name
				, "class":"preview-pic"});
			$("#preview-pic").append(img);
			img.show().css("display","block").animate({"left":"160px", "top":"240px"
				,"width":"0px", "height":"0px"},0)
				.animate({"left":"0px", "top":"0px", "width":"320px", "height":"460px"}, 400);
		};
		/*-----------------------------------------------------------------------------------
												hidePreviewPic()
												隐藏预览图片
		-----------------------------------------------------------------------------------*/
		this.hidePreviewPic = function(name) {
			$(".preview-pic").hide();
		};
		/*-----------------------------------------------------------------------------------
												showAppBg()
												显示App背景
												height:460px or 480px
		-----------------------------------------------------------------------------------*/
		this.showAppBg = function(height) {
			$("#app-bg").animate({"left":"160px", "top": (parseInt(height)/2 + 20) + "px", 
				"width":"0px", "height":"0px"}, 0)
			.animate({"left":"-1px", "top":(459 - parseInt(height)) + "px"
				, "width":"320px", "height":"480px"}, 500);
		};
		/*-----------------------------------------------------------------------------------
												hideAppBg()
												隐藏App背景
												height:460px and 480px
		-----------------------------------------------------------------------------------*/
		this.hideAppBg = function() {
			var height = parseInt($("#app-bg").css("height"));
			$("#app-bg").animate({"left":"160px", "top": height/2, "width":"0px", "height":"0px"}, 400);
		};
		/*-----------------------------------------------------------------------------------
												showMouseDown()
												图标下时候的效果
		-----------------------------------------------------------------------------------*/
		this.showMouseDown = function(el) {
			var offset = $(el).parent().position();
			var group = $(el).parent().parent().attr("group");
			var left;
			var top;
			if(group == 5){
				$("#mouseDown").css({"top":"405px", "left": offset.left + 1});
			} else if(group % 2 == 0) {
				left = 169 + offset.left - 17;
				top = ((parseInt(group) / 2) - 1) * 172 + parseInt(offset.top) + 20;
			} else {
				left = offset.left + 1;
				top = (((parseInt(group) + 1) / 2) - 1) * 172 + parseInt(offset.top) + 20;
			};
			$("#mouseDown").css({"top":top + "px", "left":left + "px", "display":"block"});
		};
		/*-----------------------------------------------------------------------------------
												hideMouseDown()
												鼠标弹起时候的效果
		-----------------------------------------------------------------------------------*/
		this.hideMouseDown = function() {
			$("#mouseDown").css("display","none");
		};
	};
/*----------------------------------------------------------------------------------------------------
											lock-group类
-----------------------------------------------------------------------------------------------------*/
	function ios_lockGroup(){
		/*--------------------------------------------------------------------
											
		--------------------------------------------------------------------*/
//        unlock()
		this.lockInit = function(callback) {

            unlock()  

		};
		var unlock = function() {
//			$("#lock-top").animate({"top":"-100px"}, 300);
//			$("#lock-bottom").animate({"bottom":"-100px"}, 300);
//			$("#lock-group").animate({"opacity":"0"}, 300);
			var setTopTime = function() {
//				$("#lock-icon").css({"background":"none", "color":"white"
//					, "font-size":"14px"
//					, "font-family":"Arial, Helvetica, sans-serif"
//					, "margin-left":"-15px"}).append("<p>" + date.hour + ":" + date.min +"</p>");
			};
			setInterval(function() {
					var date = getDateTime();
//					$("#lock-icon p").replaceWith("<p>" + date.hour + ":" + date.min +"</p>");
				},10000)
			setTimeout(function(){
					$("#lock-group").css("display","none");
					position.iconIn();
					position.dockIn();
					setTopTime();
				}, 300);
		};
		var getDateTime = function() {
			var d = new Date();
			var curr_day = d.getDay();
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();
			var curr_hour = d.getHours();
			var curr_min = d.getMinutes();
			curr_hour < 10 ? curr_hour = "0" + curr_hour : "";
			curr_min < 10 ? curr_min = "0" + curr_min : "";
			return {"day": curr_day, "date": curr_date, "month": curr_month
				, "year": curr_year, "hour":curr_hour, "min": curr_min}
		};
		var d_names = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
		var date = getDateTime();
	};
/*----------------------------------------------------------------------------------------------------
											app类
-----------------------------------------------------------------------------------------------------*/	
	function ios_app() {
		this.openApp = function(name) {
			$("#app-content iframe").css("display","block").attr("src","");
		};
		this.closeApp = function(callback){
			$("#app-content iframe").fadeOut(300);
			if(callback) callback();
		};
	};
});
/*-----------------------------------------------缓存图片---------------------------*/
window.onload = function(){
	$("<img />").attr("src", "images/preview-pic/calculator.png");
	$("<img />").attr("src", "images/preview-pic/notes.png");
    $("<img />").attr("src", "images/preview-pic/2048.png");
};