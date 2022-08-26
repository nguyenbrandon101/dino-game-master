import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"

// this set up an interval at which how long the cactus will spawn
const CACTUS_INTERVAL_MIN =500
const CACTUS_INTERVAL_MAX = 2000
// make sure the speed of the cactus is the same as the ground or elseitll look weird
const SPEED = 0.05
// to add the cactus to the world
const worldElem = document.querySelector("[data-world")

let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    // get rid of all cactus when we restart a game
    document.querySelectorAll("[data-cactus]").forEach(cactus =>{
        cactus.remove()
    })
}


export function updateCactus(delta,speedScale) {
    // selects all the cactus
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        //moves the cactus speed
        incrementCustomProperty(cactus,"--left", delta*speedScale*SPEED * -1)
        // checks if cactus us way off to the left of our screen then we remove it
        if (getCustomProperty(cactus,"--left") <= -100) {
            cactus.remove()
        }
    })
    // when we need to summon cactus
    if (nextCactusTime <= 0) {
        createCactus()
        // do this b/c as the game gets faster and faster, we want the cactus to spawn faster too
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN,CACTUS_INTERVAL_MAX/speedScale)
    }
    // makes the next cactus spawn smaller
    nextCactusTime -= delta
}

// getting dimensions of cactus, gets the rectangles of all cactus on screen
// returns left, top, right, bottom, x, y, width, and height
export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
      return cactus.getBoundingClientRect()
    })
  }

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add("cactus")
    // by using 100, will show up all the right to the 100% of the screen
    setCustomProperty(cactus, "--left", 100)
    // adds cactus to our world
    worldElem.append(cactus)
}

function randomNumberBetween(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}