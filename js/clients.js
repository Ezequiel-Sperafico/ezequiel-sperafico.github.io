jQuery(document).ready(() => {

    jQuery('body')[0].scrollLeft = 0

    window.addEventListener('resize', () => {
        ajustaTitleHeight()
        correctBoxDetail()
        ajustaDepoimentos()
        ajustaNewsLetter()
        jQuery('body')[0].scrollLeft = 0
    })

    ajustaTitleHeight()
    correctBoxDetail()
    ajustaDepoimentos()
    ajustaNewsLetter()
    setEventListeners()
})

function ajustaTitleHeight(){
    const height = jQuery('#title-section>.background-img').css('height');

    jQuery('#title-section').css('height', height);
}

function correctBoxDetail(){
    const height = jQuery('#title-section>.background-img').css('height');

    jQuery('#title-section .box-detail-top').css('margin-top', `calc(${height} - 36px)`);
}

function ajustaDepoimentos(){
    const listWidth = jQuery('.list-depoimentos').width()
    const depoimentoWidth = jQuery('.depoimento-element-img').width()
    jQuery('.depoimento-element-info').css('width', listWidth - depoimentoWidth + "px")

}

function ajustaNewsLetter(){
    const newHeight = Number(jQuery('#news-letter').css('height').replace('px', ''));

    jQuery('#news-letter-signup').css('height', `${newHeight}px`)
}

function setEventListeners(){
    jQuery('.list-depoimentos').mousedown((event) => {
        window.points = {
            left: jQuery('.list-depoimentos')[0].scrollLeft,
            x: event.clientX
        }

        function mouseMoveHandler(event){
            jQuery('.list-depoimentos')[0].scrollLeft = window.points.left - event.clientX + window.points.x
        }
        
        function mouseUpHandler(event){
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            document.removeEventListener('mouseout', mouseUpHandler);
        }

        jQuery('.list-depoimentos').mouseout(mouseUpHandler);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    })

    jQuery('#depoimentos-buttons>img:eq(0)').click((element) => {
        const totalPages = jQuery('.depoimento-element').length - 1

        const oneFrameWidth = jQuery('.list-depoimentos').width()
        const totalScroll = jQuery('.list-depoimentos')[0].scrollLeft

        let actualPage = Math.round(totalScroll / oneFrameWidth)

        actualPage--

        if(actualPage < 0)
            actualPage = totalPages

        jQuery('.list-depoimentos')[0].scrollTo({left: actualPage * oneFrameWidth, behavior: 'smooth'})
    })

    jQuery('#depoimentos-buttons>img:eq(1)').click((element) => {
        const totalPages = jQuery('.depoimento-element').length - 1

        const oneFrameWidth = jQuery('.list-depoimentos').width()
        const totalScroll = jQuery('.list-depoimentos')[0].scrollLeft

        let actualPage = Math.round(totalScroll / oneFrameWidth)

        actualPage++

        if(actualPage > totalPages)
            actualPage = 0

        jQuery('.list-depoimentos')[0].scrollTo({left: actualPage * oneFrameWidth, behavior: 'smooth'})

    })
}