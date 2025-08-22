import Alpine from "&js/alpine";
import ServerSentEventsListener from "&js/sse-listener";

const listener = new ServerSentEventsListener("/lookbook/events");

listener.on("update", (detail) => {
  const event = new CustomEvent("fetch-update", { detail });
  window.dispatchEvent(event);
});

listener.start();
Alpine.start();
