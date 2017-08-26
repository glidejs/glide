export default function siblings(el) {
  let n = el.parentNode.firstChild
  let matched = []

  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== el) {
      matched.push(n)
    }
  }

  return matched
}