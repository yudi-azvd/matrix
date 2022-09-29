const canvas = document.getElementById('canvas')

const characterPool = createCharacterPool()

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d')

const FONT_SIZE = 32

let frameCount = 0

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.shadowOffsetY = -3
context.shadowOffsetX = 0
context.shadowBlur = 20
context.shadowColor = `rgba(50, 202, 104, .7), rgba(150, 0, 1, .8)`

context.font = `bold ${FONT_SIZE}px Times New Roman`
context.font = `bold ${FONT_SIZE}px Courier`
context.fillStyle = 'rgba(50, 202, 104, 1)'
const baseHighlight = '#9af0b8'


const matrix = createMatrix()

function updateMatrix() {
  clearContext()

  matrix.update()
  matrix.render()
  // renderGrid()
  frameCount++

  requestAnimationFrame(updateMatrix)
}

function renderGrid() {
  // linhas horizontais
  context.fillStyle = 'rgba(255, 0, 0, 0.5)'
  for (let i = 0; i < matrix.numberOfColumns; i++) {
    context.fillRect(0, FONT_SIZE * i, window.innerWidth, 2)
  }

  // linhas verticais
  context.fillStyle = 'rgba(0, 0, 255, 0.5)'
  for (let i = 0; i < matrix.numberOfColumns; i++) {
    context.fillRect(FONT_SIZE * i, 0, 2, window.innerWidth)
  }
}

updateMatrix()

function createMatrix() {
  const matrix = {
    columns: [],
    numberOfColumns: window.innerWidth / FONT_SIZE,
    update,
    render
  }

  let columnY = 0, column
  for (let i = 0; i < matrix.numberOfColumns; i++) {
    columnY = 400 * getRandomInt(5, 400)
    column = createColumn(i * FONT_SIZE, -columnY)
    column.y = -column.symbolHolders.length * FONT_SIZE
    matrix.columns.push(column)
  }

  function render() {
    for (let i = 0; i < matrix.columns.length; i++) {
      matrix.columns[i].render();
    }
  }

  function update() {
    for (let i = 0; i < matrix.columns.length; i++) {
      matrix.columns[i].update();
    }
  }

  return matrix
}

/**
 * @param {number} x 
 * @param {number} initialY
 */
function createColumn(x, initialY) {
  const height = getRandomInt(25, 10)
  const pixelsPerStep = Math.ceil(canvas.height / FONT_SIZE)
  // const mult = getRandomInt(8, 8)
  const mult = getRandomInt(1, 1)
  // const mult = getRandomInt(1, 0)

  const column = {
    height,
    x,
    y: initialY - height * FONT_SIZE,
    acc: -pixelsPerStep,
    // verticalDisplacement: FONT_SIZE/100,
    verticalDisplacement: FONT_SIZE / getRandomInt(10, 20),
    symbolHolders: [],
    update,
    render
  }

  for (let i = 0; i < column.height; ++i) {
    column.symbolHolders.push(createSymbolHolder())
  }
  column.symbolHolders.at(-1).style = baseHighlight

  function update() {
    column.y += column.verticalDisplacement
    // column.y = pixelsPerStep*Math.ceil(column.acc)
    // column.y = FONT_SIZE * Math.ceil(column.acc)
    // column.acc += 4 * 1 / 60
    // console.log(column.y);

    if (column.y > window.innerHeight) {
      column.y = -column.height * FONT_SIZE
      column.acc = -column.symbolHolders.length
    }

    for (let i = 0; i < column.symbolHolders.length; i++) {
      column.symbolHolders[i].update();
    }
  }

  function render() {
    for (let i = 0; i < column.symbolHolders.length; i++) {
      column.symbolHolders[i].render(column.x, column.y + i * FONT_SIZE)
      // context.fillStyle = 'rgba(0, 255, 0, 0.5)'
      // context.shadowColor = ''
      // context.fillRect(column.x, column.y, FONT_SIZE, FONT_SIZE)
    }
  }

  return column
}


function createSymbolHolder() {
  const symbolHolder = {
    style: context.fillStyle,
    symbol: createSymbol(),
    switchInterval: getRandomInt(20, 100),
    update,
    render,
  }

  function update() {
    if (frameCount % symbolHolder.switchInterval == 0) {
      symbolHolder.symbol = createSymbol()
    }
  }

  function render(x, y) {
    context.fillStyle = symbolHolder.style
    context.fillText(symbolHolder.symbol, x, y)
  }

  return symbolHolder
}


function createSymbol() {
  return characterPool[getRandomInt(0, 95)]
}

function createCharacterPool() {
  let pool = ''
  let i = 0
  const baseKatakanaCharacterCode = 0x030A0
  for (; i < 95; i++) {
    pool += String.fromCharCode(baseKatakanaCharacterCode + i)
  }
  return pool
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
  return base + Math.floor(Math.random() * amplitude)
}