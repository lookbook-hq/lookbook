<div align="center">
<br>
<p><a href="https://lookbook.build"><img src=".github/assets/lookbook_logo.svg" width="240"></a></p>

<p>A UI development environment for Ruby on Rails applications.</p>

</div>

---

<div align="center">
🚨 This is the work-in-progress <strong>v3 development</strong> branch 🚨 
</div>

---

## Requirements

* Ruby >= 3.0.0
* Rails >= 6.1.0

## Testing

Run the tests:

```
bin/rails test
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