import { createConsumer } from "@rails/actioncable";
import debounce from "debounce";
import { log } from "../plugins/logger";

export default function socket(endpoint) {
  const uid = (Date.now() + ((Math.random() * 100) | 0)).toString();
  const consumer = createConsumer(`${endpoint}?uid=${uid}`);
  return {
    addListener(channel, callback) {
      consumer.subscriptions.create(channel, {
        received: debounce((data) => {
          log.debug("Lookbook files changed");
          callback(data);
        }, 200),
        connected() {
          log.info("Lookbook websocket connected");
        },
        disconnected() {
          log.info("Lookbook websocket disconnected");
        },
      });
    },
  };
}
