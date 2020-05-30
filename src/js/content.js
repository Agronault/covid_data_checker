var parags = $('p')
//chrome.browserAction.setIcon({path:'src/not.png'})

parags.each(verifyParagraph)

function verifyParagraph(i, parag) {
    const paragText = $(parag).text()
    if (/coronavirus/.test(paragText)) {
        alert(paragText)
        
        //chrome.browserAction.setIcon({path:'src/not.png'})
    }
}