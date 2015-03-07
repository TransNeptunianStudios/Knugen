Frog = function(game, pos, physicalGroup, knugen) {
   this.game = game;
   this.knugen = knugen;
   this.speed = 30;
   this.frog = true;
   this.physicalGroup = physicalGroup;
   this.croakSound = this.game.add.audio('croak', 0.9, false);

   bmd = game.make.bitmapData(128, 48);
   bmd.load('frog');
   // Color tone
   var tonesList =[{r: 128, g: 255, b: 0},
                  {r: 0, g: 128, b: 0},
                  {r: 150, g: 150, b: 0},
                  {r: 120, g: 150, b: 0},
                  {r: 0, g: 80,  b: 0}];
   var tone = game.rnd.pick(tonesList);
   bmd.replaceRGB(255, 150, 255, 255,
                  tone.r,tone.g, tone.b, 255);
   game.cache.addSpriteSheet('dynamic', '', bmd.canvas, 15, 14, 20, 0, 0);
   Phaser.Sprite.call(this, game, pos.x, pos.y-1, 'dynamic');

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

   this.allLines = [];

   this.physicalGroup.forEach(function(sprite) {
      if (!sprite.frog && !sprite.knugen) {
         var leftX = sprite.x - sprite.anchor.x * sprite.body.width;
         var topY = sprite.y - sprite.anchor.y * sprite.body.height;

         this.allLines.push(new Phaser.Line(leftX,
                                            topY,
                                            leftX + sprite.body.width,
                                            topY));
         this.allLines.push(new Phaser.Line(leftX,
                                            topY,
                                            leftX,
                                            topY + sprite.body.height));
         this.allLines.push(new Phaser.Line(leftX + sprite.body.width,
                                            topY,
                                            leftX + sprite.body.width,
                                            topY + sprite.body.height));
         this.allLines.push(new Phaser.Line(leftX,
                                            topY + sprite.body.height,
                                            leftX + sprite.body.width,
                                            topY + sprite.body.height));
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
   this.setAnimation(90);

   this.croak();
   this.game.time.events.add(1000, this.setIdle, this);
}

Frog.prototype.jump = function() {

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

Frog.prototype.checkIntersection = function(ray) {

   for (var i = 0, len = this.allLines.length; i < len; i++) {
      if (Phaser.Line.intersects(ray, this.allLines[i])) {
         return true;
      }
   }

   return false;
}
