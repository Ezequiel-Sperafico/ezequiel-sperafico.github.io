jQuery(document).ready(() => {

    window.bannerActualPage = 0
    window.bannerTotalPage = jQuery('#main-banner>div').length

    window.addEventListener('resize', () => {
        jQuery('#main-banner').css('height', jQuery('#main-banner>div>img').css('height'))
    })

    jQuery('#main-banner').css('height', jQuery('#main-banner>div>img').css('height'))

    setEventListenners()
})

function setEventListenners(){
    let scrollValueLeft = 0
    let scrollValueRight = 0

    jQuery('#blog-section').mousedown((event) => {
        window.points = {
            left: jQuery('#blog-list')[0].scrollLeft,
            x: event.clientX
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    })

    jQuery('#blog-list').mouseout(mouseUpHandler);

    jQuery('#blog-buttons>img:eq(0)').on("click", (event) => {
        scrollValueLeft = scrollValueLeft + window.innerWidth - 140;

        jQuery('#blog-list')[0].scrollTo({left: -scrollValueLeft, behavior: "smooth"})
    })

    jQuery('#blog-buttons>img:eq(1)').on("click", (event) => {
        scrollValueRight = scrollValueRight + window.innerWidth - 140;

        jQuery('#blog-list')[0].scrollTo({left: scrollValueRight, behavior: "smooth"})
    })

    jQuery('.blog-item .detail-blog-2, .list-title').click((event) => {
        window.open(jQuery(event.currentTarget).attr('redirect-url'), '_blank_')
    })

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

    jQuery('#banner-pager').on('click', '>div>div', (event) => {
        clearInterval(window.bannerInterval)

        window.bannerActualPage = Number(jQuery(event.currentTarget).attr('class').split(' ').find((el) => el.indexOf('number') != -1).split('-').pop())
        bannerPager()

        window.bannerInterval = setInterval(() => {
            bannerPager()
        }, 6000)
    })

    window.bannerInterval = setInterval(() => {
        bannerPager()
    }, 6000)

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

function bannerPager(){
    jQuery(`#banner-pager>div>div`).removeClass('active')
    jQuery(`#banner-pager>div>div.number-${window.bannerActualPage}`).addClass('active')

    jQuery('#main-banner')[0].scrollTo({left: window.innerWidth * (window.bannerActualPage), behavior: 'smooth'})
    if((window.bannerActualPage + 1) < window.bannerTotalPage){
        window.bannerActualPage = window.bannerActualPage + 1;
    }
    else{
        window.bannerActualPage = 0
    }
}

function mouseMoveHandler(event){
    jQuery('#blog-list')[0].scrollLeft = window.points.left - event.clientX + window.points.x
}

function mouseUpHandler(event){
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}