/*
* c: canvas
* a: context
*/
var counter = 0;
/** @const */ var width = 400;
/** @const */ var height = width;
/** @const */ var white = 'white';
var snowballX = 80;
var snowballY = 120;
var gameOver = 0;
var M = Math;
var rand = M.random;
var up = -1;
var fifty = 50;
var yVel = 0;

c.width = width;
c.height = height;

function lineTo(x,y) {
  a.lineTo(x,y);
}

window['lineTo'] = lineTo;

onkeydown=onkeyup=function(e){
  // if this is a keydown event, new_val gets the value 4, otherwise 0
  var new_val=e.type[5]?1:-1;
  e=e.keyCode;
  // if space pressed, up is truthy (credit where credit's due:
  // this is adapted from Legend of the Bouncing Beholder 
  // http://js1k.com/2010-first/demo/635)
  up=e^32?up:new_val;
}

function gameloop() {
  a.fillStyle = 'gray';
  a.fillRect(0,0,width,height);
  counter += 2;
  //as long as these happen in the right order, only need to set a.fillStyle = white once
  a.fillStyle = white;
  moveSnowball();
  snowball();
  snow();
  a.fillStyle = "rgb(190,230,255)";
  icicles();
  walls(); 
  a.fillStyle = "red";
  a.font = "50px arial";
  if(!gameOver) {
    setTimeout(gameloop, 30);
  }
  else {
    a.fillText('GAME OVER', fifty, 200);
  }
}

function moveSnowball() {
  yVel -= up/3;
  snowballY += yVel;
}

function detectCollision() {
  if (a.isPointInPath(snowballX, snowballY)) {
    gameOver = 1;
  }
}

var icicleArray = [50, 150, 250, 350];
function icicles() {
  for (var i = 0; i < 4; i++) {
    var x = (width - (counter%width) + icicleArray[i]) % width - fifty;
    var y = height - x - 160;
    a.beginPath();
    lineTo(x, y);
    lineTo(x + 10, y + 3);
    lineTo(x + 5, y + 70);
    detectCollision();
    a.fill();
  }
}

var firstWallPoint = 0;
var wallPoints = [];
for(var i = 0; i < 10; i++) {
  newWallPoint();
}

function newWallPoint() {
  wallPoints.push(M.floor(rand() * 120 + 10));
}

function walls() {
  a.beginPath();
  lineTo(0,0);
  if (counter % fifty == 0) {
    newWallPoint();
    firstWallPoint++;
  }
  for (var i = 0; i < 10; i++) {
    var xpos = i * fifty - (counter % fifty);
    lineTo(xpos, wallPoints[i + firstWallPoint]);
  }
  lineTo(width, 0);
  lineTo(0, 0);
  for (var i = 0; i < 10; i++) {
    var xpos = i * fifty - (counter % fifty);
    lineTo(xpos, 250 + wallPoints[i + firstWallPoint]);
  }
  lineTo(width, height);
  lineTo(0, height);
  detectCollision();
  a.fill();
}

function snowball() {
  a.beginPath();
  a.arc(snowballX, snowballY, 10, 0, M.PI*2, 1);
  a.fill();
}

var flakes = 978;
var snowArray = [];
for(var j = 0; j < flakes; j++) {
  snowArray.push(width*height/flakes * j + rand() * 100);
}

function snow() {
  for(var j = 0; j < flakes; j++) {
    var s = snowArray[j] + width + rand() - 0.5;// + M.sin(counter/2) / 4;
    s %= width*height;
    snowArray[j] = s;
    var x = (s - counter % width) % width;
    var y = s / width;
    a.fillRect(x, y, 1, 1);
  }
}

gameloop();
