let youClickedOn;
let dataContainer;
let harTable;

chrome.devtools.panels.create('NextWork', 'logo.jpeg', './src/panel.html', (panel) => {
  // code invoked on panel creation
  panel.onShown.addListener((extPanelWindow) => {
    // let sayHello = extPanelWindow.document.querySelector('#sayHello');
    // youClickedOn = extPanelWindow.document.querySelector('#youClickedOn');
    dataContainer = extPanelWindow.document.querySelector('#data');
    harTable = extPanelWindow.document.querySelector('.har-table');
    // sayHello.addEventListener('click', () => {
    //   // show a greeting alert in the inspected page
    //   chrome.devtools.inspectedWindow.eval('alert("Hello from the NextWork Extension");');
    // });
  });
});

const appendHar = (data) => {
  console.log('harTable', harTable);
  let harTableHead = harTable ? harTable.querySelector('thead') : null;

  if (!harTable) {
    harTable = document.createElement('table');
    harTable.classList.add('har-table');
    harTableHead = document.createElement('thead');
    const headRow = document.createElement('tr');

    const urlHeader = document.createElement('th');
    urlHeader.innerText = 'URL';
    const methodHeader = document.createElement('th');
    methodHeader.innerText = 'Method';
    const statusHeader = document.createElement('th');
    statusHeader.innerText = 'Status';
    const sizeHeader = document.createElement('th');
    sizeHeader.innerText = 'Size';

    headRow.append(urlHeader, methodHeader, statusHeader, sizeHeader);
    harTableHead.append(headRow);
    harTable.append(harTableHead);
  }

  let row = document.createElement('tr');
  let url = document.createElement('td');
  url.innerText = data.request.url;
  let method = document.createElement('td');
  method.innerText = data.request.method;
  let status = document.createElement('td');
  status.innerText = data.response.status;
  let size = document.createElement('td');
  size.innerText = data.response.bodySize;

  row.append(url, method, status, size);
  harTableHead.append(row);

  return harTable;
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // if (message.data) {
  //   console.log('Received message from service worker:', message.data);
  //   // dataContainer.innerHTML = `${message.data}`;

  if (message.data) {
    console.log('Received message from service worker:', message.data);

    dataContainer.append(appendHar(JSON.parse(message.data)));
  }

  // Messages from content scripts should have sender.tab set
  // if (sender.tab && message.click == true) {
  //   if (youClickedOn) {
  //     // console.log("panels:", chrome.devtools.panels);
  //     youClickedOn.innerHTML = `You clicked on position (${message.xPosition}, ${message.yPosition}) in the inspected page.`;
  //   }
  //   sendResponse({
  //     xPosition: message.xPosition,
  //     yPosition: message.yPosition,
  //   });
  // }
});

// Create a connection to the background service worker
const backgroundPageConnection = chrome.runtime.connect({
  name: 'devtools-page',
});

// Relay the tab ID to the background service worker
console.log('about to post message from devtools.js');
backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});
