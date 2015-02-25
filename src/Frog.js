Frog = function(game, pos, knugen) {
   this.game = game;
   this.knugen = knugen;
   this.speed = 20;

   Phaser.Sprite.call(this, game, pos.x, pos.y-20, 'frog');
   game.add.existing(this);
   game.physics.arcade.enable(this);
   this.anchor.setTo(0.5);
   this.body.collideWorldBound = true;

   this.scale.setTo(0.0, 0.0);
   var enteringTween = game.add.tween(this.scale).to({x: 1.0, y: 1.0}, 2000, Phaser.Easing.Linear.None, true, 1000);
   enteringTween.onComplete.add(this.jump, this);
}

Frog.prototype = Object.create(Phaser.Sprite.prototype);
Frog.prototype.constructor = Frog;

Frog.prototype.update = function() {
}

Frog.prototype.jump = function() {

   var distToKnugen = this.game.physics.arcade.distanceToXY(this.knugen.x, this.knugen.y);
   var normKnugVec = new Phaser.Point(this.knugen.x - this.x, this.knugen.y - this.y).normalize();
   var targetX = this.x + normKnugVec.x * this.speed;
   var targetY = this.y + normKnugVec.y * this.speed;

   this.game.add.tween(this).to({x: targetX, y: targetY}, 1000, Phaser.Easing.Linear.None, true, 600);
   this.game.add.tween(this.scale).to({x: 1.2, y: 1.2}, 600, Phaser.Easing.Quadratic.InOut, true, 500, 0, true);
   this.game.time.events.add(3000, this.jump, this);
}