export class ServerEventsListener {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.source = null;
    this.broadcastChannel = this.initBroadCastChannel();
    this.handlers = [];

    window.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  start() {
    if (!this.source) {
      this.source = this.initSource();
      this.broadcastStart();
    }
  }

  stop() {
    if (this.source) {
      this.source.close();
      this.source = null;
    }
  }

  on(type, callback) {
    this.handlers.push({ type, callback });
  }

  initSource() {
    const source = new EventSource(this.endpoint);

    source.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      this.broadcastChannel.postMessage(JSON.stringify(data));
      this.handlers.forEach((handler) => {
        if (data.type === handler.type) {
          handler.callback.call(null, data);
        }
      });
    });

    source.addEventListener("error", () => {
      console.error(`Event source error`);
      this.stop();
    });

    window.onbeforeunload = () => this.stop();

    return source;
  }

  initBroadCastChannel() {
    const bc = new BroadcastChannel("lookbook_events");

    bc.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      this.handlers.forEach((handler) => {
        if (data.type === handler.type) {
          handler.callback.call(null, data);
        }
      });
    });

    return bc;
  }

  broadcastStart() {
    this.broadcastChannel.postMessage(
      JSON.stringify({ type: "event-source-start" })
    );
  }
}
