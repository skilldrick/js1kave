var e=0,f=80,g=120,h=0,i=Math,j=i.random,l=-1,m=50,n=0;c.width=400;c.height=400;function o(b,d){a.lineTo(b,d)}function p(){a.beginPath()}onkeydown=onkeyup=function(b){var d=b.type[5]?1:-1;b=b.keyCode;l=b^32?l:d};
function q(){a.fillStyle="gray";a.fillRect(0,0,400,400);e+=2;n-=l/3;g+=n;a.fillStyle="white";p();a.arc(f,g,10,0,i.PI*2,1);a.fill();for(var b=0;b<r;b++){var d=s[b]+400+j()-0.5;d%=16E4;s[b]=d;a.fillRect((d-e)%400,d/400,1,1)}a.fillStyle="lightblue";for(b=0;b<4;b++){d=(400-e%400+t[b])%400-m;var k=400-d-160;p();o(d,k);o(d+10,k+3);o(d+5,k+70);o(d,k);if(a.isPointInPath(90,g))h=1;a.fill()}p();o(0,0);if(e%m==0){u.push(j()*110+5);v++}for(b=0;b<10;b++){d=b*m-e%m;o(d,u[b+v])}o(400,0);o(0,0);for(b=0;b<10;b++){d=
b*m-e%m;o(d,250+u[b+v])}o(400,400);o(0,400);if(a.isPointInPath(90,g))h=1;a.fill();a.fillStyle="red";a.font="50px arial";h?a.fillText("GAME OVER",m,200):setTimeout(q,30)}for(var t=[50,150,250,350],v=0,u=[],w=0;w<10;w++)u.push(j()*110+5);for(var r=978,s=[],x=0;x<r;x++)s.push(164*x+j()*100);q();
