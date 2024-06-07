<img src=".github/assets/lookbook_logo.svg" width="240">

<hr>

## Lookbook v3.0 [development branch]

This branch contains a work-in-progress, exploratory, from-scratch rebuild of Lookbook, intended to form the basis of a future v3.0 release.

[Demo](#demo-site)  ・ [Documentation](#documentation)  ・ [Development](#development)

![CI status](https://github.com/lookbook-hq/lookbook/actions/workflows/ci.yml/badge.svg?branch=v3)

## Demo site

You can find a hosted version of the [demo/test app](#demo-app) here: https://v3-demo-app.lookbook.build/lookbook

This pulls directly from the `v3` development branch and so may occasionally be broken.

## Documentation

v3-specific documentation is still very much a work in progress. The pages below should provide enough information if you wish to install the latest alpha release and test out some of the new features.

* [Installing/Upgrading](./docs/alpha/01_usage.md)
* [New features](./docs/alpha/02_new_features.md)
* [Background and motivation](./docs/alpha/03_motivation.md)
* [Development status](./docs/alpha/08_status.md)
* [Troubleshooting/Known issues](./docs/alpha/09_troubleshooting.md)

## Development

### Demo app

The Lookbook v3 codebase includes a runnable dummy/demo app for development and testing purposes.

To run the app, clone the contents of the `v3` branch to your machine and then run the following commands from within the root directory:

```
bundle install
npm install
bin/dev
```

Visit http://localhost:4444/lookbook to view the Lookbook UI.

> In development mode assets will be rebuilt as changes are made but there is not yet any asset live-reloading in place.

### Testing

Run the tests:

```
bin/test
```

> Integration tests run against the demo app.

### Documentation site

Run the docs site locally in dev mode:

```
bin/docs
```

Visit http://localhost:4000 to view the docs. Not much to see there at the moment!

### Logging and debugging

`Lookbook` logs its activity to `Lookbook.logger`.
This is the primary method of debugging.

#### Custom logger

You can call `Lookbook.logger =` to set a custom `Lookbook` logger for the process. For example:

```rb
Lookbook.logger = Rails.logger
```

#### Default logger

If no custom logger is set, a default `Lookbook` logger which logs to to `STDERR` will be created and assigned to `Lookbook.logger`.

The default logger defaults to the `error` logging level (severity).
You can override the logging level by setting the environment variable `LOOKBOOK_LOG_LEVEL=<level>`.
For `<level>`, all standard `::Logger` levels are supported, with any mix of upper-/lower-case:

```bash
export LOOKBOOK_LOG_LEVEL=debug
export LOOKBOOK_LOG_LEVEL=info
export LOOKBOOK_LOG_LEVEL=warn
export LOOKBOOK_LOG_LEVEL=fatal
export LOOKBOOK_LOG_LEVEL=error
```

The default of `error` will be used if an unsupported value is set.

#### Disabling logging

If you want to disable `Lookbook` logging, set

```rb
Lookbook.logger = ::Logger.new('/dev/null')
```

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).