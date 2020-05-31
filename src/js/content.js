const countries = "Albania|Andorra|Antigua|Barbuda|Armenia|Austria|Bahamas|Bangladesh|Belarus|Belize|Bhutan|Bosnia and Herzegovina|Brazil|Bulgaria|Burundi|Cambodia|Canada|Chad|China|Comoros|Congo|Cote d\\'Ivoire|Cuba|Czechia|Djibouti|Dominican Republic|Egypt|Equatorial Guinea|Estonia|Swaziland|Fiji|France|Gambia|Germany|Greece|Guatemala|Guinea-Bissau|Haiti|Hungary|India|Iran|Ireland|Italy|Japan|Kazakhstan|Kiribati|Kuwait|Laos|Lebanon|Liberia|Liechtenstein|Luxembourg|Malawi|Maldives|Malta|Mauritania|Mexico|Moldova|Mongolia|Morocco|Myanmar|Namibia|Nepal|New Zealand|Niger|North Korea|Macedonia|Oman|Palau|Panama|Paraguay|Philippines|Portugal|Romania|Rwanda|Saint Lucia|Samoa|Sao Tome and Principe|Senegal|Seychelles|Singapore|Slovenia|Somalia|South Korea|Spain|Sudan|Sweden|Syria|Tajikistan|Thailand|Togo|Trinidad and Tobago|Turkey|Tuvalu|Ukraine|UAE|UK|United States|Uruguay|Vanuatu|Venezuela|Yemen|Zimbabwe"
const countryDataRegex = new RegExp(`(${countries}).*\d+`, 'i')
const countryNameRegex = new RegExp(`${countries}`, 'i')

let countryIds = {}

let contentPort = chrome.runtime.connect({
    name: 'background-content'
 })

var parags = $('p')

let hasCovid = false

parags.each(verifyParagraph)

contentPort.postMessage({
    type: 'HASCOVID', 
    payload: {
       hasCovid   
    }
 })

async function verifyParagraph(i, parag) {
    const paragText = $(parag).text()

    if (/covid|coronavirus/i.test(paragText)) hasCovid = true
    
    if (countryDataRegex.test(paragText)) {
        parag.innerHTML = `<span style = "background: rgba(0, 255, 87, 0.57);" >${paragText}</span>`
        const country = paragText.match(countryNameRegex)

        if (/dea(d)?|death(s)?/i.test(paragText)) {

        }
        if (/case(s)?|contamined(s)?|infected(s)?/.test(paragText)) {
            fetch('https://api.covid19api.com/summary').then(r => r.text()).then(result => {
                alert(result)
            })
        }
    }
}

function parseCountryContamined (res, countryName) {
    summary = JSON.parse(res)
    const countries = summary.Countries
    for (const country of countries) {
        const countryNameRgx = new RegExp(countryName, 'i')
        if (countryNameRgx.test(country.Country)) {
            alert(`confirmed cases in ${countryName} is actually: ${country.TotalConfirmed}`)
        }
    }
}

function httpGetAsync(theUrl, countryName, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, countryName);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
