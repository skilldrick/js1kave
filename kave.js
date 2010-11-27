/*
* c: canvas
* a: context
*/
var counter = 0;
var width = 400;
var height = 400;
c.width = width;
c.height = height;

function gameloop() {
  a.fillStyle = 'black';
  a.fillRect(0,0,width,height);
  counter++;
  snow();
  setTimeout(gameloop, 50);
}

var flakes = 978;
var snowArray = [];
for(var j = 0; j < flakes; j++) {
  snowArray.push(width*height/flakes * j + Math.random() * 100);
}

function snow() {
  a.fillStyle = 'rgba(255,255,255,0.8)';
  for(var j = 0; j < flakes; j++) {
    var s = snowArray[j] + width + Math.random() - 0.5 + Math.sin(i/4) / 4;
    s %= width*height;
    snowArray[j] = s;
    a.fillRect(snowArray[j] % width, snowArray[j] / width, 1, 1);
  }
}

gameloop();

