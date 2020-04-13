const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.shadowOffsetY = -4
context.shadowOffsetX = -4
context.shadowBlur = 2
context.shadowColor = 'rgba(0, 255, 255, 0.5)'

context.font = 'bold 60px Times New Roman'
context.fillStyle = '#fff'
context.fillText('hey', 10, 60)

var i = 0;

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(createSymbol(), 10, ++i*60)

  if (i*60 > canvas.height) i = 0
}, 500)

function createSymbol() {
  return String.fromCharCode(getRandomInt(0x030A0, 95))
}

function getRandomInt(base, amplitude) {
  return base + Math.floor(Math.random()*amplitude)
}