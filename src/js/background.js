const urlJSON = chrome.runtime.getURL("src/data/untrustedUrls.JSON");

fetch(urlJSON)
  .then((response) => response.json())
  .then(function(myJSON){
    summary = myJSON;
  })

var summary;

chrome.runtime.onConnect.addListener((portFrom) => {
    if(portFrom.name === 'background-content') {
       portFrom.onMessage.addListener((message, sendingPort) => {
          if (message.type === 'HASCOVID') {
              const hasCovid = message.payload.hasCovid
              if (hasCovid) {
                chrome.browserAction.setIcon({path: {"19": "/icons/ok_19.png", "38": "/icons/ok_38.png"}, tabId: sendingPort.sender.tab.id})
                var completeURL = message.payload.url;
                var finalURL = adjustURL(completeURL,sendingPort);
                checkURL(finalURL,sendingPort);
              } else {
                chrome.browserAction.setIcon({path: {"19": "/icons/idle_icon_19.png", "38": "/icons/idle_icon_38.png"}, tabId: sendingPort.sender.tab.id})
              }
          }
       })
    }
 })

function fetchData () {
    fetch('https://api.covid19api.com/summary').then(r => r.text()).then(result => {
        if (!/You have reached maximum request limit./i.test(result)) {
            summary = JSON.parse(result)
        }
    })
}

function adjustURL(completeURL){
  var begin = completeURL.indexOf('w.') + 2;
  var partialURL = completeURL.slice(begin);
  var final = partialURL.indexOf('/');
  return partialURL.slice(0, final);
}

function checkURL(URL,sendingPort){
  for(var i = 0; i < summary.untrusted.length ; i++)
    if(!summary.untrusted[i].toUpperCase().localeCompare(URL.toUpperCase())){
      chrome.browserAction.setIcon({path: {"19": "/icons/not_19.png", "38": "/icons/not_38.png"}, tabId: sendingPort.sender.tab.id});
      break;
    }
}
