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
    thrust: false,
    thrustPower: 10,
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
        ship.xSpeed += Math.sin(a) * ship.thrustPower
        ship.ySpeed -= Math.cos(a) * ship.thrustPower
    }

    // Déplacement vaisseau
    ship.x += ship.xSpeed * deltaTime
    ship.y += ship.ySpeed * deltaTime
    
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
}