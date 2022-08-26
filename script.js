import {setupGround, updateGround} from './ground.js'
import {setupDino, updateDino, getDinoRect,setDinoLose} from './dino.js'
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
// start small because over time the game will get faster and faster
const SPEED_SCALLE_INCREASE = .00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startElem = document.querySelector("[data-start-screen]")
setPixelToWorldScale()
// Everytime the pixel size of our pixel screen size changes, we want the window to resize
window.addEventListener("resize",setPixelToWorldScale)
// anytime we press a key it will run the function handeStart once
document.addEventListener("keydown",handleStart,{once:true})


let lastTime
let speedScale
let score
// runs every single frame and updates all the positions,dino,cactus, runs every single ti,e
// time = since we start the program
function update(time) {
    // beginning of the run to account for how fast the movements are 
    // this if statement is for the beginning mean when we dont have a lastTime
    if (lastTime==null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return 
    }
    // last time we ran the frame, delta is basically our time
    const delta = time-lastTime
    // making sure our ground lines up with our frame
    updateGround(delta,speedScale)
    updateDino(delta,speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    updateCactus(delta,speedScale)
    // if we lose run our lose function
    if (checkLose()) return handleLose()
    // now we are setting our current time to the last time to mkae sure on the next re-run our last time is our current time
    lastTime = time
    // by calling it a second time, we will make it keep looping so it can always update
    window.requestAnimationFrame(update)
}

// how fast our ground will be moving
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALLE_INCREASE
}

// increase our score as the time
function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent= Math.floor(score)
}
// beggining of our program, how to start and run/initialize the game
function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()
  startElem.classList.add("hide")
  //   call this method whenever you're ready to update your animation onscreen, runs when the content on our screen changes. 
  window.requestAnimationFrame(update)
}

function setPixelToWorldScale() {
    let worldToPixelScale
    // if our window size is long then we use the width
    //window.innerWidth and window.innerHeight gets the size of our current window display
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
      worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        // if it's short then the height increases
      worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }
  // sets our world window size
    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
  }

  function checkLose() {
    const dinoRect = getDinoRect()
    // .some tells us if any of these cactus return true then we would want to return true
    return getCactusRects().some(rect => isCollision(rect,dinoRect))
  }

  // checks if the rectangles overlap
  function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
  }

  function handleLose() {
    setDinoLose()
    setTimeout(() => {
      // set a delay so when you lose and click any keys to restart
      document.addEventListener("keydown", handleStart,{once: true})
      startElem.classList.remove("hide")
    }, 100)
  }