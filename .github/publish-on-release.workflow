workflow "Publish on release" {
  resolves = ["publish"]
  on = "release"
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

action "tag" {
  needs = ["lint", "test", "build"]
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "publish" {
  needs = "tag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_ACCESS_TOKEN"]
}
