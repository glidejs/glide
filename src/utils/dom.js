/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
export function siblings (node) {
  let n = node.parentNode.firstChild
  let matched = []

  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      matched.push(n)
    }
  }

  return matched
}

/**
 * Checks if passed node exist and is a valid element.
 *
 * @param  {Element} node
 * @return {Boolean}
 */
export function exist (node) {
  if (node && node instanceof window.HTMLElement) {
    return true
  }

  return false
}
