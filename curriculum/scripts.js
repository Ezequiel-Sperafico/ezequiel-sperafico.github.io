jQuery(document).ready(() => {
    setListeners()
})

function setListeners(){
    jQuery('.popping-scroll-button').unbind('click').click(scrollDownClick)
}

function scrollDownClick(event){

    const sectionMap = new Map([
        ['1', '#first-page'],
        ['2', '#second-page'],
        ['3', '#third-page'],
        ['4', '#fourth-page'],
        ['5', '#fifth-page']
    ])

    const sectionToGo = jQuery(event.currentTarget).attr('go-to-section')

    const idSection = sectionMap.get(sectionToGo)

    jQuery(idSection)[0].scrollIntoView({behavior: 'smooth'});
}