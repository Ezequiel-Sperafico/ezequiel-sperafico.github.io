jQuery(document).ready(() => {

    window.addEventListener('resize', () => {
        ajustaNewsLetter()
        ajustaRecentListHeight()
    })
    ajustaNewsLetter()
    ajustaRecentListHeight()
})

function ajustaRecentListHeight(){
    let totalHeight = 0

    jQuery('#main-text>*').each((i, element) => {
        totalHeight += jQuery(element).height()
    })

    jQuery('#recent-list').css('max-height', `${totalHeight}px`)
}

function ajustaNewsLetter(){
    const newHeight = Number(jQuery('#news-letter').css('height').replace('px', ''));

    jQuery('#news-letter-signup').css('height', `${newHeight}px`)
}