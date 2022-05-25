jQuery(document).ready(() => {

    jQuery('body')[0].scrollLeft = 0

    setEventListeners()
})

function setEventListeners(){
    jQuery('#expand-main-menu')[0].addEventListener('touchend', (event) => {
        if(!jQuery(event.currentTarget).hasClass('opened')){
            jQuery('#expand-main-menu').addClass('opened')
            jQuery('#menu').css('height', '438px')
            jQuery('#menu>a').css('opacity', '1')
    
            const percentageRotation = 180
            let actualDegree = 0
            new Promise(async (resolve) => {
                while(percentageRotation > actualDegree){
    
                    await new Promise(resolve => {
                        setTimeout(() => {
                            actualDegree++
                            jQuery('#expand-main-menu>img').css('transform', 'rotate(' + actualDegree + 'deg)')
                            resolve();
                        }, 0.5)
                    })
                }   
                resolve()
            })
        }
        else {
            jQuery('#expand-main-menu').removeClass('opened')
            jQuery('#menu>a').css('opacity', '0')
            jQuery('#menu').css('height', '0')

            const percentageRotation = 0
            let actualDegree = 180
            new Promise(async (resolve) => {
                while(percentageRotation < actualDegree){

                    await new Promise(resolve => {
                        setTimeout(() => {
                            actualDegree--
                            jQuery('#expand-main-menu>img').css('transform', 'rotate(' + actualDegree + 'deg)')
                            resolve();
                        }, 0.5)
                    })
                }   
                resolve()
            })

        }
    })
}