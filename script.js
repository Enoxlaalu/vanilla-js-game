let gameFrame = 0
let staggerFrames = 5
let playerState = 'idle'
let gameSpeed = 5

function prepareImage(path) {
    const image = new Image()

    image.src = `assets/img/${path}.png`

    return image
}

function renderDog() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const width = canvas.width = 600
    const height = canvas.height = 600
    const spriteWidth = 575
    const spriteHeight = 523

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

    const image = prepareImage('shadow_dog')

    function animate() {
        ctx.clearRect(0, 0, width, height)

        let position = Math.floor(gameFrame/staggerFrames) % (animationStates[playerState] - 1)
        const frameY = states.indexOf(playerState)

        ctx.drawImage(image, position * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

        gameFrame++

        requestAnimationFrame(animate)
    }

    animate()
}

function renderBg() {
    const canvas = document.getElementById('bgCanvas')
    const ctx = canvas.getContext('2d')

    const width = canvas.width = 800
    const height = canvas.height = 700

    const gameSpeedValue = document.getElementById('gameSpeedValue')
    const rangeInput = document.getElementById('rangeInput')

    rangeInput.value = gameSpeed
    gameSpeedValue.innerText = gameSpeed

    rangeInput.addEventListener('change', (e) => {
        const value = e.target.value

        gameSpeed = value
        gameSpeedValue.innerText = value
    })

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 700
            this.image = image
            this.speedModifier = speedModifier
            this.speed = gameSpeed * this.speedModifier
        }

        draw() {
            this.speed = gameSpeed * this.speedModifier

            ctx.drawImage(this.image, this.x, 0)
            ctx.drawImage(this.image, this.x + this.width, 0)

            if (this.x <= -this.width) this.x = 0

            this.x-= this.speed
        }
    }

    const layers = Array(5).fill('').map((l, index) => {
        const image = prepareImage(`bg/layer-${index+1}`)
        return new Layer(image, index + 1)
    })

    function animate() {
        ctx.clearRect(0, 0, width, height)

        layers.forEach((l) => {
            l.draw()
        })

        requestAnimationFrame(animate)
    }
    animate()
}

renderDog()
renderBg()