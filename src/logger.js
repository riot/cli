import chalk from 'chalk'
import compose from 'cumpa'

export const log = console.log // eslint-disable-line
export const logError = compose(console.error, chalk.red)
export const trace = console.trace
export const info = compose(console.info, chalk.cyan)
export const panic = error => {
  logError('A critical error occurred')

  if (process.env.RIOT_CLI_IGNORE_EXIT_ERRORS) {
    throw error
  } else {
    trace(error)
    process.exit(1)
  }
}
