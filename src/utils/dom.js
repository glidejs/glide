/**
 * Finds siblings elements of the passed node.
 *
 * @param  {HTMLElement} node
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
 * Checks if precised node exist and is a valid element.
 *
 * @param  {HTMLElement} node
 * @return {Boolean}
 */
export function exist (node) {
  if (node && node instanceof window.HTMLElement) {
    return true
  }

  return false
}
