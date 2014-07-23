// JavaScript Document
$(function(){
	var notes = [];
	var position = new notes_position();
	var effect = new notes_effect();
	position.init();
	
	$("#bottom-status span").not(":last").mousedown(function(){
		effect.showBottomStatusBg(this);
	}).mouseup(function(){
		setTimeout(function(){
			effect.hideButtonStatusBg();
		}, 200);
	});
	ios.addButton($("#head-back"), "polygon", "备忘录", "white");
});
/*--------------------------------------------------------------------------------------
											position()
---------------------------------------------------------------------------------------*/
function notes_position() {
	this.init = function() {
		ios.draggable($("#outside-list")[0], {"axis":"y"}, "11");
		ios.draggable($("#inside-list")[0],{"axis":"y"}, "0");
		$("#add-button").mousedown(function(){
			$(this).children("img:first").hide();
			$(this).children("img:last").show();
		}).mouseup(function(){
			$(this).children("img:first").show();
			$(this).children("img:last").hide();
		});
	};
	function getJsonLength(json) {
		var i = 0;
		for(var j in json) {
			i ++;
		}
		return i;
	};
};
function notes_effect(){
	this.outsideListClick = function() {

	};
	this.showBottomStatusBg = function(el) {
		var left = $(el).position().left;
		var top = $(el).position().top;
		$("#bottom-status span:eq(4)").css({"left": left - 7 + "px", "top": top - 8 + "px", "display":"block"});
	};
	this.hideButtonStatusBg = function(){
		$("#bottom-status span:eq(4)").css("display", "none");
	};
	this.showTextArea = function() {
		var content = $("#edit-box").html();
		$("#textarea").html(content).show();
	};
}