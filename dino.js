

import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
const dinoElem = document.querySelector("[data-dino]")
// how long the jump is
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
// we set this at 2 b/c we have two frames/images of the dino
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    // dont see why we need this removeEvent code
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino(delta,speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = "imgs/dino-lose.png"
}
function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = `imgs/dino-stationary.png`
        return
    }
    // updating the frame making the dino run
    if (currentFrameTime >= FRAME_TIME) {
        // dinoFrame will be either 0 or 1 
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        // makes the dino run
        dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
        // reset the frame time back to 0 so that the dinoFrame can either be 0 or 1
        currentFrameTime -= FRAME_TIME
    }
    // this is accounting for the speed of the current state of the game
    currentFrameTime += delta * speedScale
}


function handleJump(delta) {
    if (!isJumping)  {
        return
    }
    // "how far" the dino jumps
    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
    // if the dino is at the floor
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        // set at zero so it doesnt go below the ground
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }
// this dictates how high the dino jumps for
    yVelocity -= GRAVITY * delta
}
// checks if were pressing space bar to jump
function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
