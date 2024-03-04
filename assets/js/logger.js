export default class Logger {
  constructor(scope = null) {
    this.scope = scope
      ? `${scope.charAt(0).toUpperCase()}${scope.slice(1)}`
      : null;
  }

  log(...args) {
    return console.log(...this._buildArgs("log", args));
  }

  info(...args) {
    return console.info(...this._buildArgs("info", args));
  }

  debug(...args) {
    return console.debug(...this._buildArgs("debug", args));
  }

  warn(...args) {
    return console.warn(...this._buildArgs("warn", args));
  }

  error(...args) {
    return console.error(...this._buildArgs("error", args));
  }

  _buildArgs(level, args) {
    let prefix = "Lookbook";
    if (this.scope) {
      prefix += ` [${this.scope}]`;
    }
    return [prefix, ...args];
  }
}
