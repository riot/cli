import { defineConfig, globalIgnores } from 'eslint/config'
import riotEslintConfig from 'eslint-config-riot'

export default defineConfig([
  globalIgnores(['test/generated/*', 'test/fixtures/*', 'cli.cjs', 'cli.js']),
  { extends: [riotEslintConfig] },
])
