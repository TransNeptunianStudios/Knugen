Castle = function(game) {

   this.game = game;

   Phaser.Group.call(this, game);
   this.physicsBodyType = Phaser.Physics.ARCADE;
   this.enableBody = true;

   var dholm = this.create(0, 0, 'castle');
   dholm.body.immovable = true;

   this.leftGate = this.create(this.game.width/2-20, 80, 'left_gate');
   this.leftGate.anchor.setTo(0.0, 0.5);
   this.leftGate.body.immovable = true;


   this.rightGate = this.create(this.game.width/2+20, 80, 'right_gate');
   this.rightGate.anchor.setTo(1.0, 0.5);
   this.rightGate.body.immovable = true;
}

Castle.prototype = Object.create(Phaser.Group.prototype);
Castle.prototype.constructor = Castle;

Castle.prototype.openGate = function() {
   this.game.add.tween(this.leftGate.scale).to({x: 0.05}, 2000, Phaser.Easing.Quadratic.In, true);
   this.game.add.tween(this.rightGate.scale).to({x: 0.05}, 2000, Phaser.Easing.Quadratic.In, true);
}

Castle.prototype.closeGate = function() {
   this.game.add.tween(this.leftGate.scale).to({x: 1.0}, 2000, Phaser.Easing.Quadratic.In, true);
   this.game.add.tween(this.rightGate.scale).to({x: 1.0}, 2000, Phaser.Easing.Quadratic.In, true);
}