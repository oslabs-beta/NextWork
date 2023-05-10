(function () {
	'use strict';

	let n=null;const s={};chrome.runtime.onConnect.addListener(e=>{let t=(o,i,d)=>{o.name=="init"&&(n=o.tabId,s[n]=e,console.log('one line above connections[id].postMessage("Connected!")'),s[n].postMessage("Connected!"));};e.onMessage.addListener(t),e.onDisconnect.addListener(()=>{e.onMessage.removeListener(t);});});var a=new EventSource("http://localhost:3001/stream");a.addEventListener("open",function(e){s[n].postMessage({name:"init",tabId:n}),console.log("Connection to the server established");},!1);a.onmessage=function(e){console.log("Received message from server: ",e.data),s[n].postMessage({name:"init",tabId:n}),chrome.runtime.sendMessage({data:e.data,log:e.log});};

})();
