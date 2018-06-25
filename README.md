# express-registry

## Description

Express-based mini-framework that let you focus on your application components
and avoid express boilerplates.
You register your config, librairies and utils in a global singleton registry.
Then you can register your middlewares and routes.
If you need to make components share informations or communicate, you can use
the registry which is an event-emitter.

## Usage

```bash
git clone git@github.com:chipp972/node-typescript-starter.git myProject
cd myProject
rm -rf .git
git init
npm i
```

Then you should modify the **package.json** and **README.md** with your project informations.

## Contribution

Use with `npm run <command>`

* `clean` - remove generated files
* `format` - format all `ts` files
* `lint` - lint source and tests files
* `test` - format, lint, typecheck and run tests with mocha
* `test-only` - run just the tests
* `test:watch` - re-run tests everytime a file changes
* `build` - typecheck and compile source files
* `build:watch` - re-compile sources everytime a file changes
