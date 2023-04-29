const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = 600
const height = canvas.height = 600
const spriteWidth = 575
const spriteHeight = 523

let frameX = 0
let gameFrame = 0
let staggerFrames = 5
let playerState = 'sit'

const image = new Image()

image.src = 'shadow_dog.png'

const animationStates = {
    idle: 7,
    jump: 7,
    fall: 7,
    run: 9,
    dizzy: 11,
    sit: 5,
    roll: 7,
    bite: 7,
    ko: 12,
    getHit: 4
}

const select = document.getElementById('animationsSelect')
const states = Object.keys(animationStates)

select.addEventListener('change', (e) => {
    playerState = e.target.value
})

const selectOptions = []

states.forEach(state => {
    const option = document.createElement("option")
    option.value = state
    option.innerText = state
    selectOptions.push(option)
})

select.append(...selectOptions)

function animate() {
    ctx.clearRect(0, 0, width, height)

    let position = Math.floor(gameFrame/staggerFrames) % (animationStates[playerState] - 1)
    const frameY = states.indexOf(playerState)

    ctx.drawImage(image, position * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

    // if (gameFrame % staggerFrames == 0) {
    //     if (frameX < 6) {
    //         frameX++
    //     } else frameX = 0
    // }

    gameFrame++

    requestAnimationFrame(animate)
}

animate()