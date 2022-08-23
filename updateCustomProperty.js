
// elem = ground, prop = left
export function getCustomProperty(elem, prop) {
  // will return us a float number
  // convert our property to a number or else 0
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
  }
  
  // starting position for the element
  export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value)
  }
  
  // moves the element arg(element moving,from where move, how far)
  export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
  }