const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player')
const beyonce = document.querySelectorAll(`#beyonce`)[0]
const audio = document.querySelector('audio')
const selector = document.getElementById('modo')

let playerSpeed = 35
let beyonceSpeed = 2

let isPlaying = true
let playerPosition = { x: 0, y: 0 }
let beyoncePosition = { x: 300, y: 300 }

function eventos()
{
    let boton = document.getElementById('boton')
    boton.addEventListener('click',configuracion)


}
function configuracion()
{
    let veloPlayer = document.getElementById('veloPlayer')
    playerSpeed = parseInt(veloPlayer.value, 10);
    let veloBeyonce = document.getElementById('veloBeyonce')
    beyonceSpeed = parseInt(veloBeyonce.value, 10);
    // Cambiar imagen si es que el usaurio inserto una imagen
    let imagenBeyonce = document.getElementById('imgNew')
    if (imagenBeyonce.files && imagenBeyonce.files[0]) {
        const file = imagenBeyonce.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            beyonce.style.backgroundImage = `url(${e.target.result})`;
        };

        reader.readAsDataURL(file);
    }
    //Cambia el audio del juego por el audio que inserto el usuario
    let audioNuevo = document.getElementById('audioNew')
    if (audioNuevo.files && audioNuevo.files[0]) {
        const file = audioNuevo.files[0];
        const audioURL = URL.createObjectURL(file);

        audio.src = audioURL
        audio.play()
    }
    //Cambia de modo 
    //valor 0 = ninguno valor 1 = starWars 
    let selector = document.getElementById('modo')
    if(selector.value == 1)
    {
        beyonce.style.backgroundImage = `url(assets/vader.jpg)`
        audio.src = 'assets/vader.mp3'
        player.style.backgroundImage = `url(assets/obi.jpg)`
    }
    
    audio.play()
    gameLoop()
        
}

/**
 * Esta función detecta cuando Beyonce ya te alcanzó
 */
function detectCollision () {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x)
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y)

    if (deltaX <= 25 && deltaY <= 25) {
        if(confirm('Beyonce te atrapó! Rápido, dale las gracias para salvar tu vida')) {
            playerPosition.x = Math.floor(Math.random() * (gameArea.clientWidth - 70))
            playerPosition.y = Math.floor(Math.random() * (gameArea.clientHeight - 70))
        } else {
            alert('Perdiste :(')
            isPlaying = false
            audio.pause()
        }
    }
}

function gameLoop () {
    moveBeyonce()
    requestAnimationFrame(gameLoop)
}

function moveBeyonce () {
    if (beyoncePosition.x < playerPosition.x) 
        beyoncePosition.x += beyonceSpeed
    else if (beyoncePosition.x > playerPosition.x)
        beyoncePosition.x -= beyonceSpeed

    if (beyoncePosition.y < playerPosition.y) 
        beyoncePosition.y += beyonceSpeed
    else if (beyoncePosition.y > playerPosition.y)
        beyoncePosition.y -= beyonceSpeed

    updatePosition()
    if (isPlaying)
        detectCollision()
}

function movePlayer (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 25) 
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if(playerPosition.y < gameArea.clientHeight - 70)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x >= 25) 
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if(playerPosition.x < gameArea.clientWidth - 70)
                playerPosition.x += playerSpeed
            break
    }

    updatePosition()
}

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
}

window.addEventListener('keydown', movePlayer)

window.addEventListener('load', () => {
    eventos()
    //gameLoop()
    //audio.play()
})
