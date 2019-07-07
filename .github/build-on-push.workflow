workflow "Build on push" {
  resolves = ["lint", "test", "build"]
  on = "push"
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "lint" {
  needs = "install"
  uses = "actions/npm@master"
  args = "run lint"
}

action "test" {
  needs = "install"
  uses = "actions/npm@master"
  args = "run test"
}

action "build" {
  needs = "install"
  uses = "actions/npm@master"
  args = "run build"
}
