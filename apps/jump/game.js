var width = 320,
height = 480,
gLoop,
points = 0,
state = true,
c = document.getElementById('c'),
ctx = c.getContext('2d');

c.width = width;
c.height = height;


var clear = function(){
    ctx.fillStyle = '#d0e7f9';
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
}

var howManyCircles = 10, circles = [];

for (var i = 0; i < howManyCircles; i++)
circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);

var DrawCircles = function(){
    for (var i = 0; i < howManyCircles; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
        ctx.beginPath();
        ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
};

var MoveCircles = function(e){
    for (var i = 0; i < howManyCircles; i++) {
        if (circles[i][1] - circles[i][2] > height) {
            circles[i][0] = Math.random() * width;
            circles[i][2] = Math.random() * 100;
            circles[i][1] = 0 - circles[i][2];
            circles[i][3] = Math.random() / 2;
        }
        else {
            circles[i][1] += e;
        }
    }
};

var player = new (function(){
                  var that = this;
                  that.image = new Image();
                  
                  that.image.src = "angel.png"
                  that.width = 65;
                  that.height = 95;
                  that.frames = 1;
                  that.actualFrame = 0;
                  that.X = 0;
                  that.Y = 0;
                  
                  that.isJumping = false;
                  that.isFalling = false;
                  that.jumpSpeed = 0;
                  that.fallSpeed = 0;
                  
                  that.jump = function() {
                  if (!that.isJumping && !that.isFalling) {
                  that.fallSpeed = 0;
                  that.isJumping = true;
                  that.jumpSpeed = 17;
                  }
                  }
                  
                  that.checkJump = function() {
                  //a lot of changes here
                  
                  if (that.Y > height*0.4) {
                  that.setPosition(that.X, that.Y - that.jumpSpeed);
                  }
                  else {
                  if (that.jumpSpeed > 10)
                  points++;
                  // if player is in mid of the gamescreen
                  // dont move player up, move obstacles down instead
                  MoveCircles(that.jumpSpeed * 0.5);
                  
                  platforms.forEach(function(platform, ind){
                                    platform.y += that.jumpSpeed;
                                    
                                    if (platform.y > height) {
                                    var type = ~~(Math.random() * 5);
                                    if (type == 0)
                                    type = 1;
                                    else
                                    type = 0;
                                    
                                    platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.y - height, type);
                                    }
                                    });
                  }
                  
                  
                  that.jumpSpeed--;
                  if (that.jumpSpeed == 0) {
                  that.isJumping = false;
                  that.isFalling = true;
                  that.fallSpeed = 1;
                  }
                  
                  }
                  
                  that.fallStop = function(){
                  that.isFalling = false;
                  that.fallSpeed = 0;
                  that.jump();
                  }
                  
                  that.checkFall = function(){
                  if (that.Y < height - that.height) {
                  that.setPosition(that.X, that.Y + that.fallSpeed);
                  that.fallSpeed++;
                  } else {
                  if (points == 0)
                  that.fallStop();
                  else
                  GameOver();
                  }
                  }
                  
                  that.moveLeft = function(){
                  if (that.X > 0) {
                  that.setPosition(that.X - 5, that.Y);
                  }
                  }
                  
                  that.moveRight = function(){
                  if (that.X + that.width < width) {
                  that.setPosition(that.X + 5, that.Y);
                  }
                  }
                  
                  
                  that.setPosition = function(x, y){
                  that.X = x;
                  that.Y = y;
                  }
                  
                  that.interval = 0;
                  that.draw = function(){
                  try {
                  ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
                  }
                  catch (e) {
                  };
                  
                  if (that.interval == 4 ) {
                  if (that.actualFrame == that.frames) {
                  that.actualFrame = 0;
                  }
                  else {
                  that.actualFrame++;
                  }
                  that.interval = 0;
                  }
                  that.interval++;
                  }
                  })();


player.setPosition(~~((width-player.width)/2), height - player.height);
player.jump();



document.onmousemove = function(e){
	if (player.X + c.offsetLeft > e.pageX) {
		player.moveLeft();
	} else if (player.X + c.offsetLeft < e.pageX) {
		player.moveRight();
	}

}

document.ontouchmove = function(e){
    if (player.X + c.offsetLeft > e.pageX) {
        player.moveLeft();
    } else if (player.X + c.offsetLeft < e.pageX) {
        player.moveRight();
    }
    e.preventDefault();
}


//window.addEventListener('deviceorientation', this.orientationListener, false); //方向感应器
//window.addEventListener('MozOrientation', this.orientationListener, false); //方向感应器 for firefox
//window.addEventListener('devicemotion', this.orientationListener, false); //重力加速感应器 for iphone, android

window.onorientationchange = function(e){
    //    game.hideNavBar();   //屏幕翻转时隐藏地址栏
    //    if(game.stage) game.stage.updatePosition(); //更新舞台位置
    if (player.X + c.offsetLeft > e.pageX) {
        player.moveLeft();
    } else if (player.X + c.offsetLeft < e.pageX) {
        player.moveRight();
    }
};



window.ondeviceorientation =  function(e)
{
    var ang;
    var o = window.orientation;  //获取设备方向
    if(o == 90){
        ang = e.beta;  //设备横向1
    }
    else if(o == -90){
        ang = -e.beta;  //设备横向2
    }
    else if(o == 0){
        ang = e.gamma;    //设备纵向
    }
    
    if(ang > 5)
    {
        keyState[Q.KEY.RIGHT] = true;
    }
    else if(ang < -5)
    {
        keyState[Q.KEY.LEFT] = true;
    }
    else
    {
        keyState[Q.KEY.RIGHT] = false;
        keyState[Q.KEY.LEFT] = false;
    }
}

