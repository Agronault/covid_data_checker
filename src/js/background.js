chrome.runtime.onConnect.addListener((portFrom) => {
    if(portFrom.name === 'background-content') {
       portFrom.onMessage.addListener((message, sendingPort) => {
          if (message.type === 'HASCOVID') {
              const hasCovid = message.payload.hasCovid
              if (hasCovid) {
                chrome.browserAction.setIcon({path: {"19": "/icons/ok_19.png", "38": "/icons/ok_38.png"}, tabId: sendingPort.sender.tab.id})
              } else {
                chrome.browserAction.setIcon({path: {"19": "/icons/not_19.png", "38": "/icons/not_38.png"}, tabId: sendingPort.sender.tab.id})
              }
          }
       })
    }
 })
