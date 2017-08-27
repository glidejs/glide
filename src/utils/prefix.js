import Core from '../components/core'

export function addPrefix(string) {
  let prefix = Core.settings.classes.prefix + Core.settings.classes.separator

  return prefix + string
}