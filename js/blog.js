window.page = 0;
window.totalPages = 0;
window.blogList;

jQuery(document).ready(() => {

    window.totalPages = Math.ceil(jQuery('.list-first').length / 4);

    jQuery(`.list-first:gt(${window.totalPages + 1})`).hide()

    window.addEventListener('resize', () => {
        montaPaginationNumbers()
        ajustaTitleHeight()
        ajustaNewsLetter()
        ajustaListLineWidth()
        setEventListeners()
        ajustaBlogListHeight()
        ajustaRecentListHeight()
    })

    montaPaginationNumbers()
    ajustaTitleHeight()
    ajustaNewsLetter()
    ajustaListLineWidth()
    setEventListeners()
    ajustaBlogListHeight()
    ajustaRecentListHeight()
})

function ajustaListLineWidth(){
    const panelTotalWidth = Number(jQuery('.pagination-panel').css('width').replace('px', ''))
    const arrowButtonsWidth = Number(jQuery('.pagination-arrow-buttons').css('width').replace('px', ''))

    jQuery('.pagination-line').css('width', `${panelTotalWidth - arrowButtonsWidth - 20}px`)
}

function ajustaBlogListHeight(){
    const height = jQuery('.list-second:eq(0)').css('height');

    jQuery('.list-first').css('height', height);
}

function ajustaRecentListHeight(){
    const height = jQuery('.list-first').height()
    const margin = Number(jQuery('.list-first').css('margin-bottom').replace('px', ''))
    jQuery('#recent-list').css('max-height', `${(height + margin) * 4}px`)
}

function mountBlogList(){


    if((window.page + 1) > window.totalPages)
        return

    const blogTemplateElement = jQuery('.list-template')
    const blogElements = []

    const beginSlice = (window.page * 4)
    const finalSlice = window.page * 4 + 4;

    jQuery('.list-first').hide()

    const blogArrays = jQuery('.list-first').slice(beginSlice, finalSlice)

    blogArrays.show()
}

function montaPaginationNumbers(){

    const pages = window.totalPages

    const templateElement = jQuery('.pagination-numbers>div:eq(0)')

    templateElement.click(() => {
        window.page = 0

        jQuery('.pagination-numbers>div.actual-page').removeClass('actual-page')
        jQuery('.pagination-numbers>div:eq(0)').addClass('actual-page')

        mountBlogList()
    })

    for(let i = 1; i <= pages; i++ ){
        if(i == 1)
            continue

        const paginationElement = templateElement.clone()
        paginationElement.removeClass('actual-page')

        paginationElement.text(`0${i}`)

        paginationElement.click(() => {
            window.page = i - 1
            jQuery('.pagination-numbers>div.actual-page').removeClass('actual-page')
            paginationElement.addClass('actual-page')
            mountBlogList()
        })

        jQuery('.pagination-numbers').append(paginationElement)
    }
}

function ajustaTitleHeight(){
    const height = jQuery('#title-section>.background-img').css('height');

    jQuery('#title-section').css('height', height);
}



function ajustaNewsLetter(){
    const newHeight = Number(jQuery('#news-letter').css('height').replace('px', ''));

    jQuery('#news-letter-signup').css('height', `${newHeight}px`)
}

function setEventListeners(){
    jQuery('#right-arrow-button').click(() => { 


        if((window.page + 1) >= window.totalPages)
            return    
        window.page = window.page + 1
        jQuery('.pagination-numbers>div.actual-page').removeClass('actual-page')
        jQuery('.pagination-numbers>div:eq('+(window.page)+')').addClass('actual-page')
        mountBlogList() 
    })
    jQuery('#left-arrow-button').click(() => { 
        if((window.page -1 ) < 0)
            return    
        window.page = window.page - 1
        jQuery('.pagination-numbers>div.actual-page').removeClass('actual-page')
        jQuery('.pagination-numbers>div:eq('+(window.page)+')').addClass('actual-page')
        mountBlogList() 
    })
}