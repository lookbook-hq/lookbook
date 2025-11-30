const getHost = () => `${window.location.protocol}\/\/${window.location.host}`;

export interface MessageInterface {
  data?: object;
  target?: Window;
}

export function dispatchMessage(type = "message", options: MessageInterface = {}) {
  const data = options.data || {};
  const target = options.target || window.parent;

  data.source = window.location.href;

  target.postMessage({ type, data }, getHost());
}

export function handleMessage(event, type, handler: Function) {
  if (event.origin !== getHost()) {
    console.error(`Unknown message origin '${event.origin}'`, getHost());
    return;
  }

  if (event.data.type === type) {
    handler(event.data.data);
  }
}

// export function addMessageListener(type, handler: Function) {
//   const messageHandler = (event) => {
//     if (event.origin !== getHost()) {
//       console.error(`Unknown message origin '${event.origin}'`, getHost());
//       return;
//     }

//     if (event.data.type === type) {
//       handler(event.data.data);
//     }
//   };

//   window.addEventListener("message", messageHandler);

//   return () => window.removeEventListener("message", messageHandler);
// }
