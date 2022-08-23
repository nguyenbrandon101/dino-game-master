import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

// the speed of the ground and how fast it moves
const SPEED = 0.05
const groundELems = document.querySelectorAll("[data-ground]")

// makes our ground distance double in size by grabbing the two img gorund we imported
export function setupGround () {
    setCustomProperty(groundELems[0], "--left",0)
    setCustomProperty(groundELems[1], "--left",300)
}
// updating the ground element position of the game
// makes the ground move
// speedScale argument is the speed of the game in which as the game gets longer it will speed up to get harder
export function updateGround(delta, speedScale) {
    groundELems.forEach(ground => {
        // this is making our ground move "left" / backwards
        incrementCustomProperty(ground, "--left", delta  * speedScale* SPEED * -1)
    // saying does our ground move off the edge of the screen
    // if this happens, we want to loop the other ground 
    if (getCustomProperty(ground,"--left") <=-300) {
        // puts the second ground to the end of the edge of the first ground
        incrementCustomProperty(ground, "--left",600)
    }

    })
}