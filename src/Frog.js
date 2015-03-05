Frog = function(game, pos, knugen) {
   this.game = game;
   this.knugen = knugen;
   this.speed = 30;
   this.frog = true;
   this.croakSound = this.game.add.audio('croak', 0.9, false);

   Phaser.Sprite.call(this, game, pos.x, pos.y-1, 'frog');

   game.add.existing(this);
   game.physics.arcade.enable(this);

   // All animations, frame 0 is "idle"
   this.animations.add('north', [4, 5, 6, 7, 8], 10, true);
   this.animations.add('west', [9, 10, 11, 12, 13], 10, true);
   this.animations.add('south', [14, 15, 16, 17, 18], 10, true);
   this.animations.add('east', [19, 20, 21, 22, 23], 10, true);

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

   this.croak();
   this.game.time.events.add(1000, this.setIdle, this);
}

Frog.prototype.jump = function() {

   var distToKnugen = this.game.physics.arcade.distanceToXY(this.knugen.x, this.knugen.y);
   var angle;

   if(Phaser.Math.chanceRoll()){
      var angle = this.game.physics.arcade.angleBetween(this, this.knugen);
      var normKnugVec = new Phaser.Point(this.knugen.x - this.x, this.knugen.y - this.y).normalize();

      this.body.velocity.x = normKnugVec.x * this.speed;
      this.body.velocity.y = normKnugVec.y * this.speed;
   }else{
      var angle = Phaser.Math.degToRad(this.game.rnd.angle());
      this.body.velocity.x = Math.cos(angle) * this.speed;
      this.body.velocity.y = Math.sin(angle) * this.speed;
   }
   this.setAnimation(Phaser.Math.radToDeg(angle));
   this.croak();
   this.game.time.events.add(1000, this.setIdle, this);
}

Frog.prototype.setIdle = function(){
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

   // setup next jump
   var nextJump = this.game.rnd.integerInRange(500, 2000);
   this.game.time.events.add(nextJump, this.jump, this);
}

Frog.prototype.setAnimation = function(deg) {

   if (deg < -45.0 && deg > -135.0)
     this.animations.play('north');
   else if (deg < -135.0 || deg > 145.0)
     this.animations.play('west');
   else if (deg < 145.0 && deg > 45.0)
     this.animations.play('south');
   else
     this.animations.play('east');
}

Frog.prototype.croak = function() {
   if(this.game.rnd.integerInRange(0, 5) > 4)
      this.croakSound.play();
}
