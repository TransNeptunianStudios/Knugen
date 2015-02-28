Knugen = function(game) {

   Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2, 'knugen');

   game.add.existing(this);

   game.physics.arcade.enable(this);

   // All animations, frame 0 is "idle"
   this.animations.add('north', [1, 2, 3], 10, true);
   this.animations.add('east', [4, 5, 6], 10, true);
   this.animations.add('south', [7, 8, 9], 10, true);
   this.animations.add('west', [10, 11, 12], 10, true);

   this.inputEnabled = true;
   this.anchor.setTo(0.5);
   this.body.collideWorldBound = true;
   this.body.allowRotation = false;
}

Knugen.prototype = Object.create(Phaser.Sprite.prototype);
Knugen.prototype.constructor = Knugen;

Knugen.prototype.update = function() {
   if (this.game.input.activePointer.isDown) {
      var radToPointer = this.game.physics.arcade.angleToPointer(this, this.game.input.activePointer);
      this.body.velocity = this.game.physics.arcade.velocityFromRotation(radToPointer, 60);
      this.setAnimation(Phaser.Math.radToDeg(radToPointer));
   }
   else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      this.animations.stop();
      this.frame = 0;
   }
}

Knugen.prototype.setAnimation = function(deg) {

   if (deg < -45.0 && deg > -135.0)
     this.animations.play('east');
   else if (deg < -135.0 || deg > 145.0)
     this.animations.play('north');
   else if (deg < 145.0 && deg > 45.0)
     this.animations.play('west');
   else
     this.animations.play('south');
}
