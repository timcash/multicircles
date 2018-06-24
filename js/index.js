import L from "lodash/fp"

let pi2 = 2 * Math.PI
let csize = 300
let nodes = 360

L.map(makeBox, L.range(2, nodes + 1))

function log(t) {
  console.log(JSON.stringify(t, true, 4))
}

function makeBox(i) {
  log("make a thing")
  let canvas = document.createElement("canvas")
  let cid = document.createTextNode(`${i}`)
  canvas.setAttribute("id", `canvas${i}`)
  canvas.width = csize
  canvas.height = csize
  document.body.appendChild(cid)
  document.body.appendChild(canvas)

  let ctx = canvas.getContext("2d")

  let mult = i

  let c = genCircle(nodes, csize / 2)
  let c1 = L.take(c.length - 1, c)
  let c2 = L.takeRight(c.length - 1, c)
  let z = L.zip(c1, c2)
  let p1 = L.map(x => [x, x * mult % nodes], L.range(0, nodes))
  let p2 = L.map(x => [c[x[0]], c[x[1]]], p1)

  let hue = 101
  let sat = 100
  let dir = 1
  let lgt = 70
  L.map(p => {
    hue += 1.3 * dir
    sat -= 0.07
    lgt -= 0.07

    if (hue <= 50 || hue >= 190) dir = -dir
    ctx.beginPath()
    ctx.strokeStyle = `hsl(${hue}, ${sat}%, ${lgt}%)`

    line(ctx, p[0], p[1])
    ctx.stroke()
  }, p2)

  ctx.beginPath()
  ctx.arc(csize / 2, csize / 2, csize / 2, 0, pi2)
  ctx.stroke()
}

function main() {
  return 0
}

function line(ctx, p1, p2) {
  ctx.moveTo(p1[0], p1[1])
  ctx.lineTo(p2[0], p2[1])
}

function circlePoint(r, n, i) {
  let theta = i / n * pi2
  let px = Math.cos(theta) * r + csize / 2
  let py = Math.sin(theta) * r + csize / 2
  return [px, py]
}

function genCircle(n, r) {
  let nc = L.partial(circlePoint, r, n)
  return L.map(nc, L.range(0, n))
}
