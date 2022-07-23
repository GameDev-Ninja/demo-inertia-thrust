/**
 * Données initiales du jeu
 */
const ship = {
    x: 0,
    y: 0,
    a: 0,
    side: 30,
    xSpeed: 0,
    ySpeed: 0,
    xAcc: 0,
    yAcc: 0,
    thrust: false,
    thrustPower: 100,
    aSpeed: 5,
}

let scr = {}

// Pour un ciel étoilé
let stars = new Array(randomNumber(25,100))

/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, ctx) {
    scr.width = canvas.width
    scr.height = canvas.height

    ship.x = scr.width /2
    ship.y = scr.height /2

    // créée des étoiles
    stars.fill(0)
    stars = stars.map(e => {
        return {
            x: randomNumber(0, scr.width), 
            y: randomNumber(0, scr.height-25)
        }
    })
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    // Prise en compte des touches
    if(isKeyDown("ArrowLeft")) ship.a -= ship.aSpeed
    else if(isKeyDown("ArrowRight")) ship.a += ship.aSpeed

    if(isKeyDown("ArrowUp")) ship.thrust = true
    else ship.thrust = false

    // Prise en compte de la poussée
    if(ship.thrust){
        let a = ship.a * Math.PI / 180 // Degrés -> Radians
        ship.xAcc = Math.sin(a) * ship.thrustPower * deltaTime
        ship.yAcc = Math.cos(a) * ship.thrustPower * deltaTime
        ship.xSpeed += ship.xAcc
        ship.ySpeed += ship.yAcc
    }
    else{
        ship.xAcc = 0
        ship.yAcc = 0
    }

    // Déplacement vaisseau
    ship.x += ship.xSpeed * deltaTime
    ship.y -= ship.ySpeed * deltaTime
    
    // Bouclage des déplacements
    if(ship.x < -ship.side) ship.x = scr.width + ship.side
    else if (ship.x > scr.width + ship.side) ship.x = -ship.side

    if(ship.y < -ship.side) ship.y = scr.height + ship.side
    else if (ship.y > scr.height + ship.side) ship.y = -ship.side
}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(ctx) {
    // Ciel étoilé scintillant !
    stars.forEach(e => {
        ctx.drawCircle(e, randomNumber(1,2))
    })

    drawShip(ship, ctx)
    drawInfos(ctx)
}

function drawInfos(ctx){
    ctx.fillStyle = "MidnightBlue"
    ctx.fillRect(0,scr.height-30,scr.width, 30)

    ctx.fillStyle = "white"
    ctx.font = "15px sans"
    ctx.textBaseline = 'top';

    let xSpeed = Math.round(ship.xSpeed)
    let ySpeed = Math.round(ship.ySpeed)
    let xAcc = Math.round(ship.xAcc * 1000)/1000
    let yAcc = Math.round(ship.yAcc * 1000)/1000
    
    ctx.fillText(
        `x.speed = ${xSpeed} px/s | y.speed = ${ySpeed} px/s | xAccel. = ${xAcc} px/s² | yAccel. = ${yAcc} px/s² `,
        25,
        scr.height-20
    )
}