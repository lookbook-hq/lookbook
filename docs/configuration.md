## Lookbook Configuration

Lookbook will use the ViewComponent [configuration](https://viewcomponent.org/api.html#configuration) for your project to find and render your previews so you generally you won't need to configure much else separately.

However the following Lookbook-specific configuration options are also available:

### UI auto-refresh

> ⚠️ UI auto-refresh is only supported in Rails v6.0+

Disable/enable the auto-updating of the Lookbook UI when files change. Enabled by default.

```ruby
config.lookbook.auto_refresh = false # default is true
```

By default Lookbook will listen for changes in any [preview directories](https://viewcomponent.org/api.html#preview_paths) as well as in the [components directory](config.view_component.preview_paths) itself.

If you wish to add additional paths to listen for changes in, you can use the `listen_paths` option:

```ruby
config.lookbook.listen_paths << Rails.root.join('app/other/directory')
```

### Custom favicon

If you want to change the favicon used by the Lookbook UI, you can provide a path to your own (or a data-uri string) using the `ui_favicon` option:

```ruby
config.lookbook.ui_favicon = '/path/to/my/favicon.png'
```

> To disable the favicon entirely, set the value to `false`.

### Project name

Specify a project name to display in the top left of the UI (instead of the default "Lookbook"):

```ruby
config.lookbook.project_name = 'My Project'
```

> If you don't want to display a project name at all, set the value to `false`.

<h3 id="experimental-features">Experimental features opt-in</h3>

Some features may occasionally be released behind a 'experimental' feature flag while they are being tested and refined, to allow people to try them out and provide feedback.

> ⚠️ **Please note:** Experimental features should be considered to be **subject to extensive change** and breaking changes to them may be made within point releases - these features are **not** considered to be covered by [semver](https://semver.org/) whilst flagged as 'experimental'. ⚠️

#### Opting into specific features (recommended)

To opt into individual experimental features, include the name of the feature in the `experimental_features` config option:

```ruby
config.lookbook.experimental_features = %w[feature_name]
```

> There are currently no experimental features that can be opted into.

#### Opting into all experimental features (not recommended!)

If you want to live life on the bleeding-edge you can opt-in to all current **and future** experimental features (usual caveats apply):

```ruby
config.lookbook.experimental_features = true
```

