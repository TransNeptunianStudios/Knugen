Frog = function(game, pos, knugen) {
   this.game = game;
   this.knugen = knugen;
   this.speed = 30;

   Phaser.Sprite.call(this, game, pos.x, pos.y, 'frog');

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

   if(Phaser.Math.chanceRoll()){
      var angleBetween = this.game.physics.arcade.angleBetween(this, this.knugen);
      this.setAnimation(Phaser.Math.radToDeg(angleBetween));

      var normKnugVec = new Phaser.Point(this.knugen.x - this.x, this.knugen.y - this.y).normalize();

      this.body.velocity.x = normKnugVec.x * this.speed;
      this.body.velocity.y = normKnugVec.y * this.speed;
   }else{
      var angle = Phaser.Math.degToRad(this.game.rnd.angle());
      this.body.velocity.x = Math.cos(angle) * this.speed;
      this.body.velocity.y = Math.sin(angle) * this.speed;
   }
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
