workflow "Publish on release" {
  resolves = ["publish"]
  on = "release"
}

action "lint" {
  uses = "actions/npm@master"
  args = "lint"
}

action "test" {
  uses = "actions/npm@master"
  args = "test"
}

action "build" {
  uses = "actions/npm@master"
  args = "install"
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
