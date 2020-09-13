const canvas = document.getElementById('canvas')

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d')

let x, y
let isDrawing = false
let canvasBounding = canvas.getBoundingClientRect()

canvas.addEventListener('mousedown', (event) => {
  x = event.clientX - canvasBounding.left
  y = event.clientY - canvasBounding.top
  isDrawing = true
})

canvas.addEventListener('mousemove', event => {
  if (isDrawing) {
    drawLine(context, x, y, 
      event.clientX-canvasBounding.left, 
      event.clientY-canvasBounding.top
    )
    x = event.clientX-canvasBounding.left
    y = event.clientY-canvasBounding.top
  }
})

window.addEventListener('mouseup', event => {
  if (isDrawing) {
    drawLine(context, x, y, event.clientX-canvasBounding.left, event.clientY-canvasBounding.top)
    x = event.clientX-canvasBounding.left
    y = event.clientY-canvasBounding.top
    isDrawing = false
  }
})

window.addEventListener('resize', () => {
  canvasBounding = canvas.getBoundingClientRect()
})

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath()
  context.strokeStyle = '#000'
  context.lineWidth = 2
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}