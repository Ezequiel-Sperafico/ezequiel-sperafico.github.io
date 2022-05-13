

jQuery(document).ready(() => {

    jQuery('body')[0].scrollLeft = 0

    window.addEventListener('resize', () => {
        ajustaTitleHeight()
        correctBoxDetail()
        ajustaDesignBox()
        ajustaNewsLetter()
    })

    ajustaTitleHeight()
    correctBoxDetail()
    ajustaTextMargin()
    ajustaNewsLetter()
    ajustaDesignBox()
    setEventListeners()
    addImgIndex()
})

function addImgIndex(){
    jQuery('.image-demo>img:nth-child(1)').each((index, element) => {
        jQuery(element).attr('index', index)
    })
}

function ajustaTitleHeight(){
    const height = jQuery('#title-section>.background-img').css('height');

    jQuery('#title-section').css('height', height);
}

function correctBoxDetail(){
    const height = jQuery('#title-section>.background-img').css('height');

    jQuery('#title-section .box-detail-top').css('margin-top', `calc(${height} - 36px)`);
}

function ajustaDesignBox(){
    const imageHeight = jQuery('#first-text-body-section .main-image img').css('height').replace('px', '')

    const designBoxHeight = imageHeight * 0.6 + 106

    jQuery("#first-text-body-section .design-text-box").css('top', `${designBoxHeight}px`)
}

function ajustaTextMargin(){
    const marginRight = jQuery("#first-text-body-section .info-text").css('margin-right').replace('px', '').trim();


    if(Number(marginRight) < 180){
        jQuery("#first-text-body-section .info-text").css('margin-right', '180px')

        jQuery("#title-text span").css('margin-right', '180px')
    }
    else if(Number(marginRight) > 278){
        jQuery("#first-text-body-section .info-text").css('margin-right', '278px')

        jQuery("#title-text span").css('margin-right', '278px')

    }
}

function ajustaNewsLetter(){
    const newHeight = Number(jQuery('#news-letter').css('height').replace('px', ''));

    jQuery('#news-letter-signup').css('height', `${newHeight}px`)
}

function setEventListeners(){
    jQuery("#carrosel-scroll").on("click", ".left-scroll", (event) => {
        const scrollValue = window.innerWidth - 140;

        jQuery("#image-carrosel")[0].scrollTo({left: -scrollValue, behavior: "smooth"})
    })

    jQuery("#carrosel-scroll").on("click", ".right-scroll", (event) => {
        const scrollValue = window.innerWidth - 140;

        jQuery("#image-carrosel")[0].scrollTo({left: scrollValue, behavior: "smooth"})
    })

    jQuery('.image-demo>img:nth-child(1)').click((event) => {
        const clickedIndex = Number(jQuery(event.currentTarget).attr('index'))

        const imgList = []

        jQuery('.image-demo>img:nth-child(1)').each((index, element) => {
            imgList.push({
                img: jQuery(element).attr('src'),
                active: clickedIndex == index ? true : false
            })
        })

        visualizeImage(imgList)
    })
}