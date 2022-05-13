jQuery(document).ready(() => {

    jQuery('body')[0].scrollLeft = 0

    window.addEventListener('resize', () => {
        ajustaTitleHeight()
        correctBoxDetail()
        ajustaProjectAbsolutes()
        ajustaNewsLetter()
        jQuery('body')[0].scrollLeft = 0
    })

    ajustaTitleHeight()
    correctBoxDetail()
    ajustaOddProjectElements()
    ajustaProjectAbsolutes()
    ajustaNewsLetter()
    setEventListeners()
    addImgIndex()
})

function addImgIndex(){
    jQuery('.img-element>img:nth-child(1)').each((index, element) => {
        jQuery(element).attr('index', index)
    })
}

function ajustaTitleHeight(){
    const height = jQuery('#title-section>.background-img').css('height');

    jQuery('#title-section').css('height', height);
}

function correctBoxDetail(){
    const height = jQuery('#title-section>.background-img').css('height');

    jQuery('#title-section .box-detail-top').css('margin-top', `calc(${height} - 137px)`);
}

function ajustaNewsLetter(){
    const newHeight = Number(jQuery('#news-letter').css('height').replace('px', ''));

    jQuery('#news-letter-signup').css('height', `${newHeight}px`)
}

function ajustaOddProjectElements(){
    jQuery('.project-element.odd').each((index, element) => {
        const copyElement = jQuery(element).find('.project-text')
        jQuery(element).append(copyElement)
    })
}

function ajustaProjectAbsolutes(){
    jQuery('.detail-see-more').each((index, element) => {
        const height = jQuery(element).parent().find('>img').height() - 24
        jQuery(element).css('top', height + "px")
    })

    jQuery('.img-listing').each((index, element) => {
        const height = jQuery(element).parent().find('>img').height() + 12
        jQuery(element).css('top', height + "px")
    })

    jQuery('.img-pass-buttons').each((index, element) => {
        let height = jQuery(element).parent().find('>img').height() + 12
        height = height + jQuery(element).parent().find('>.img-listing').height() - jQuery(element).find('>img:eq(0)').height()
        jQuery(element).css('top', height + "px")
    })

    jQuery('.project-img').each((index, element) => {
        const height = jQuery(element).find('>img').css('height')
        jQuery(element).css('height', height)
    })

    jQuery('.tenho-interesse-button').each((index, element) => {
        jQuery(element).css(
            'bottom',
            -jQuery(element).parent().find('>.img-listing').height() - 12 + "px"
        )
    })
}

