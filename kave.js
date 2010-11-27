/*
* c: canvas
* a: context
*/
var counter = 0;
/** @const */ var width = 400;
/** @const */ var height = 400;
/** @const */ var white = 'white';
var snowballX = 20;
var snowballY = 200;
var gameOver = false;
var rand = Math.random;

c.width = width;
c.height = height;

function gameloop() {
  a.fillStyle = 'chocolate';
  a.fillRect(0,0,width,height);
  counter++;
  icicles();
  //as long as these happen in the right order, only need to set a.fillStyle = white once
  a.fillStyle = white;
  walls(); 
  snowball();
  snow();
  a.strokeStyle = 'green';
  a.lineWidth = 4;
  a.strokeRect(0,0,width,height);
  if(!gameOver) {
    setTimeout(gameloop, 30);
  }
  else {
    //write game over?
  }
}

function detectCollision() {
  if (a.isPointInPath(snowballX, snowballY)) {
    gameOver = true;
    console.log(snowballX, snowballY);
  }
}

function icicles() {

}

var firstWallPoint = 0;
var wallPoints = [];
for(var i = 0; i < 10; i++) {
  newWallPoint();
}

function newWallPoint() {
  wallPoints.push(Math.floor(rand() * 120 + 10));
}

function walls() {
  a.beginPath();
  a.lineTo(0,0);
  if (counter % 25 == 0) {
    newWallPoint();
    firstWallPoint++;
  }
  for (var i = 0; i < 10; i++) {
    var xpos = i * 50 - ((counter * 2) % 50);
    a.lineTo(xpos, wallPoints[i + firstWallPoint]);
  }
  a.lineTo(width, 0);
  detectCollision();
  a.fill();
}

function snowball() {
  a.beginPath();
  a.arc(snowballX, snowballY, 10, 0, Math.PI*2, true);
  a.fill();
}

var flakes = 978;//978
var snowArray = [];
for(var j = 0; j < flakes; j++) {
  snowArray.push(width*height/flakes * j + rand() * 100);
}

function snow() {
  for(var j = 0; j < flakes; j++) {
    var s = snowArray[j] + width + rand() - 0.5 + Math.sin(counter/4) / 4;
    s %= width*height;
    snowArray[j] = s;
    var x = (snowArray[j] - (counter * 2) % width) % width;
    var y = snowArray[j] / width;
    a.fillRect(x, y, 1, 1);
  }
}

gameloop();
