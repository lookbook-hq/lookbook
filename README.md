# Lookbook

_WIP monorepo setup for Lookbook v4 development._

## Development

[Mise](https://mise.jdx.dev) is used to manage tool versions and run tasks across this monorepo.

Mise monorepo tasks support is still experimental and so requires the `MISE_EXPERIMENTAL=1` environment variable to be set when running any mise tasks.
See the [Mise monorepo docs](https://mise.jdx.dev/tasks/monorepo.html) for more details.

### Start the dev app 🛠️

Runs the dev app (`apps/dev`), loading Lookbook gems locally from the `gems` directory.

```shell
mise dev
```

### Start the doc site app 🔍

Runs the docs site app (`apps/docs`), loading Lookbook gems locally from the `gems` directory.

```shell
mise docs
```
