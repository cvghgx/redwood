import console from 'node:console'
import path from 'node:path'

import fg from 'fast-glob'

import { registerApiSideBabelHook } from '@redwoodjs/babel-config'
import { getPaths } from '@redwoodjs/project-config'

import { AdapterNotFoundError, JobsLibNotFoundError } from '../core/errors'

// TODO Don't use this in production, import from dist directly
registerApiSideBabelHook()

export const loadAdapter = async () => {
  if (getPaths().api.jobs) {
    const { default: jobsModule } = await import(getPaths().api.jobs)
    if (jobsModule.adapter) {
      return jobsModule.adapter
    } else {
      throw new AdapterNotFoundError()
    }
  } else {
    throw new JobsLibNotFoundError()
  }
}

export const loadLogger = async () => {
  try {
    const { default: loggerModule } = await import(getPaths().api.logger)
    return loggerModule.logger
  } catch (e) {
    // import didn't work for whatever reason, fall back to console
    return console
  }
}
