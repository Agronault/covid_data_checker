const countries = "Albania|Andorra|Antigua|Barbuda|Armenia|Austria|Bahamas|Bangladesh|Belarus|Belize|Bhutan|Bosnia and Herzegovina|Brazil|Bulgaria|Burundi|Cambodia|Canada|Chad|China|Comoros|Congo|Cote d\\'Ivoire|Cuba|Czechia|Djibouti|Dominican Republic|Egypt|Equatorial Guinea|Estonia|Swaziland|Fiji|France|Gambia|Germany|Greece|Guatemala|Guinea-Bissau|Haiti|Hungary|India|Iran|Ireland|Italy|Japan|Kazakhstan|Kiribati|Kuwait|Laos|Lebanon|Liberia|Liechtenstein|Luxembourg|Malawi|Maldives|Malta|Mauritania|Mexico|Moldova|Mongolia|Morocco|Myanmar|Namibia|Nepal|New Zealand|Niger|North Korea|Macedonia|Oman|Palau|Panama|Paraguay|Philippines|Portugal|Romania|Rwanda|Saint Lucia|Samoa|Sao Tome and Principe|Senegal|Seychelles|Singapore|Slovenia|Somalia|South Korea|Spain|Sudan|Sweden|Syria|Tajikistan|Thailand|Togo|Trinidad and Tobago|Turkey|Tuvalu|Ukraine|UAE|UK|United States|Uruguay|Vanuatu|Venezuela|Yemen|Zimbabwe"
const countryDataRegex = new RegExp(`(${countries}).*\d+`, 'i')

var parags = $('p')


parags.each(verifyParagraph)

function verifyParagraph(i, parag) {
    const paragText = $(parag).text()
    if (countryDataRegex.test(paragText)) {
        parag.innerHTML = `<span style = "background: rgba(0, 255, 87, 0.57);" >${paragText}</span>`
        if (/dea(d)?|death(s)?/i.test(paragText)) {

        }
        if (/case(s)?|contamined(s)?|infected(s)?/.test(paragText)) {
            
        }
    }
}
