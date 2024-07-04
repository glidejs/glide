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
 * Coerces a NodeList to an Array.
 *
 * @param  {NodeList} nodeList
 * @return {Array}
 */

export function toArray (nodeList) {
  return Array.prototype.slice.call(nodeList)
}
