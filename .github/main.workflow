workflow "Build on push" {
  resolves = ["lint", "test", "build"]
  on = "push"
}

action "install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "lint" {
  needs = "install"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run lint"
}

action "test" {
  needs = "install"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run test"
}

action "build" {
  needs = "install"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run build"
}
