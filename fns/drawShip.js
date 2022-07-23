/**
 * Dessine le vaisseau à la bonne position et au bon angle
 * @param {*} s The ship
 * @param {*} ctx 
 */
function drawShip(s, ctx, clone = {x: false, y:false}){
   let [p1,p2,p3] = eqTriangleFromCenter(0, 0, s.side)
   ctx.fillStyle = "white"

   ctx.translate(s.x, s.y)
   ctx.rotate(s.a * Math.PI / 180)
   ctx.drawPolygon([p1,p2,p3])

   ctx.fillRect(p2.x + s.side/3, p2.y, s.side/3, 4)

   if(s.thrust){
      ctx.fillStyle = "red"
      ctx.drawPolygon([
         {x: p1.x, y: p2.y+s.side /3 +5},
         {x: p2.x + s.side/3, y: p2.y +5},
         {x: p3.x - s.side/3, y: p2.y +5}
      ])
   }
   ctx.setTransform(1, 0, 0, 1, 0, 0);

   if(!clone.x && s.x < s.side){
      let sClone = JSON.parse(JSON.stringify(s))
      sClone.x += scr.width
      drawShip(sClone, ctx, {x:true, y: clone.y})
   }
   else if(!clone.x && s.x > scr.width - s.side){
      let sClone = JSON.parse(JSON.stringify(s))
      sClone.x -= scr.width
      drawShip(sClone, ctx, {x: true, y: clone.y})
   }
   if(!clone.y && s.y < s.side){
      let sClone = JSON.parse(JSON.stringify(s))
      sClone.y += scr.height - 30
      drawShip(sClone, ctx, {x: clone.x, y: true})
   }
   else if(!clone.y && s.y > scr.height - 30 - s.side){
      let sClone = JSON.parse(JSON.stringify(s))
      sClone.y -= scr.height - 30
      drawShip(sClone, ctx, {x: clone.x, y: true})
   }
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
   return [
      {x: x, y: y - 2/3*h},
      {x: x - s/2, y: y + 1/3*h},
      {x: x + s/2, y: y + 1/3*h}
   ]
}