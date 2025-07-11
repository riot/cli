import chalk from 'chalk'
import compose from 'cumpa'

export const log = console.log
export const logError = compose(console.error, chalk.red)
export const trace = console.trace
export const info = compose(console.info, chalk.cyan)
export const panic = (error) => {
  logError('A critical error occurred')

  if (process.env.RIOT_CLI_IGNORE_EXIT_ERRORS) {
    throw error

    /* c8 ignore start */
  } else {
    trace(error)
    process.exit(1)
  }
  /* c8 ignore stop */
}
