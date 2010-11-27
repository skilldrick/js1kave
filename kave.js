/*
* c: canvas
* a: context
*/
var counter = 0;
/** @const */ var width = 400;
/** @const */ var height = 400;
/** @const */ var white = 'white';
var snowballX = 20;
var snowballY = 50;
var gameOver = false;
var rand = Math.random;

c.width = width;
c.height = height;

function gameloop() {
  a.fillStyle = 'chocolate';
  a.fillRect(0,0,width,height);
  counter++;
  icicles();
  walls(); 
  //as long as these happen in the right order, only need to set a.fillStyle = white once
  snowball();
  snow();
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

var wallPoints = [];
for(var i = 0; i < 999; i++) {
  wallPoints.push(Math.floor(rand() * 50));
}

function walls() {
  a.fillStyle = white;
  a.beginPath();
  a.lineTo(0,0);
  for (var i = 0; i < wallPoints.length; i++) {
    a.lineTo(i * 50 - counter * 2, wallPoints[i]);
  }
  a.lineTo(width + 100, 0);
  detectCollision();
  a.fill();
}

function snowball() {
  a.beginPath();
  a.arc(snowballX, snowballY, 10, 0, Math.PI*2);
  a.fill();
}

var flakes = 978;
var snowArray = [];
for(var j = 0; j < flakes; j++) {
  snowArray.push(width*height/flakes * j + rand() * 100);
}

function snow() {
  for(var j = 0; j < flakes; j++) {
    var s = snowArray[j] + width + rand() - 0.5 + Math.sin(counter/4) / 4;
    s %= width*height;
    snowArray[j] = s;
    a.fillRect((snowArray[j] - counter * 2) % width, snowArray[j] / width, 1, 1);
  }
}

gameloop();
