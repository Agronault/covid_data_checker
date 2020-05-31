let summary = {}

chrome.runtime.onConnect.addListener((portFrom) => {
    if(portFrom.name === 'background-content') {
       portFrom.onMessage.addListener((message, sendingPort) => {
          if (message.type === 'HASCOVID') {
              const hasCovid = message.payload.hasCovid
              if (hasCovid) {
                chrome.browserAction.setIcon({path: {"19": "/icons/ok_19.png", "38": "/icons/ok_38.png"}, tabId: sendingPort.sender.tab.id})
                fetch('https://api.covid19api.com/summary').then(r => r.text()).then(result => {
                    if (!/You have reached maximum request limit./i.test(result)) {
                        summary = JSON.parse(result)
                    }
                })
                alert(message.payload.url)
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
