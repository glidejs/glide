import html from '../fixtures/html'
import { query } from '../fixtures/query'
import { afterTransition } from '../fixtures/transition'

import Glide from '../../entry/entry-complete'

describe("Event's callbacks on", () => {
  beforeEach(() => {
    document.body.innerHTML = html
  })

  test('passed as array should be called only once', () => {
    const glide = new Glide('#glide')

    let callback = jest.fn()

    glide.on(['mount.before'], callback)

    glide.mount()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('`mount.*` should be called', () => {
    const glide = new Glide('#glide')

    let beforeCallback = jest.fn()
    let afterCallback = jest.fn()

    glide.on('mount.before', beforeCallback)
    glide.on('mount.after', afterCallback)

    glide.mount()

    expect(beforeCallback).toHaveBeenCalled()
    expect(afterCallback).toHaveBeenCalled()
  })

  test('`update` should be called', () => {
    const glide = new Glide('#glide')

    let updateCallback = jest.fn()

    glide.on('update', updateCallback)

    glide.mount().update()

    expect(updateCallback).toHaveBeenCalled()
  })

  test('`play` should be called', () => {
    const glide = new Glide('#glide')

    let playCallback = jest.fn()

    glide.on('play', playCallback)

    glide.mount().play()

    expect(playCallback).toHaveBeenCalled()
  })

  test('`pause` should be called', () => {
    const glide = new Glide('#glide')

    let pauseCallback = jest.fn()

    glide.on('pause', pauseCallback)

    glide.mount().pause()

    expect(pauseCallback).toHaveBeenCalled()
  })

  test('`build.*` should be called', () => {
    const glide = new Glide('#glide')

    let beforeCallback = jest.fn()
    let afterCallback = jest.fn()

    glide.on('build.before', beforeCallback)
    glide.on('build.after', afterCallback)

    glide.mount()

    expect(beforeCallback).toHaveBeenCalled()
    expect(afterCallback).toHaveBeenCalled()
  })

  test('`run` should be called with `move` parameter', () => {
    const glide = new Glide('#glide')

    let move = { direction: '=', steps: 1 }
    let runCallback = jest.fn()

    glide.on('run', runCallback)

    glide.mount().go('=1')

    expect(runCallback).toBeCalledWith(move)
  })

  test('`run.before` should be called with `move` parameter', () => {
    const glide = new Glide('#glide')

    let move = { direction: '=', steps: 1 }
    let beforeCallback = jest.fn()

    glide.on('run.before', beforeCallback)

    glide.mount().go('=1')

    expect(beforeCallback).toBeCalledWith(move)
  })

  test('`run.after` should be called with `move` parameter', (done) => {
    const glide = new Glide('#glide')

    let move = { direction: '=', steps: 1 }
    let afterCallback = jest.fn()

    glide.on('run.after', afterCallback)

    glide.mount().go('=1')

    expect(afterCallback).not.toBeCalled()
    afterTransition(() => {
      expect(afterCallback).toBeCalledWith(move)

      done()
    })
  })

  test('`run.offset` should be called with `move` parameter when changing slide from first to the last one', (done) => {
    const glide = new Glide('#glide', { startAt: 0, loop: true })

    let move = { direction: '<', steps: 0 }
    let offsetCallback = jest.fn()

    glide.on('run.offset', offsetCallback)

    glide.mount().go('<')

    expect(offsetCallback).not.toBeCalled()
    afterTransition(() => {
      expect(offsetCallback).toBeCalledWith(move)

      done()
    })
  })

  test('`run.offset` should be called with `move` parameter when changing slide from last to the first one', (done) => {
    const { slides } = query(document)
    const glide = new Glide('#glide', { startAt: slides.length - 1, loop: true })

    let move = { direction: '>', steps: 0 }
    let offsetCallback = jest.fn()

    glide.on('run.offset', offsetCallback)

    glide.mount().go('>')

    expect(offsetCallback).not.toBeCalled()
    afterTransition(() => {
      expect(offsetCallback).toBeCalledWith(move)

      done()
    })
  })

  test('`run.start` should be called with `move` parameter when changing to the first slide', (done) => {
    const glide = new Glide('#glide', { startAt: 1 })

    let move = { direction: '<', steps: '<' }
    let startCallback = jest.fn()

    glide.on('run.start', startCallback)

    glide.mount().go('<<')

    expect(startCallback).not.toBeCalled()
    afterTransition(() => {
      expect(startCallback).toBeCalledWith(move)

      done()
    })
  })

  test('`run.end` should be called with `move` parameter when changing to the first slide', (done) => {
    const glide = new Glide('#glide', { startAt: 1 })

    let move = { direction: '>', steps: '>' }
    let endCallback = jest.fn()

    glide.on('run.end', endCallback)

    glide.mount().go('>>')

    expect(endCallback).not.toBeCalled()
    afterTransition(() => {
      expect(endCallback).toBeCalledWith(move)

      done()
    })
  })

  test('`autoplay` should be called on each autoplay slide change', (done) => {
    const glide = new Glide('#glide', { autoplay: 50 })

    let autoplayCallback = jest.fn()

    glide.on('autoplay', autoplayCallback)

    glide.mount()

    expect(autoplayCallback).not.toBeCalled()
    setTimeout(() => {
      expect(autoplayCallback).toHaveBeenCalledTimes(2)

      done()
    }, 110)
  })

  test('`translate.jump` should be called when making a loop change', (done) => {
    const glide = new Glide('#glide', { startAt: 0, loop: true })

    let jumpCallback = jest.fn()

    glide.on('translate.jump', jumpCallback)

    glide.mount().go('<')

    expect(jumpCallback).not.toBeCalled()
    afterTransition(() => {
      expect(jumpCallback).toBeCalled()

      done()
    })
  })

  test('`translate.jump` should be called when making a loop change', (done) => {
    const { slides } = query(document)
    const glide = new Glide('#glide', { startAt: slides.length - 1, loop: true })

    let jumpCallback = jest.fn()

    glide.on('translate.jump', jumpCallback)

    glide.mount().go('>')

    expect(jumpCallback).not.toBeCalled()
    afterTransition(() => {
      expect(jumpCallback).toBeCalled()

      done()
    })
  })
})
