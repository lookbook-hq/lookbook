import { createConsumer } from "@rails/actioncable";
import debounce from "debounce";

export default function socket(endpoint) {
  const uid = (Date.now() + ((Math.random() * 100) | 0)).toString();
  const consumer = createConsumer(`${endpoint}?uid=${uid}`);
  return {
    addListener(channel, callback) {
      consumer.subscriptions.create(channel, {
        received: debounce((data) => {
          console.log("Lookbook files changed");
          callback(data);
        }, 200),
        connected() {
          console.log("Lookbook websocket connected");
        },
        disconnected() {
          console.log("Lookbook websocket disconnected");
        },
      });
    },
  };
}
