chrome.webNavigation.onCompleted.addListener(checkCOVID);

async function checkCOVID () {
    const parags = $('p')
    let hasCovid = false
    
    chrome.browserAction.setIcon({path:"/icons/icon.png"})
    chrome.browserAction.setTitle({title: 'searching'})

    parags.each((i, parag)=>{
        const paragText = $(parag).text()
        if(/covid|coronavirus/i.test(paragText)) {
            hasCovid = true
        }
    })
    alert(hasCovid)
    switch (hasCovid) {
        case true:
            chrome.browserAction.setIcon({path:"/icons/ok.png"})
            chrome.browserAction.setTitle({title: 'found'})
            break
        case false:
            chrome.browserAction.setIcon({path:"/icons/not.png"})
            chrome.browserAction.setTitle({title: 'not found'})    
            break
    }
}
