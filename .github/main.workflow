workflow "Build on push" {
  resolves = ["lint", "test", "build"]
  on = "push"
}

workflow "Publish on release" {
  resolves = ["publish"]
  on = "release"
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

action "tag" {
  needs = ["lint", "test", "build"]
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "tag"
}

action "publish" {
  needs = "tag"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "publish --access public"
  secrets = ["NPM_ACCESS_TOKEN"]
}
