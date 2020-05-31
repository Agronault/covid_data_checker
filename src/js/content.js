var parags = $('p')

parags.each(verifyParagraph)

function verifyParagraph(i, parag) {
    const paragText = $(parag).text()
    if (/coronavirus/.test(paragText)) {
        parag.innerHTML = `<span style = "background: rgba(0, 255, 87, 0.57);" >${paragText}</span>`
    }
}
