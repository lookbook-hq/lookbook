import Logger from "./logger";

export default class ServerEventsListener {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.source = null;
    this.handlers = [];
    this.$logger = new Logger("EventsListener");

    addEventListener("visibilitychange", () => {
      document.hidden ? this.stop() : this.start();
    });
  }

  start() {
    if (!this.source) {
      this.$logger.debug(`Starting`);
      this.source = this.initSource();
    }
  }

  stop() {
    if (this.source) {
      this.source.close();
      this.source = null;
    }
    this.$logger.debug(`Stopped`);
  }

  on(type, callback) {
    this.handlers.push({ type, callback });
  }

  initSource() {
    const source = new EventSource(this.endpoint);

    source.addEventListener("open", () => {
      this.$logger.debug(`Connected to '${this.endpoint}'`);
    });

    source.addEventListener("event", (event) => {
      const data = JSON.parse(event.data);
      this.handlers.forEach((handler) => {
        if (data.type === handler.type) {
          handler.callback.call(null, data);
        }
      });
    });

    source.addEventListener("error", () => {
      this.$logger.warn(`Event source error`);
      this.stop();
    });

    window.onbeforeunload = () => this.stop();

    return source;
  }
}
