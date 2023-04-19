let id = null;
const connections = {};

chrome.runtime.onConnect.addListener((devToolsConnection) => {
  // Assign the listener function to a variable so we can remove it later
  let devToolsListener = (message, sender, sendResponse) => {
    if (message.name == 'init') {
      id = message.tabId;
      connections[id] = devToolsConnection;
      // Send a message back to DevTools
      console.log('one line above connections[id].postMessage("Connected!")');
      connections[id].postMessage('Connected!');
    }
  };

  // Listen to messages sent from the DevTools page
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(() => {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});

var source = new EventSource('http://localhost:3001/stream');
source.addEventListener(
  'open',
  function (e) {
    // send the information to the panel
    connections[id].postMessage({
      name: 'init',
      tabId: id,
    });
    console.log('Connection to the server established');
  },
  false
);

source.onmessage = function (e) {
  console.log('Received message from server: ', e.data);
  // send the information to the panel
  connections[id].postMessage({
    name: 'init',
    tabId: id,
  });

  chrome.runtime.sendMessage({ data: e.data, log: e.log });
  // document.getElementById("content").innerHTML += e.data + "<br/>";
};
