Kungen = function(game) {
   Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2, 'kungen');

   game.physics.arcade.enable(this);

   this.inputEnabled = true;
   this.anchor.setTo(0.5);
   this.body.collideWorldBound = true;
   this.body.allowRotation = false;
}

Kungen.prototype = Object.create(Phaser.Sprite.prototype);
Kungen.prototype.constructor = Kungen;

Kungen.prototype.update = function() {
   if (this.game.input.activePointer.isDown) {

      var angToP = this.game.physics.arcade.angleToPointer(this, this.game.input.activePointer);
      this.body.velocity = this.game.physics.arcade.velocityFromRotation(angToP, 60);
   }
   else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
   }
}
