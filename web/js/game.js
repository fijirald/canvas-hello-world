var canvas
var ctx

var player = {
  size: {width: 20, height: 20},
  defaultPosition: {x: 10, y: 20},
  position: { x: 10, y: 20 },
  previousPosition: {x: 10, y: 20},
  setPosition: function(newCoordinates) {
    this.previousPosition.x = this.position.x
    this.previousPosition.y = this.position.y
    this.position.x = newCoordinates.x
    this.position.y = newCoordinates.y
  }
};
var playMode = false;
var directionEnum = {LEFT: "left", "UP": "up", "RIGHT": "right", "DOWN": "down"};
var direction = directionEnum.RIGHT;
var coordinates = {x: 0, y: 0};

function clearPrevPosition(player) {
  ctx.fillStyle = 'white'
  ctx.fillRect(player.previousPosition.x, player.previousPosition.y, player.size.width, player.size.height)
}

function drawNewPosition(player) {
  ctx.fillStyle = 'black'
  ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height)
}

function draw() {
  if(playMode == true) {
    player.setPosition(getNextPlayerPosition(direction, player))
    clearPrevPosition(player)
    drawNewPosition(player)
  }
  requestAnimationFrame(draw)
}

function clear() {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.x = player.defaultX
  player.Y = player.defaultY

  ctx.fillStyle = 'black'
}

(function initCanvas() {
  canvas = document.createElement("canvas")
  canvas.width = 900
  canvas.height = 400
  document.body.appendChild(canvas)

  ctx = canvas.getContext("2d")

  draw()
 })()

document.addEventListener('keydown', function(e) {
  // char "c"
  if(e.keyCode === 67) {
    clear()
  }
  // char "space key"
  if(e.keyCode === 32) {
    togglePlayMode()
  }
  // char "arrow left"
  if(e.keyCode === 37) {
    direction = directionEnum.LEFT
  }
  // char "arrow up"
  if(e.keyCode === 38) {
    direction = directionEnum.UP
  }
  // char "arrow right"
  if(e.keyCode === 39) {
    direction = directionEnum.RIGHT
  }
  // char "arrow down"
  if(e.keyCode === 40) {
    direction = directionEnum.DOWN
  }
})

function togglePlayMode() {
  return playMode = !playMode
}

function getNextPlayerPosition(directionEnumValue, player) {

  switch(directionEnumValue) {
    case directionEnum.LEFT:
      return {x: player.position.x - 1, y: player.position.y}
    break

    case directionEnum.UP:
      return {x: player.position.x, y: player.position.y - 1}
    break

    case directionEnum.RIGHT:
      return {x: player.position.x + 1, y: player.position.y}
    break

    case directionEnum.DOWN:
      return {x: player.position.x, y: player.position.y + 1}
    break
  }
}

//var lastTIme
//function main() {
//  console.log("lastTIme = " + lastTIme)
//  var now = Date.now()
//  var dt = (now - lastTIme) / 1000.0
//
//  update(dt)
//  render()
//
//  lastTIme = now
//  requestAnimFrame(main)
//}
