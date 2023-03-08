// logic to make sure that the correct panel data is served to its respective tab

// attach, store, update frontend props if tab is refreshed

// remove tab-related information if tab is closed

let id = null;
const connections = {};

chrome.runtime.onConnect.addListener(devToolsConnection => {
  // Assign the listener function to a variable so we can remove it later
  let devToolsListener = (message, sender, sendResponse) => {
    if (message.name == "init") {
      id = message.tabId;
      console.log("id", id);
      connections[id] = devToolsConnection;
      // Send a message back to DevTools
      connections[id].postMessage("Connected!");
    }
  };

  // Listen to messages sent from the DevTools page
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(() => {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});