var nrOfPlatforms = 7,
platforms = [],
platformWidth = 70,
platformHeight = 20;

var Platform = function(x, y, type){
    var that=this;
    
    that.firstColor = '#FF8C00';
    that.secondColor = '#EEEE00';
    that.onCollide = function(){
        player.fallStop();
    };
    
    if (type === 1) {
        that.firstColor = '#AADD00';
        that.secondColor = '#698B22';
        that.onCollide = function(){
            player.fallStop();
            player.jumpSpeed = 50;
        };
    }
    
    
    
    that.x = ~~ x;
    that.y = y;
    that.type = type;
    
    //NEW IN PART 5
    that.isMoving = ~~(Math.random() * 2);
    that.direction= ~~(Math.random() * 2) ? -1 : 1;
    
    that.draw = function(){
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        var gradient = ctx.createRadialGradient(that.x + (platformWidth/2), that.y + (platformHeight/2), 5, that.x + (platformWidth/2), that.y + (platformHeight/2), 45);
        gradient.addColorStop(0, that.firstColor);
        gradient.addColorStop(1, that.secondColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(that.x, that.y, platformWidth, platformHeight);
    };
    
    return that;
};

var generatePlatforms = function(){
    var position = 0, type;
    for (var i = 0; i < nrOfPlatforms; i++) {
        type = ~~(Math.random()*5);
        if (type == 0) 
            type = 1;
        else 
            type = 0;
        platforms[i] = new Platform(Math.random() * (width - platformWidth), position, type);
        if (position < height - platformHeight) 
            position += ~~(height / nrOfPlatforms);
    }
}();

var checkCollision = function(){
    platforms.forEach(function(e, ind){
                      if (
                          (player.isFalling) && 
                          (player.X < e.x + platformWidth) && 
                          (player.X + player.width > e.x) && 
                          (player.Y + player.height > e.y) && 
                          (player.Y + player.height < e.y + platformHeight)
                          ) {
                      e.onCollide();
                      }
                      })
}

var GameLoop = function(){
    clear();
    //MoveCircles(5);
    DrawCircles();
    
    if (player.isJumping) player.checkJump();
    if (player.isFalling) player.checkFall();
    
    player.draw();
    
    platforms.forEach(function(platform, index){
                      if (platform.isMoving) {
                      if (platform.x < 0) {
                      platform.direction = 1;
                      } else if (platform.x > width - platformWidth) {
                      platform.direction = -1;
                      }
                      platform.x += platform.direction * (index / 2) * ~~(points / 100);
                      }
                      platform.draw();
                      });
    
    checkCollision();
    
    ctx.fillStyle = "Black";
    ctx.fillText("得分:" + points, 10, height-10);
    
    if (state)
        gLoop = setTimeout(GameLoop, 1000 / 50);
}


/**
 *LLink.js
 */
//LStage._linkList = new Array();
//LStage._isAddLinkEvent = false;
//LStage._addLinkEvent = function(event){
//    for(var i in LStage._linkList){
//        o = LStage._linkList[i];
//        if(event.offsetX < parseInt(o.x) + parseInt(o.getWidth()) && event.offsetY < parseInt(o.y) + parseInt(o.getHeight()) + parseInt(Math.floor(o.text.size * 0.4)) && event.offsetX > parseInt(o.x) && event.offsetY > parseInt(o.y)){
//            document.body.style.cursor = "pointer";
//            return;
//        }else{
//            document.body.style.cursor = "default";
//        }
//    }
//}
//
//function LLink(url,text,type,color,font,size){
//    var self = this;
//    base(self,LSprite,[]);
//    
//    self.type = "LLink";
//    self.url = url;
//    self.openType = type || "blank";
//    
//    self.x = 30;
//    self.y = 30;
//    
//    self.text = new LTextField();
//    self.text.color = color || "blue";
//    self.text.font = font || "urf-8";
//    self.text.size = size || 12;
//    self.text.x = 0;
//    self.text.y = 0;
//    self.text.text = text || url;
//    self.addChild(self.text);
//    
//    self.underLine = new LSprite();
//    self.underLine.graphics.drawRect(0,self.text.color,[0,0,self.text.getWidth(),Math.floor(self.text.size * 0.1)],true,self.text.color);
//    self.underLine.x = 0;
//    self.underLine.y = parseInt(self.text.getHeight()) + Math.floor(self.text.size * 0.3);
//    self.addChild(self.underLine);
//    
//    self.back = new LSprite();
//    self.back.graphics.drawRect(0,"transparent",[0,0,self.text.getWidth(),self.text.getHeight()],true,"transparent");
//    self.addChild(self.back);
//    
//    LStage._linkList.push(self);
//    
//    self.addEventListener(LMouseEvent.MOUSE_DOWN,self._jump);
//    
//    if(LStage._isAddLinkEvent == false){
//        LEvent.addEventListener(LGlobal.object,LMouseEvent.MOUSE_MOVE,LStage._addLinkEvent);
//        LStage._isAddLinkEvent = true;
//    }
//}
//LLink.prototype._jump = function(event,self){
//    var openType = "_" + self.openType;
//    window.open(self.url, openType);
//}



var GameOver = function(){
    state = false;
    clearTimeout(gLoop);
    setTimeout(function(){
               clear();
               
               ctx.fillStyle = "Black";
               ctx.font = "14pt Arial";
               ctx.fillText("游戏结束", width / 2 - 45, height / 2 - 60);
               ctx.fillText("得分: " + points, width / 2 - 45, height / 2 - 30);
               ctx.fillText("刷新页面重新开始！", width / 2 - 90, height / 2 - 0);
               
//               var link = new LLink("http://skiper.sinaapp.com","链接测试");
//               ctx.addChild(link);
               
               
               
               
               
               }, 100);
    
};




GameLoop();
