import { log } from './logger.js'

/**
 * Generate the cli help
 * @param   {Object} optionator - optionator instance
 * @returns {string} help string
 */
export default function help(optionator) {
  const help = optionator.generateHelp()
  log(help)
  return help
}
