import _includes from 'lodash/includes'

// Checks if one node is contained in another
export const isContainedIn = (target, container) => {
  let node = target
  while (node) {
    if (node === container) return true
    node = node.parentNode
  }
  return false
}

// Converts 'Something {R}' to 'Something <i class="ms ms-cost ms-r"></i>'
export const manaLettersToIcons = string => {
  // Call function for every '{X}' value
  const htmlString = string.replace(/\{(.*?)\}/g, (g0, g1) => {
    // Create base class
    let className = 'ms ms-cost ms-'
    // Create symbol's class (remove any slashes)
    let thisSymbol = g1.replace('/', '').toLowerCase()
    // Change 't' to 'tap' for that symbol
    if (thisSymbol === 't') thisSymbol = 'tap'
    // Add together base class and symbol's class
    className += thisSymbol
    // Add additional class if it's a split mana value
    if (_includes(g1, '/')) className += ' ms-split'
    // Return the icon
    return `<i class="${className}"></i>`
  })
  // Add space between concurrent mana icons
  return htmlString.replace('</i><i', '</i> <i')
}

// Converts '{2}{R}' to ['ms ms-cost ms-2', 'ms ms-cost ms-r']
export const manaLettersToArray = string => {
  const array = []
  string.replace(/\{(.*?)\}/g, (g0, g1) => {
    let className = 'ms ms-cost ms-' + g1.replace('/', '').toLowerCase()
    if (_includes(g1, '/')) className += ' ms-split'
    array.push(className)
  })

  return array
}
