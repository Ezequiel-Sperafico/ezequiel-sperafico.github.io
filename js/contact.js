jQuery(document).ready(() => {
    jQuery('body')[0].scrollLeft = 0

    setEventListenners()
})

function setEventListenners(){
    jQuery("#sign-up>input").click(() => {
        jQuery.ajax({
            url: '/xxxxxx',
            type: "POST",
            data: {
                nome: jQuery('#input-name-news-letter').val(),
                email: jQuery('#input-email-news-letter').val(),
                sendNewsPermission: jQuery('#send_news_permission').is(':checked')
            },
            success: () => {
                alert('Cadastro ao news letter feito com sucesso');
            },
            error: () => {
                alert('Erro ao cadastrar no news letter');
            }
        })
    })

    jQuery('.see-more-box').click((event) => {
        window.open('./blog.html', '_blank_')
    })

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