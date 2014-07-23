// JavaScript Document
var apps = [];
var content = document.getElementById("preview-pic");

addPreviewPic("images/calculator/default.png", "pre-calculator");

for(var i = 0; i < apps.length; i++) {
	content.appendChild(apps[i]);
};


function addPreviewPic(url, id) {
	var img = document.createElement("img");
	img.className = "preview-pic";
	img.src = url;
	img.id = id;
	apps.push(img);
};