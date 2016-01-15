import L from "lodash/fp";

console.log(L.range(0,5));

let pi2 = 2 * Math.PI;
let canvas = document.getElementById('draw');
let ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(200,0,0)";


let c = genCircle(15, 50);
log(c.length);
let c1 = L.take(c.length - 1, c);
let c2 = L.takeRight(c.length - 1, c);
let z  = L.zip(c1, c2);
log(z);


ctx.beginPath();
L.map((p)=> line(ctx, p[0], p[1]), z);
ctx.stroke();



function log(t) {
    console.log(JSON.stringify(t, true, 4));
}

function main() {
    return 0;
}

console.log("hello");

function line(ctx, p1, p2) {
    ctx.moveTo(p1[0],p1[1]);
    ctx.lineTo(p2[0],p2[1]);
}

function circlePoint(r, n, i) {

    let theta = (i/n) * pi2;
    let px = Math.cos(theta) * r + 150;
    let py = Math.sin(theta) * r + 150;
    return [px, py];
}

function genCircle(n, r) {
    let nc = L.partial(circlePoint, r, n);
    return L.map(nc, L.range(0,n));
}
