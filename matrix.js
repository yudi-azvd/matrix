const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.shadowOffsetY = 0
context.shadowOffsetX = 0
context.shadowBlur = 10
context.shadowColor = 'rgba(50, 202, 104, .5)'

context.font = 'bold 60px Times New Roman'
context.fillStyle = 'rgba(50, 202, 104, 1)'

const symbolHolder = createSymbolHolder()

var i = 0;

setInterval(() => {
  clearScreen()
  context.fillText(symbolHolder.symbol, 10, ++i*60)

  if (i*60 > canvas.height) i = 0
}, 500)

function createSymbolHolder() {
  const symbolHolder = {
    symbol: createSymbol(),
    timeInterval: getRandomInt(500, 900)
  }

  // Outra ideia é atualizar com base no "frame count"
  function updateSymbol() {
    symbolHolder.symbol = createSymbol()
  }

  setInterval(updateSymbol, symbolHolder.timeInterval)

  return symbolHolder
}

function clearScreen() {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

function createSymbol() {
  return String.fromCharCode(getRandomInt(0x030A0, 95))
}

function getRandomInt(base, amplitude) {
  return base + Math.floor(Math.random()*amplitude)
}