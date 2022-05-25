jQuery(document).ready(() => {

    jQuery('body')[0].scrollLeft = 0

    window.addEventListener('resize', () => {
        ajustaTitleHeight()
    })

    ajustaTitleHeight()
    setEventListeners()
})

function ajustaTitleHeight(){
    const height = jQuery('#title-section>.background-img').css('height');

    jQuery('#title-section').css('height', height);
}

function setEventListeners(){
    jQuery('#file-cadastro-placeholder, #file-cadastro-icon').click((event) => {
        jQuery('#file-cadastro').click()
    })

    jQuery("#file-cadastro").change((event) => {
        const appendName = event.currentTarget.files[0].name

        jQuery('#file-cadastro-placeholder').val(appendName)
    })

    jQuery('#cadastro-section .button-agree-send').click(sendData)

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

function sendData(){
    let formData = new FormData();

    formData.append('nome', jQuery('#nome-cadastro').val())
    formData.append('email', jQuery('#email-cadastro').val())
    formData.append('phone', jQuery('#phone-cadastro').val())
    formData.append('file', jQuery('#file-cadastro')[0].files[0])
    formData.append('privacy_check', jQuery('#privacy-check').is(':checked'))
    formData.append('messages_check', jQuery('#messages-check').is(':checked'))
    formData.append('newsletter_check', jQuery('#newsletter-check').is(':checked'))

    jQuery.ajax({
        url: './xxxxxx',
        type: 'POST',
        data:  (new URLSearchParams(formData)).toString(),
        success: (data) => {
            data = {
                code: 200
            }
            const returnSignUp = data
            if(typeof(data) == 'string')
                returnSignUp = JSON.parse(data)
            if(returnSignUp.code >= 200 && returnSignUp.code < 300){
                alert('Proposta enviada com sucess')
            }
            else{
                alert('Erro ao enviar proposta')
            }
        }
    })

}