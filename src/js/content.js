const countries = "Albania|Andorra|Antigua|Barbuda|Armenia|Austria|Bahamas|Bangladesh|Belarus|Belize|Bhutan|Bosnia and Herzegovina|Brazil|Bulgaria|Burundi|Cambodia|Canada|Chad|China|Comoros|Congo|Cote d\\'Ivoire|Cuba|Czechia|Djibouti|Dominican Republic|Egypt|Equatorial Guinea|Estonia|Swaziland|Fiji|France|Gambia|Germany|Greece|Guatemala|Guinea-Bissau|Haiti|Hungary|India|Iran|Ireland|Italy|Japan|Kazakhstan|Kiribati|Kuwait|Laos|Lebanon|Liberia|Liechtenstein|Luxembourg|Malawi|Maldives|Malta|Mauritania|Mexico|Moldova|Mongolia|Morocco|Myanmar|Namibia|Nepal|New Zealand|Niger|North Korea|Macedonia|Oman|Palau|Panama|Paraguay|Philippines|Portugal|Romania|Rwanda|Saint Lucia|Samoa|Sao Tome and Principe|Senegal|Seychelles|Singapore|Slovenia|Somalia|South Korea|Spain|Sudan|Sweden|Syria|Tajikistan|Thailand|Togo|Trinidad and Tobago|Turkey|Tuvalu|Ukraine|UAE|UK|United States|Uruguay|Vanuatu|Venezuela|Yemen|Zimbabwe"
const countryDataRegex = new RegExp(`(${countries}).*\d+`, 'i')
const countryNameRegex = new RegExp(`${countries}`, 'i')

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
            //const client = new HttpClient()
            /*
            client.get('https://api.covid19api.com/countries', (res) => {
                alert(res)
            })
            */
        }
    }
}

/*
class HttpClient {
    constructor() {
        this.get = function (aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest()
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText)
            }
            anHttpRequest.open("GET", aUrl, true)
            anHttpRequest.send(null)
        }
    }
}
*/


