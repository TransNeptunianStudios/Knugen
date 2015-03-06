frogIdFactory = 0;

Frog = function(game, pos, physicalGroup, knugen) {
   this.game = game;
   this.knugen = knugen;
   this.speed = 30;
   this.frog = true;
   this.frodId = frogIdFactory++;
   this.physicalGroup = physicalGroup;

   Phaser.Sprite.call(this, game, pos.x, pos.y-1, 'frog');

   game.add.existing(this);
   game.physics.arcade.enable(this);

   // All animations, frame 0 is "idle"
   this.animations.add('north', [1, 2, 3], 10, true);
   this.animations.add('east', [4, 5, 6], 10, true);
   this.animations.add('south', [7, 8, 9], 10, true);
   this.animations.add('west', [10, 11, 12], 10, true);

   this.anchor.setTo(0.5, 1);
   this.body.collideWorldBounds = true;
   this.body.height = 11;

   this.allLines = [];

   this.physicalGroup.forEach(function(sprite) {
      if (!sprite.frog && !sprite.knugen) {
         this.allLines.push(new Phaser.Line(sprite.body.x, sprite.body.y, sprite.body.x + sprite.width, sprite.body.y));
         this.allLines.push(new Phaser.Line(sprite.body.x, sprite.body.y, sprite.body.x, sprite.body.y + sprite.height));
         this.allLines.push(new Phaser.Line(sprite.body.x + sprite.width, sprite.body.y, sprite.body.x + sprite.width, sprite.body.y + sprite.height));
         this.allLines.push(new Phaser.Line(sprite.body.x, sprite.body.y + sprite.height, sprite.body.x + sprite.width, sprite.body.y + sprite.height));
      }
   }, this);

   this.line = new Phaser.Line(0, 0, 0, 0);

   this.game.time.events.add(1000, this.firstJump, this);
}

Frog.prototype = Object.create(Phaser.Sprite.prototype);
Frog.prototype.constructor = Frog;

Frog.prototype.update = function() {

}

Frog.prototype.firstJump = function() {
   this.body.velocity.x = 0;
   this.body.velocity.y = 1 * this.speed;

   this.game.time.events.add(1000, this.setIdle, this);
}

Frog.prototype.jump = function() {

   var distToKnugen = this.game.physics.arcade.distanceToXY(this.knugen.x, this.knugen.y);

   var angle = this.game.physics.arcade.angleBetween(this, this.knugen);

   this.line.fromAngle(this.world.x, this.world.y, angle, this.speed);

   var degStep = 1;
   var rotStart = 0;
   var changeDir = false;

   if (Phaser.Math.chanceRoll()) {
      rotStart = 1;
   }
   else {
      rotStart = -1;
   }

   var totalAddedDeg = 0;

   while (this.checkIntersection(this.line) && totalAddedDeg < (2*Math.PI)) {
      if (changeDir) {
         changeDir = false;
         rotStart *= -1;
      }
      else {
         totalAddedDeg += Phaser.Math.degToRad(degStep);
      }

      this.line.fromAngle(this.world.x, this.world.y, angle + (rotStart * totalAddedDeg), this.speed);
   }

   angle += totalAddedDeg;

   this.body.velocity.x = Math.cos(angle) * this.speed;
   this.body.velocity.y = Math.sin(angle) * this.speed;

   this.setAnimation(Phaser.Math.radToDeg(angle));
   this.game.time.events.add(1000, this.setIdle, this);
}

Frog.prototype.setIdle = function(){
   this.body.velocity.x = 0;
   this.body.velocity.y = 0;

   this.animations.stop();
   this.frame = 0;

   // setup next jump
   var nextJump = this.game.rnd.integerInRange(500, 2000);
   this.game.time.events.add(nextJump, this.jump, this);
}

Frog.prototype.setAnimation = function(deg) {

   if (deg < -45.0 && deg > -135.0)
     this.animations.play('east');
   else if (deg < -135.0 || deg > 145.0)
     this.animations.play('north');
   else if (deg < 145.0 && deg > 45.0)
     this.animations.play('west');
   else
     this.animations.play('south');
}

Frog.prototype.checkIntersection = function(ray) {

   for (var i = 0, len = this.allLines.length; i < len; i++) {
      if (Phaser.Line.intersects(ray, this.allLines[i])) {
         return true;
      }
   }

   return false;
}
