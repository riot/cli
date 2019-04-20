import chalk from 'chalk'
import compose from 'cumpa'

export const log = console.log // eslint-disable-line
export const logError = compose(log, chalk.red)
export const info = compose(log, chalk.cyan)