Kungen = function(game) {

   Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2, 'kungen0');

   game.physics.arcade.enable(this);

   this.inputEnabled = true;
   this.anchor.setTo(0.5);
   this.body.collideWorldBound = true;
   this.body.allowRotation = false;
   this.currentImage = 0;
   this.imageMap = { '0' : 'kungen0', '1' : 'kungen90', '2' : 'kungen180', '3' : 'kungen270' }
}

Kungen.prototype = Object.create(Phaser.Sprite.prototype);
Kungen.prototype.constructor = Kungen;

Kungen.prototype.update = function() {
   if (this.game.input.activePointer.isDown) {
      var radToPointer = this.game.physics.arcade.angleToPointer(this, this.game.input.activePointer);
      this.body.velocity = this.game.physics.arcade.velocityFromRotation(radToPointer, 60);
      this.updateImage(Phaser.Math.radToDeg(radToPointer));
   }
   else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
   }
}

Kungen.prototype.updateImage = function(deg) {

   var imageIndex = -1;

   if (deg < -45.0 && deg > -135.0) {
      imageIndex = 0;
   }
   else if (deg < -135.0 || deg > 145.0) {
      imageIndex = 1;
   }
   else if (deg < 145.0 && deg > 45.0) {
      imageIndex = 2;
   }
   else {
      imageIndex = 3;
   }

   if (imageIndex != this.currentImage) {
      this.currentImage = imageIndex;
      this.loadTexture(this.imageMap[this.currentImage]);
   }
}