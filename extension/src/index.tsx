import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

chrome.devtools.panels.create('NextWork', null, 'panel.html', (panel) => {
  // code invoked on panel creation
  panel.onShown.addListener((extPanelWindow) => {
    const container = extPanelWindow.document.getElementById('root');
    const root = createRoot(container);

    root.render(<App />);
  });
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
