/**
 * Draw the ship at the correct angle and position
 * @param {*} s The ship
 * @param {*} ctx 
 */
function drawShip(s, ctx){
   let [p1,p2,p3] = eqTriangleFromCenter(0, 0, s.side)
   ctx.fillStyle = "white"
   
   
   ctx.translate(s.x, s.y)
   ctx.rotate(s.a * Math.PI / 180)
   ctx.beginPath()
   ctx.moveTo(p1.x, p1.y)
   ctx.lineTo(p2.x, p2.y)
   ctx.lineTo(p3.x, p3.y)
   ctx.closePath()
   ctx.fill()

   ctx.fillRect(p2.x + s.side/3, p2.y, s.side/3, 4)

   if(s.thrust){
      ctx.fillStyle = "red"
      ctx.beginPath()
      ctx.moveTo(p1.x, p2.y+s.side /3 +5)
      ctx.lineTo(p2.x + s.side/3, p2.y +5)
      ctx.lineTo(p3.x - s.side/3, p2.y +5)
      ctx.closePath()
      ctx.fill()
   }
   ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * Donne les 3 point d'un triangle équilatéral à partir de son centre de gravité
 * Pointe vers le haut
 * @param x 
 * @param y 
 * @param s Longueur du côté
 * @returns [sommet, base gauche, base droite]
 */
function eqTriangleFromCenter(x,y,s){
   // https://fr.wikipedia.org/wiki/Triangle_%C3%A9quilat%C3%A9ral#%C3%89l%C3%A9ments_remarquables

   let h = s*Math.sqrt(3)/2
   let p1 = {x: x, y: y - 2/3*h}
   let p2 = {x: x - s/2, y: y + 1/3*h}
   let p3 = {x: x + s/2, y: y + 1/3*h}
   return [p1, p2, p3]
}