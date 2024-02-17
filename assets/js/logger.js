export default class Logger {
  log(...args) {
    return console.log(...this._buildArgs(args));
  }

  info(...args) {
    return console.info(...this._buildArgs(args));
  }

  debug(...args) {
    return console.debug(...this._buildArgs(args));
  }

  warn(...args) {
    return console.warn(...this._buildArgs(args));
  }

  error(...args) {
    return console.error(...this._buildArgs(args));
  }

  _buildArgs(args) {
    return ["[LOOKBOOK]", ...args];
  }
}
