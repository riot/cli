# Command line paths
KARMA = ./node_modules/karma/bin/karma
ISTANBUL = ./node_modules/karma-coverage/node_modules/.bin/istanbul
ESLINT = ./node_modules/eslint/bin/eslint.js
MOCHA = ./node_modules/mocha/bin/_mocha
COVERALLS = ./node_modules/coveralls/bin/coveralls.js
CLI_OUTPUT_FOLDER = test/fixtures
CLI_PATH = ./lib/index.js

test: eslint test-karma

eslint:
	# check code style
	@ $(ESLINT) -c ./.eslintrc lib

test-cli:
	mkdir -p $(CLI_OUTPUT_FOLDER)
	$(CLI_PATH) > $(CLI_OUTPUT_FOLDER)/empty.log
	$(CLI_PATH) --silent > $(CLI_OUTPUT_FOLDER)/silent.log
	$(CLI_PATH) -h > $(CLI_OUTPUT_FOLDER)/help.log
	$(CLI_PATH) -v > $(CLI_OUTPUT_FOLDER)/version.log
	$(CLI_PATH) test/tags > $(CLI_OUTPUT_FOLDER)/folder-no-file.log
	$(CLI_PATH) test/tags --ext html > $(CLI_OUTPUT_FOLDER)/folder-ext.log
	$(CLI_PATH) test/tags test/expected/cmp.js > $(CLI_OUTPUT_FOLDER)/folder-and-file.log
	$(CLI_PATH) test/tags/component.tag test/expected/component.js > $(CLI_OUTPUT_FOLDER)/file-and-file.log
	$(CLI_PATH) test/tags test/expected/component-jade.js --ext jade --template jade --type coffee > $(CLI_OUTPUT_FOLDER)/parsers.log

test-karma:
	@ $(KARMA) start test/karma.conf.js

test-coveralls:
	@ RIOT_COV=1 cat ./coverage/lcov.info ./coverage/report-lcov/lcov.info | $(COVERALLS)


.PHONY: test eslint test-karma test-coveralls
