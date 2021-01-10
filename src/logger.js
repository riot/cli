import chalk from 'chalk'
import compose from 'cumpa'

export const log = console.log // eslint-disable-line
export const logError = compose(console.error, chalk.red)
export const trace = console.trace
export const info = compose(console.info, chalk.cyan)
export const panic = error => {
  logError('A critical error occurred')

  if (process.env.BUILD === 'production') {
    trace(error)
    process.exit(1)
  } else {
    throw error
  }
}
