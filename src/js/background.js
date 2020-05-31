var parags = $('p')

parags.each(verifyParagraph);

if(haveCOVID) check();
else chrome.browserAction.setIcon({path:"../../icons/icon.png"})

chrome.browserAction.onClicked.addListener(change);

var haveCOVID = false;
var siteSafe = true;

function check(){
	if (siteSafe) chrome.browserAction.setIcon({path:"../../icons/not.png"});
	else chrome.browserAction.setIcon({path:"../../icons/ok.png"});
}

function verifyParagraph(i, parag) {
    const paragText = $(parag).text()
    if (/COVID/.test(paragText)) haveCOVID = true;
}

function change(){
	if (siteSafe) siteSafe = false;
	else siteSafe = true;
}