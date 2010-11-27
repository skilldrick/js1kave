/*
* i: current frame
* w: width
* h: height
* sa: snow array
* c: canvas
* a: context
*/
var i = 0;
w=400;
h=400;
c.width=w;
c.height=h;

function gameloop() {
  a.fillStyle = 'black';
  a.fillRect(0,0,w,h);
  i++;
  snow();
  setTimeout(gameloop, 50);
}

var f = 978;
var sa = [];
for(var j = 0; j < f; j++) {
  sa.push(w*h/f * j + Math.random() * 10);
}

function snow() {
  a.fillStyle = 'rgba(255,255,255,0.8)';
  for(var j = 0; j < f; j++) {
    var s = sa[j] + w + Math.random() - 0.5 + Math.sin(i/4) / 4;
    s %= w*h;
    sa[j] = s;
    a.fillRect(sa[j] % w, sa[j] / w, 1, 1);
  }
}

gameloop();

