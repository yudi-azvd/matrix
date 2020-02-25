
function createSymbol() {
  return String.fromCharCode(getRandomInt(0x030A0, 95))
}

function getRandomInt(base, amplitude) {
  return base + Math.floor(Math.random()*amplitude)
}