function setEventListeners(){
    jQuery('.img-listing').mousedown((eventFather) => {
        let points = {
            left: eventFather.currentTarget.scrollLeft,
            x: eventFather.clientX
        }

        window.eventCount = 0

        function mouseMoveHandler(event){
            window.eventCount++

            eventFather.currentTarget.scrollLeft = points.left + ( points.x - event.clientX)
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

    jQuery('.img-pass-buttons>img:eq(0)').click((event) => {
        const scrollVal = jQuery(event.currentTarget).parent().parent().find('.img-listing').width()
        jQuery(event.currentTarget).parent().parent().find('.img-listing')[0].scrollTo({left: -scrollVal, behavior: "smooth"})
    })

    jQuery('.img-pass-buttons>img:eq(1)').click((event) => {
        const scrollVal = jQuery(event.currentTarget).parent().parent().find('.img-listing').width()
        jQuery(event.currentTarget).parent().parent().find('.img-listing')[0].scrollTo({left: scrollVal, behavior: "smooth"})
    })

    jQuery('.project-img').on('click', ' .detail-see-more:not(.opened)', openExpandProjecElement)

    jQuery('.project-img').on('click', ' .opened', closeExpandProjectElement)

    jQuery('.img-element>img:nth-child(1)').click((event) => {

        const clickedIndex = Number(jQuery(event.currentTarget).attr('index'))

        const imgList = []

        jQuery('.img-element>img:nth-child(1)').each((index, element) => {
            imgList.push({
                img: jQuery(element).attr('src'),
                active: clickedIndex == index ? true : false
            })
        })

        visualizeImage(imgList)

    })
}

async function openExpandProjecElement(event){

    jQuery(event.currentTarget).addClass('opened')

    const projectElement = jQuery(event.currentTarget).closest('.project-element')

    const listImgHeight = projectElement.find('.img-listing img:eq(0)').css('height')

    projectElement.css('margin-bottom', '300px')

    const percentageRotation = 90
    let actualDegree = 270
    new Promise(async (resolve) => {
        while(percentageRotation < actualDegree){

            await new Promise(resolve => {
                setTimeout(() => {
                    actualDegree--
                    projectElement.find('.detail-see-more>img').css('transform', 'rotate(' + actualDegree + 'deg)')
                    resolve();
                }, 0.5)
            })
        }   
        resolve()
    })

    projectElement.find('.img-listing').css('height', listImgHeight)

    setTimeout(async () => {
        ajustaProjectAbsolutes()

        projectElement.find('.img-pass-buttons').css('opacity', 1)

        projectElement.find('.tenho-interesse-button').css('padding', '13px')
        //projectElement.find('.tenho-interesse-button').css('width', '13.5vw')

        const totalWidth = window.innerWidth
        const percentageWidth = Math.floor(totalWidth * 13.5 / 100)
        let actualWidth = 0

        while(actualWidth < percentageWidth){

            await new Promise(resolve => {
                setTimeout(() => {
                    actualWidth++
                    projectElement.find('.tenho-interesse-button').css('width', actualWidth + 'px')
                    resolve();
                }, 1)
            })

        }
    }, 1010)

    setTimeout(async () => {
        let actualOpacity = 0

        while(actualOpacity < 100){

            await new Promise(resolve => {
                setTimeout(() => {
                    actualOpacity++
                    projectElement.find('.project-text-expand').css('opacity', actualOpacity / 100)
                    
                    resolve();
                }, 5)
            })

        }
    }, 1100)

}

async function closeExpandProjectElement(event){
    debugger
    jQuery(event.currentTarget).removeClass('opened')

    const projectElement = jQuery(event.currentTarget).closest('.project-element')

    await new Promise(async (resolve) => {
        setTimeout(async () => {
            projectElement.find('.img-pass-buttons').css('opacity', 0)

            //projectElement.find('.tenho-interesse-button').css('width', '13.5vw')

            const totalWidth = window.innerWidth
            const objectiveWidth = 0
            let actualWidth = projectElement.find('.tenho-interesse-button').width()

            while(actualWidth > objectiveWidth){

                await new Promise(resolve => {
                    setTimeout(() => {
                        actualWidth--
                        projectElement.find('.tenho-interesse-button').css('width', actualWidth + 'px')
                        resolve();
                    }, 1)
                })

            }

            projectElement.find('.tenho-interesse-button').css('padding', '0')

            resolve()

        }, 1)

        await new Promise(async (resolve) => { 
            setTimeout(async () => {
                let actualOpacity = 100

                while(actualOpacity > 0){

                    await new Promise(resolve => {
                        setTimeout(() => {
                            actualOpacity--
                            projectElement.find('.project-text-expand').css('opacity', actualOpacity / 100)
                            
                            resolve();
                        }, 5)
                    })

                }

                resolve()
            }, 1100)
        })
    })

    const percentageRotation = 270
    let actualDegree = 90
    new Promise(async (resolve) => {
        while(percentageRotation > actualDegree){

            await new Promise(resolve => {
                setTimeout(() => {
                    actualDegree++
                    projectElement.find('.detail-see-more>img').css('transform', 'rotate(' + actualDegree + 'deg)')
                    resolve();
                }, 0.5)
            })
        }   
        resolve()
    })

    projectElement.find('.img-listing').css('height', 0)

    projectElement.css('margin-bottom', '108px')


}