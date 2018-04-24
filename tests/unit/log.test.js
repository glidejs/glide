import { warn } from '../../src/utils/log'

describe('Warn should', () => {
  test('log an error to the console with suffix', () => {
    let fn = jest.fn()
    let msg = 'Message content'

    global.console = { error: fn }

    warn(msg)

    expect(fn).toHaveBeenCalledWith(`[Glide warn]: ${msg}`)
  })
})
