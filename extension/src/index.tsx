import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
//import css

let youClickedOn;
let dataContainer;
let harTable;

chrome.devtools.panels.create("NextWork", null, "panel.html", (panel) => {
  // code invoked on panel creation
  panel.onShown.addListener((extPanelWindow) => {
    dataContainer = extPanelWindow.document.querySelector("#data");
    harTable = extPanelWindow.document.querySelector(".har-table");
    const container = extPanelWindow.document.getElementById("root");
    const root = createRoot(container);

    root.render(<App />);
  });
});

const appendHar = (data) => {
  // console.log("harTable", harTable);
  // let harTableHead = harTable ? harTable.querySelector("thead") : null;
  // if (!harTable) {
  //   harTable = document.createElement("table");
  //   harTable.classList.add("har-table");
  //   harTableHead = document.createElement("thead");
  //   const headRow = document.createElement("tr");
  //   const urlHeader = document.createElement("th");
  //   urlHeader.innerText = "URL";
  //   const methodHeader = document.createElement("th");
  //   methodHeader.innerText = "Method";
  //   const statusHeader = document.createElement("th");
  //   statusHeader.innerText = "Status";
  //   const sizeHeader = document.createElement("th");
  //   sizeHeader.innerText = "Size";
  //   headRow.append(urlHeader, methodHeader, statusHeader, sizeHeader);
  //   harTableHead.append(headRow);
  //   harTable.append(harTableHead);
  // }
  // let row = document.createElement("tr");
  // let url = document.createElement("td");
  // url.innerText = data.request.url;
  // let method = document.createElement("td");
  // method.innerText = data.request.method;
  // let status = document.createElement("td");
  // status.innerText = data.response.status;
  // let size = document.createElement("td");
  // size.innerText = data.response.bodySize;
  // row.append(url, method, status, size);
  // harTableHead.append(row);
  // return harTable;
};

// Create a connection to the background service worker
const backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page",
});

// Relay the tab ID to the background service worker
console.log("about to post message from devtools.js");
backgroundPageConnection.postMessage({
  name: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
});
