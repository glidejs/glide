/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
export function siblings (node) {
  if (node && node.parentNode) {
    let n = node.parentNode.firstChild
    let matched = []

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
  if (node && node instanceof window.HTMLElement) {
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

/**
 * Gathers a list of focusable elements within the passed in element (including the element itself).
 * Thank you to https://zellwk.com/blog/keyboard-focusable-elements/ for the inspiration
 * @param {Element} element
 * @param {Boolean} includeNegativeTabIndex - if true, includes elements with negative tabindex
 *
 * @returns {Array}
 */
export function getFocusableElements (element, includeNegativeTabIndex = false) {
  if (!element) {
    console.error('getFocusableElements: element does not exist')
  }
  const focusableElementsSelector = 'a[href], button, input, textarea, select, details, [tabindex], [contenteditable]'
  const focusableElements = []

  // if the container element itself is focusable, add it to the list first
  if (element.matches(focusableElementsSelector)) {
    focusableElements.push(element)
  }
  focusableElements.push(...element.querySelectorAll(focusableElementsSelector))

  // filter by relevant tabindex, styling, and disabled attributes
  return focusableElements.filter((element) => {
    if (!includeNegativeTabIndex && element.hasAttribute('tabindex') && (element.getAttribute('tabindex') < 0)) {
      return false
    }
    if (element.hasAttribute('disabled') || element.hasAttribute('hidden')) {
      return false
    }
    return true
  })
}
