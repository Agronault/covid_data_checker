chrome.browserAction.onClicked.addListener(change);
chrome.webNavigation.onCompleted.addListener(checkCOVID);

var siteSafe = true;
var hasCOVID = false;

function checkCOVID(){
	var parags = $('p');

	parags.each(verifyParagraph(hasCOVID));

	if(hasCOVID) checkSite();
	else chrome.browserAction.setIcon({path:"../../icons/icon.png"})
}

function checkSite(){
	if (siteSafe) chrome.browserAction.setIcon({path:"../../icons/ok.png"});
	else chrome.browserAction.setIcon({path:"../../icons/not.png"});
}

function verifyParagraph(i, parag) {
    const paragText = $(parag).text();
    if (/COVID/.test(paragText)) hasCOVID = true;
}

function change(){
	if (siteSafe) siteSafe = false;
	else siteSafe = true;
	checkSite();
}