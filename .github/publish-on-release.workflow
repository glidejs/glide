workflow "Publish on release" {
  resolves = ["publish"]
  on = "release"
}

action "lint" {
  needs = "Lint"
  uses = "actions/npm@master"
  args = "lint"
}

action "test" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "test"
}

action "build" {
  uses = "actions/npm@master"
  args = "install"
}

action "tag" {
  needs = "Test"
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "publish" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_ACCESS_TOKEN"]
}
