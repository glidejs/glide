import Core from '../components/core'

export default function prefixer(string) {
  let prefix = Core.settings.classes.prefix + Core.settings.classes.separator

  return prefix + string
}