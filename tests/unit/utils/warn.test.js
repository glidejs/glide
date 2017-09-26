import warn from '../../../src/utils/warn'

describe('Warn should', () => {
  test('log an error to console', () => {
    let fn = jest.fn()
    let msg = 'Message content'

    global.console = { error: fn }

    warn(msg)

    expect(fn).toHaveBeenCalledWith(`[Glide warn]: ${msg}`)
  })
})