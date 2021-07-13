import { createConsumer } from "@rails/actioncable";
import debounce from "debounce";

export default function (endpoint) {
  const uid = (Date.now() + ((Math.random() * 100) | 0)).toString();
  const consumer = createConsumer(`${endpoint}?uid=${uid}`);

  return {
    uid,
    consumer,
    start() {
      const received = debounce(() => {
        console.log("Lookbook files changed");
        document.dispatchEvent(new CustomEvent("refresh"));
      }, 300);

      consumer.subscriptions.create("Lookbook::ReloadChannel", {
        received,
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
