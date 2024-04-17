<img src=".github/assets/lookbook_logo.svg" width="240">

<hr>

## Lookbook v3.0 development branch

Work-in-progress, exploratory rebuild of Lookbook for a future v3.0 release.

### Key goals:

#### UI

* Remove ViewComponent as a dependency, use bespoke component system to build UI (to avoid VC version incompatabilities with parent app)
* Use vanilla CSS instead of Tailwind
* Better theming system using CSS variables
* Improve accessibilty

#### Previews

* Improve previews of partials/views, ensure they are 100% compatible with how they are used in parent app
* Add support for Mailer previews

#### Development/Testing

* Include runnable test/demo/development app in codebase
* Make dev setup simpler
* Use Minitest
* Run tests against demo app
* Ensure good integration test coverage
* Make logging play nicer with standard Rails logging options and third party gems

#### Other

* Remove ActionCable requirement, use SSE for live UI updates in dev
* Improve error handling and compatability with `better_errors` etc
* Improve clarity and readability of codebase
* Drop support for older Ruby/Rails versions

## Requirements

* Ruby >= 3.0.0
* Rails >= 6.1.0

## Usage

### Installation

```rb
group :development do
  gem "lookbook", github: "ViewComponent/lookbook", branch: "v3"
  gem "listen" # Optional but enables live UI updates
end
```

Lookbook will automatically be mounted at `/lookbook` within your app.

### Configuration

Current configuration options are not documented yet but can be seen in the [config.rb](lib/lookbook/config.rb) file.

## Development

### Demo app

Start the demo app in development mode:

```
bin/dev
```

Visit http://localhost:4444/lookbook

### Testing

Integration tests run against the demo app.

Run the tests:

```
bin/test
```

## Logging and Debugging

`Lookbook` logs its activity to `Lookbook.logger`.
This is the primary method of debugging.

### Custom Logger

You can call `Lookbook.logger =` to set a custom `Lookbook` logger for the process. For example:

```
Lookbook.logger = Rails.logger
```

### Default Logger

If no custom logger is set, a default `Lookbook` logger which logs to to `STDERR` will be created and assigned to `Lookbook.logger`.

The default logger defaults to the `error` logging level (severity).
You can override the logging level by setting the environment variable `LOOKBOOK_LOG_LEVEL=<level>`.
For `<level>`, all standard `::Logger` levels are supported, with any mix of upper-/lower-case:

```
export LOOKBOOK_LOG_LEVEL=debug
export LOOKBOOK_LOG_LEVEL=info
export LOOKBOOK_LOG_LEVEL=warn
export LOOKBOOK_LOG_LEVEL=fatal
export LOOKBOOK_LOG_LEVEL=error
```

The default of `error` will be used if an unsupported value is set.

### Disabling Logging

If you want to disable `Lookbook` logging, set

```
Lookbook.logger = ::Logger.new('/dev/null')
```

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).