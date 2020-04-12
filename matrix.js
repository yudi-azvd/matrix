var matrix = document.querySelector('#matrix')
var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight

var SYMBOL_HOLDER_WIDTH = 36

fillMatrixWithColumns(matrix)

updateMatrix(matrix)

function updateMatrix(matrix) {
  var columns = matrix.children
  var column, currentDistanceFromTop

  for(var i = 0; i < columns.length; i++) {
    column = columns[i]
    
    currentDistanceFromTop = parseInt(column.style.top)
    
    if (currentDistanceFromTop > SCREEN_HEIGHT) {
      column.style.top =  -1.5 * column.height
    }
    else {
      column.style.top = currentDistanceFromTop + column.displacement
    }
  }

  requestAnimationFrame(function() {
    updateMatrix(matrix)
  })
}

function fillMatrixWithColumns() {
  var numberOfColumns = Math.floor(SCREEN_WIDTH / SYMBOL_HOLDER_WIDTH)
  var xPosition

  for(var i = 0; i < numberOfColumns; i++) {
    xPosition = SYMBOL_HOLDER_WIDTH*i
    matrix.append(createColumn(xPosition))
  }
}

function createColumn(xPosition) {
  var column = document.createElement('ul')
  var length = getRandomInt(10, 20)
  var displacement = getRandomInt(5, 7)
  var hasShinyBase = getRandomInt(0, 2) == 1
  var x = xPosition

  column.style.position = 'absolute'

  for (var i = 0; i < length; i++) {
    column.append(createSymbolHolder())
  }

  if (hasShinyBase) {
    column.lastChild.classList = 'base'
  }

  var symbolHolderHeight = parseInt(column.firstChild.style.height)

  column.height = length*symbolHolderHeight
  column.length = length
  column.displacement = displacement
  column.style.left = x
  column.style.top = 0
    - length * symbolHolderHeight
    - 40 * getRandomInt(50, 50)

  return column
}

function createSymbolHolder() {
  var symbolHolder = document.createElement('li')
  var timeInterval = getRandomInt(500, 900)

  function updateSymbol() {
    symbolHolder.innerText = createSymbol()
  }

  setInterval(updateSymbol, timeInterval)

  symbolHolder.style.width = SYMBOL_HOLDER_WIDTH + 'px'
  symbolHolder.style.height = SYMBOL_HOLDER_WIDTH + 'px'
  symbolHolder.style.fontSize = SYMBOL_HOLDER_WIDTH-5 + 'px'

  return symbolHolder
}

function createSymbol() {
  return String.fromCharCode(getRandomInt(0x030A0, 95))
}

function getRandomInt(base, amplitude) {
  return base + Math.floor(Math.random()*amplitude)
}