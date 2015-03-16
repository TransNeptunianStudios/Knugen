Crowns = function(game, physicalGroup, knugen) {
   Phaser.Group.call(this, game);
   this.game = game;
   this.enableBody = true;
   this.crownSize = 16;

   this.rectArray = [];

   physicalGroup.forEach(function(child, ra) {

      if (!child.knugen) {
         
         var topLeft = Utils.getTopLeft(child);
      
         ra.push(new Phaser.Rectangle(topLeft.x,
                                      topLeft.y,
                                      child.width * child.scale.x,
                                      child.height * child.scale.y));
   }

   }, this, false, this.rectArray);

   this.validPositions = [];

   for (var i = 0; i < game.width-this.crownSize; i++) {
      for (var j = 0; j < game.height-this.crownSize; j++) {

         var tmp = new Phaser.Rectangle(i, j, this.crownSize, this.crownSize);

         var ok = true;

         for (var k = 0; k < this.rectArray.length; k++) {
            if (Phaser.Rectangle.intersects(tmp, this.rectArray[k])) {
               ok = false;
               break;
            }
         }

         if (ok) {
            this.validPositions.push(tmp);
         }
      }
   }

   this.scheduleNewCrown();
}

Crowns.prototype = Object.create(Phaser.Group.prototype);
Crowns.prototype.constructor = Crowns;

Crowns.prototype.scheduleNewCrown = function() {
   this.game.time.events.add(1000, this.spawnCrown, this);
}

Crowns.prototype.spawnCrown = function() {
   while (1) {
      var index = this.game.rnd.integerInRange(0, this.validPositions.length);
      if (index < this.validPositions.length) {
         var sprite = this.create(this.validPositions[index].x, this.validPositions[index].y, 'crown');
         sprite.alpha = 0;
         this.game.add.tween(sprite).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
         break;
      }
   }
}

// Crowns.prototype.render = function() {
//    for (var i = 0; i < this.rectArray.length; i++) {
//       this.game.debug.geom(this.rectArray[i]);
//    }
// }
