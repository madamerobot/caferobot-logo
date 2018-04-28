//GLOBAL VARIABLES
//======================//
let ctx = {}
let canvas

let sliderValue = 1
let textWidth = 0

//FLAGS
let drawMode = false
let crazyMode = false
let hasRetina = false

//LOCAL STORAGE FOR MOUSE POSITIONS
let prevMouseX
let prevMouseY
let mouseXPos
let mouseYPos

//MAPPING FUNCTION
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

//EVENT LISTENERS
//======================//
window.addEventListener('load', function(){ 
    initialiseCanvas()
    initialiseUIElements()
    renderCopy(1)
})

window.addEventListener('keyup', function(){
    console.log('KEYUP')
    crazyMode = true
    let angle = Math.sin(mouseXPos - prevMouseX, mouseYPos - prevMouseY)
    console.log(angle)
    
    // ctx.save()
    ctx.translate(mouseXPos, mouseYPos)
    ctx.rotate(angle)
    // ctx.restore()
    // ctx.translate(-mouseXPos, -mouseYPos)
})

window.addEventListener('mousemove', function(){

    storeMouseCoord(window.event.clientX, window.event.clientY)
    mouseXPos = window.event.clientX/2-textWidth/2
    mouseYPos = window.event.clientY/2-(30)

    if (drawMode) {
        renderCopy(2)
    } 
})

window.addEventListener('resize', function(){
    initialiseCanvas()
    renderCopy(sliderValue)
})

//INTERNAL METHODS
//======================//
//Canvas element twice as large as you want it, 
//but set its width and height styles to the target size. 

function initialiseCanvas(){
    // hasRetina = window.devicePixelRatio > 1
    canvas = document.getElementById("myCanvas")

    // canvas.width = window.innerWidth    
    // canvas.height = window.innerHeight

    canvas.width = window.innerWidth*0.5
    canvas.height = window.innerHeight*0.5

    if (hasRetina){
        // canvas.style.width = window.innerWidth/2
        canvas.style.width = window.innerWidth/4
        // canvas.style.height = window.innerHeight/2
        canvas.style.height = window.innerHeight/4
    } else {
        canvas.style.width = window.innerWidth*0.5
        canvas.style.height = window.innerHeight*0.5
    }

    ctx = canvas.getContext("2d")
    if (hasRetina){
        ctx.scale(2,2)
    }
}

function initialiseUIElements(){

    let slider = document.querySelector('input')
    slider.defaultValue = '1'

    slider.addEventListener('input', function(){
        sliderValue = slider.value
        renderCopy(slider.value)
    })

    let drawMorebutton = document.querySelector('.draw-more')
    drawMorebutton.addEventListener('click', function(){
        if (drawMode){
            drawMode = false
        }  else {
            drawMode = true
            initialiseCanvas()
        }
    })

    let resetButton = document.querySelector('.reset-button')
    resetButton.addEventListener('click', function(){
        sliderValue = 1
        initialiseCanvas()
        renderCopy(1)
    })
}

function storeMouseCoord(xPos, yPos){
    prevMouseX = xPos
    prevMouseY = yPos
}

function renderCopy(number){
    for(var i=0; i<number; i++){
        outputText(i*3)
    }
}

function outputText(offset){

    let xPos
    let yPos

    const text = 'CAFE ROBOT'
    const specs = ctx.measureText(text)
    textWidth = specs.width
    

    if (drawMode){
        xPos = mouseXPos
        yPos = mouseYPos
    } else {
        xPos = (window.innerWidth*0.05)+offset
        yPos = (window.innerHeight*0.05)+offset  
    }
    
    let shadeOfGrey = map(yPos, 0, 270, 100, 80)
    ctx.font = 'normal 20px Merriweather Sans'
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4
    ctx.strokeText(text, xPos, yPos)
    ctx.fillStyle = "hsl(0, 0%," + shadeOfGrey + "%)"
    ctx.fillText('CAFE ROBOT', xPos, yPos)

}


