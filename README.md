# Lookbook

_WIP monorepo setup for Lookbook v4 development._

## Development

[Mise](https://mise.jdx.dev) is used to manage tool versions and run tasks across this monorepo. Process management is handled by [Pitchfork](https://pitchfork.jdx.dev).

> _The `apps/dev` and `apps/docs` Rails apps are configured to use the local version of all Lookbook gems whilst in development._

### Install dependencies

```shell
mise setup
```

### Start the dev app 🛠️

```shell
mise dev
```

### Start the docs/demo app 🔍

```shell
mise docs
```

### Stop all daemons

```shell
mise stop
```
