export function siblings(node) {
  let n = node.parentNode.firstChild
  let matched = []

  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      matched.push(n)
    }
  }

  return matched
}

export function exist(node) {
  if (node instanceof HTMLElement) {
    return true
  }

  return false
}