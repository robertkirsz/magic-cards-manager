// Checks if one node is contained in another
export const isContainedIn = (target, container) => {
  let node = target
  while (node) {
    if (node === container) return true

    node = node.parentNode
  }
  return false
}
