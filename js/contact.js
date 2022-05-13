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
}