
# ddb-backup

This project is a prototype for DynamoDB backup to S3 bucket


## How to use


## What are included


## Linting

```bash
gulp lint
```

Code that will be validated:

- all **\*.js** files in **src** folder
- all **\*.js** files in **test** folder
- **gulpfile.js**

## Running tests and generating code coverage report

```bash
gulp test
```

Test cases stored in files **test/\*\*/\*.test.js** will be run only

Coverage reports will be generated and stored in folder **build/coverage**

## Generating jsdoc

```bash
gulp jsdoc
```

Documentation will be generated for **\*.js** files from **src** folder and stored in folder **build/jsdoc**

## Compiling code - ES6 Support

Since **nodejs** doesn't fully support all ES6 features source code should be compiled.

```bash
gulp compile
```

Source code in **src** folder will be compiled and stored in folder **build/source**

## Running all tasks

```bash
gulp
# or
gulp build
```

## Pre-commit hook

This hook is invoked by **git commit**, and can be bypassed with **--no-verify** option.

The task **gulp build** will be run automatically.

## Printing all available tasks and theirs arguments

```bash
gulp help
```

## Directory Layout

```
  build/                  --> build results
    coverage              --> code coverage reports
    jsdoc                 --> documentation generated for source code
  src/                    --> source files for the application
    <source files>    
  test/                   --> test files for the application
    .eslintrc             --> configuration file for eslint; these rules
                              will be applied for files in this folder
                              only; created because test cases contain
                              global functions which exports by
                              mocha(describe, it, beforeEach, etc)
    <test files>          --> added just for an example
  .editorconfig           --> configuration file for code editors to keep style
  .eslintrc               --> configuration file for eslint
  gulpfile.js             --> list of all gulp tasks
```

