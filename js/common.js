function visualizeImage(imgList){
    window.imageVisualizationList = imgList

    const actualActiveImg = window.imageVisualizationList.filter((img) => img.active)[0]

    jQuery('body').append(`
        <div id="image-visualization-dimmer"></div>
        <div id="image-visualization">
            <div class="image-modal">
                <div class="image-pass" onclick="backImage()">
                    <img src="./assets/seta-reverse-white.svg" alt="">
                </div>
                <div id="image-holder">
                    <img id="image-viewer" src="${actualActiveImg.img}" alt="">
                    <img id="retract-image-visualization" onclick="closeImageVisualization()" src="./assets/retract.png" alt="">
                </div>
                <div class="image-pass" onclick="passImage()">
                    <img src="./assets/seta-white.svg" alt="">
                </div>
            </div>
        </div>
    `)

    jQuery('#main-page').css('filter', 'blur(5px)')
}

function passImage(){

    const arrLength = window.imageVisualizationList.length - 1

    const actualIndex = window.imageVisualizationList.findIndex(element => element.active)

    if(actualIndex < arrLength){
        window.imageVisualizationList[actualIndex].active = false
        window.imageVisualizationList[actualIndex + 1].active = true

        jQuery('#image-viewer').attr('src', window.imageVisualizationList[actualIndex + 1].img)
    }

}

function backImage(){
    const actualIndex = window.imageVisualizationList.findIndex(element => element.active)

    if(actualIndex > 0){
        window.imageVisualizationList[actualIndex].active = false
        window.imageVisualizationList[actualIndex - 1].active = true

        jQuery('#image-viewer').attr('src', window.imageVisualizationList[actualIndex - 1].img)
    }
}

function closeImageVisualization(){
    delete window.imageVisualizationList

    jQuery('#image-visualization-dimmer').remove()
    jQuery('#image-visualization').remove()
    jQuery('#main-page').css('filter', 'blur(0)')
}