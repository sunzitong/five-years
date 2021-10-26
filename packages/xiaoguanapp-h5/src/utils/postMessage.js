const postMessage = (body) => {
  const winWebkit = window.webkit;
  if (window.GYWebViewBridge) {
    window.GYWebViewBridge.postMessage(body);
  } else if (winWebkit && winWebkit.messageHandlers && winWebkit.messageHandlers.GYWebViewBridge) {
    winWebkit.messageHandlers.GYWebViewBridge.postMessage(body);
  }
};

export default postMessage;
