workflow "Publish on release" {
  resolves = ["publish"]
  on = "release"
}

action "lint" {
  uses = "actions/npm@master"
  args = "lint"
}

action "test" {
  needs = "lint"
  uses = "actions/npm@master"
  args = "test"
}

action "build" {
  needs = "test"
  uses = "actions/npm@master"
  args = "install"
}

action "tag" {
  needs = "build"
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "publish" {
  needs = "tag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_ACCESS_TOKEN"]
}
