/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
export function siblings (node) {
  if (node && node.parentNode) {
    let n = node.parentNode.firstChild
    const matched = []

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n)
      }
    }

    return matched
  }

  return []
}

/**
 * Checks if passed node exist and is a valid element.
 *
 * @param  {Element} node
 * @return {Boolean}
 */
export function exist (node) {
  // We are usine duck-typing here because we can't use `instanceof` since if we're in an iframe the class instance will be different.
  if (node && node.appendChild && node.isConnected) {
    return true
  }

  return false
}

/**
 * Coerces a NodeList to an Array.
 *
 * @param  {NodeList} nodeList
 * @return {Array}
 */

export function toArray (nodeList) {
  return Array.prototype.slice.call(nodeList)
}
