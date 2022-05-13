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