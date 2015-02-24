Crowns = function(game, theKnug, size, boundRect) {
   Phaser.Group.call(this, game);

   this.enableBody = true;

   var posArray = [];
   var nrOfCreated = 0;

   while (nrOfCreated < 10) {
      var posRect = new Phaser.Rectangle(game.world.randomX, game.world.randomY, size, size);
      var ok = true;

      for (var i = 0; i < posArray.length; i++) {
         
         if (posArray[i].intersects(posRect)) {
            ok = false;
            break;
         }

//         if (!boundRect.containsRect(posRect)) {
//            ok = false;
//            break;
//         }
      }

      if (ok) {
         posArray.push(posRect);
         nrOfCreated++;
      }
   }

   for (var i = 0; i < posArray.length; i++) {
      var sprite = this.create(posArray[i].x, posArray[i].y, 'crown');
   }   
}

Crowns.prototype = Object.create(Phaser.Group.prototype);
Crowns.prototype.constructor = Crowns;