/**
 * Données initiales du jeu
 */
const ship = {
    x: 0,
    y: 0,
    a: 0,
    xSpeed: 0,
    ySpeed: 0,
    thrust: false,
    side: 30,
}

let scr = {}

/**
 * Exécutée une seule fois, au chargement
 */
function LoadGame(canvas, ctx) {
    scr.width = canvas.width
    scr.height = canvas.height

    ship.x = scr.width /2
    ship.y = scr.height /2
}

/**
 * Exécutée perpétuellement pour mettre à jour les données
 */
function UpdateGame(deltaTime) {
    if(isKeyDown("ArrowLeft")) ship.a -= 1
    else if(isKeyDown("ArrowRight")) ship.a += 1

    if(isKeyDown("ArrowUp")) ship.thrust = true
    else ship.thrust = false
}

/**
 * Exécutée perpétuellement pour dessiner la frame actuelle
 */
function DrawGame(ctx) {
    drawShip(ship, ctx)
}
