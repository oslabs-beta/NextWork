

// write frontend logic here


// write Chrome extension logic
chrome.devtools.panels.create(
       
    );
    
    chrome.devtools.network.onNavigated.addListener((url) => {
      
    });
    chrome.devtools.network.onRequestFinished.addListener((request) => {
      // add Nextwork logic here?
      // send data to frontend
    });


let youClickedOn;

chrome.devtools.panels.create("NextWork", "logo.jpeg", "panel.html", panel => {
  // code invoked on panel creation
  panel.onShown.addListener(extPanelWindow => {
    let sayHello = extPanelWindow.document.querySelector("#sayHello");
    youClickedOn = extPanelWindow.document.querySelector("#youClickedOn");
    sayHello.addEventListener("click", () => {
      // show a greeting alert in the inspected page
      chrome.devtools.inspectedWindow.eval(
        'alert("Hello from the NextWork Extension");'
      );
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Messages from content scripts should have sender.tab set
  console.log('request.type', request.type);
  if (sender.tab && request.click == true) {
    if (youClickedOn) {
      youClickedOn.innerHTML = `You clicked on position (${request.xPosition}, ${request.yPosition}) in the inspected page.`;
    }
    sendResponse({
      xPosition: request.xPosition,
      yPosition: request.yPosition,
    });
  }
});

// Create a connection to the background service worker
const backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page",
});

// Relay the tab ID to the background service worker
backgroundPageConnection.postMessage({
  name: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
});
