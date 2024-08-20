import { describe, expect, vi, it } from 'vitest'

import { BaseAdapter } from '../BaseAdapter'
import type { BaseAdapterOptions } from '../BaseAdapter'
import { mockLogger } from '../../../core/__tests__/mocks'

interface TestAdapterOptions extends BaseAdapterOptions {
  foo: string
}

class TestAdapter extends BaseAdapter<TestAdapterOptions> {
  schedule() {}
  find() {
    return undefined
  }
  success() {}
  error() {}
  failure() {}
  clear() {}
}

describe('constructor', () => {
  it('saves options', () => {
    const adapter = new TestAdapter({ foo: 'bar' })

    expect(adapter.options.foo).toEqual('bar')
  })

  it('creates a separate instance var for any logger', () => {
    const adapter = new TestAdapter({ foo: 'bar', logger: mockLogger })

    expect(adapter.logger).toEqual(mockLogger)
  })
})
