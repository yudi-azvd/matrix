const matrixCanva = document.getElementById('matrixCanva')
const WINDOW_HEIGHT = window.innerHeight
const WINDOW_WIDTH = window.innerWidth
let SYMBOL_WIDTH

if (navigator.userAgent.indexOf('IEMobile') !== -1
  || navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/iPhone/i)) {
    
  SYMBOL_WIDTH = 60
}
else {
  SYMBOL_WIDTH = 24
}


fillMatrixWithSequences(matrixCanva)

requestAnimationFrame(() => {
  updateSequences(matrixCanva)
})


function fillMatrixWithSequences(matrixCanva) {
  const positions = Math.floor(WINDOW_WIDTH / SYMBOL_WIDTH)

  let xPosition
  for (let p = 0; p < positions; ++p) {
    xPosition = SYMBOL_WIDTH*p
    matrixCanva.append(newSequence(xPosition))
  }
}


function updateSequences(matrixCanva) {
  matrixCanva.childNodes.forEach(stream => {
    let distanceFromTop = parseInt(stream.style.top)

    if (distanceFromTop >= WINDOW_HEIGHT) {
      distanceFromTop = -1.5*stream.height
    }

    stream.style.top = distanceFromTop + stream.displacement
  })

  requestAnimationFrame(() => {
    updateSequences(matrixCanva)
  })
}


function newSequence(xPosition) {
  const length = Math.floor(Math.random()*5+15)
  const stream = document.createElement('ul')
  const displacement = Math.floor(Math.random()*8+8)

  stream.style.position = 'absolute'
  stream.classList = 'sequence'
  
  for (let i = 0; i < length; ++i) {
    stream.append(newSymbolHolder())
  }

  if (new Date().getTime() % 2 === 0) {
    stream.lastChild.classList = 'first'
  }

  const symbolHeight = parseInt(stream.firstChild.style.height)

  stream.style.left = xPosition
  stream.style.top = 
    - symbolHeight*length 
    - Math.floor(Math.random()*1000+500)

  stream.displacement = displacement
  stream.height = symbolHeight*length

  return stream
}


function newSymbolHolder() {
  const symbolHolder = document.createElement('li')
  const timeInterval = Math.floor(Math.random()*100+500)

  const symbolWidth = SYMBOL_WIDTH

  symbolHolder.style.fontSize = symbolWidth-2
  symbolHolder.style.height = symbolWidth
  symbolHolder.style.width = symbolWidth

  setInterval(() => 
    symbolHolder.innerText = newSymbol()
  , timeInterval)

  return symbolHolder
}

function newSymbol() {
  return String.fromCharCode(
    0x30A0 + Math.floor(Math.random()*95)
  )
}
