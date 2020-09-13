const canvas = document.getElementById('canvas')

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d')

const FONT_SIZE = 100

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.shadowOffsetY = -3
context.shadowOffsetX = 0
context.shadowBlur = 20
context.shadowColor = 
  `rgba(50, 202, 104, .7), rgba(150, 0, 1, .8)`

context.font = `bold ${FONT_SIZE}px Times New Roman`
context.fillStyle = 'rgba(50, 202, 104, 1)'


const matrix = createMatrix()

function updateMatrix() {
  clearContext()

  matrix.render()
  
  requestAnimationFrame(updateMatrix)
}

updateMatrix()

function createMatrix() {
  const matrix = {
    columns: [],
    numberOfColumns: window.innerWidth/FONT_SIZE,
    render
  }

  let columnHeight = 0
  for (let i = 0; i < matrix.numberOfColumns; i++) {
    columnHeight = 4*getRandomInt(5, 10)
    matrix.columns.push(createColumn(i*FONT_SIZE, -columnHeight))    
  }

  function render() {
    matrix.columns.forEach(column => column.render())
  }
  
  return matrix
}

/**
 * @param {number} x 
 * @param {number} initialY
 */
function createColumn(x, initialY) {
  const height = getRandomInt(15, 10)

  const column = {
    height,
    x,
    y: initialY - height*FONT_SIZE,
    verticalDisplacement: FONT_SIZE/getRandomInt(8, 8),
    symbolHolders: [],
    render
  }

  for (let i = 0; i < column.height; ++i) {
    column.symbolHolders.push(createSymbolHolder())
  }

  function render() {
    column.y += column.verticalDisplacement

    if (column.y > window.innerHeight) {
      column.y = -column.height*FONT_SIZE
    }

    column.symbolHolders.forEach((holder, i) => 
      holder.render(column.x, column.y + i*FONT_SIZE)
    )
  }

  return column
}


function createSymbolHolder() {
  let time
  const symbolHolder = {
    symbol: createSymbol(),
    timeInterval: getRandomInt(500, 900),
    render,
  }

  // Outra ideia é atualizar com base no "frame count"
  function updateSymbol() {
    symbolHolder.symbol = createSymbol()
  }

  setInterval(updateSymbol, symbolHolder.timeInterval)

  function render(x, y) {
    // time = new Date().getTime()
    // if (time % 32 == 0) {
    //   updateSymbol()
    // }

    context.fillText(symbolHolder.symbol, x, y)
  }

  return symbolHolder
}


function createSymbol() {
  const baseKatakanaCharacterCode = 0x030A0
  return String.fromCharCode(
    getRandomInt(baseKatakanaCharacterCode, 95)
  )
}


function clearContext() {
  context.clearRect(0, 0, canvas.width, canvas.height)
}


/**
 * @param {number} base 
 * @param {number} amplitude 
 * @returns {number} random number
 */
function getRandomInt(base, amplitude) {
  return base + Math.floor(Math.random()*amplitude)
}