Knugen = function(game) {

  this.knugen = true;

   Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2, 'knugen');

   game.add.existing(this);

   game.physics.arcade.enable(this);

   // All animations, frame 0 is "idle"
   this.animations.add('north', [4, 5, 6, 7, 8, 9, 10, 11], 15, true);
   this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 15, true);
   this.animations.add('south', [20, 21, 22, 23, 24, 25, 26, 27], 15, true);
   this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);
   this.frame = 2;

   this.inputEnabled = true;
   this.anchor.setTo(0, 1);
   this.body.collideWorldBounds = true;

   // Change Knug hitbox, only body, not head
   this.body.height = 17;
}

Knugen.prototype = Object.create(Phaser.Sprite.prototype);
Knugen.prototype.constructor = Knugen;

Knugen.prototype.update = function() {
   var distToKnug = this.game.physics.arcade.distanceBetween(this.game.input.activePointer, this);

   if (this.game.input.activePointer.isDown
      && distToKnug > 5) {
      var radToPointer = this.game.physics.arcade.angleToPointer(this, this.game.input.activePointer);
      this.body.velocity = this.game.physics.arcade.velocityFromRotation(radToPointer, 60);
      this.setAnimation(Phaser.Math.radToDeg(radToPointer));
   }
   else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      switch(this.animations.name) {
         case 'north':
            this.frame = 0;
         break;
         case 'west':
            this.frame = 1;
         break;
         case 'south':
            this.frame = 2;
         break;
         case 'east':
            this.frame = 3;
         break;
      }
      this.animations.stop();
   }
}

Knugen.prototype.setAnimation = function(deg) {

   if (deg < -45.0 && deg > -135.0)
     this.animations.play('north');
   else if (deg < -135.0 || deg > 145.0)
     this.animations.play('west');
   else if (deg < 145.0 && deg > 45.0)
     this.animations.play('south');
   else
     this.animations.play('east');
}
