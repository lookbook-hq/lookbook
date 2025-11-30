export class Logger {
  protected scope: string | null;
  protected scopeName: string | null;

  constructor(scope: string | null = null) {
    this.scope = scope;
    this.scopeName = scope !== null ? `${scope.charAt(0).toUpperCase()}${scope.slice(1)}` : null;
  }

  log(...args: Array<any>) {
    return console.log(...this._buildArgs("log", args));
  }

  info(...args: Array<any>) {
    return console.info(...this._buildArgs("info", args));
  }

  debug(...args: Array<any>) {
    return console.debug(...this._buildArgs("debug", args));
  }

  warn(...args: Array<any>) {
    return console.warn(...this._buildArgs("warn", args));
  }

  error(...args: Array<any>) {
    return console.error(...this._buildArgs("error", args));
  }

  _buildArgs(level: string, args: Array<any>) {
    return [`(lookbook/${this.scope})`, ...args];
  }
}
