// workaround for https://github.com/eslint/eslint/discussions/15305
import { readFileSync } from 'node:fs'
export default JSON.parse(readFileSync('./package.json'))
