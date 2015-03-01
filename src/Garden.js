Garden = function(game) {
   Phaser.Group.call(this, game);
   this.physicsBodyType = Phaser.Physics.ARCADE;
   this.enableBody = true;

   var mid = game.world.width /3;

   // create all mazes
   var maze1 = this.create(mid-17, 265, 'maze');
   maze1.anchor.setTo(0.5, 0);
   maze1.body.immovable = true;

   var maze2 = this.create(mid*2 + 17, 265, 'maze');
   maze2.anchor.setTo(0.5, 0);
   maze2.body.immovable = true;

   // Create Fountains
   var big = this.create(120, 180, 'fountainBig');
   big.anchor.setTo(0.5, 1);
   big.body.height = 23;
   big.body.immovable = true;

   var small1 = this.create(65, 230, 'fountainSmall');
   small1.anchor.setTo(0.5, 1);
   small1.body.height = 15;
   small1.body.immovable = true;

   var small2 = this.create(175, 230, 'fountainSmall');
   small2.anchor.setTo(0.5, 1);
   small2.body.height = 15;
   small2.body.immovable = true;
}

Garden.prototype = Object.create(Phaser.Group.prototype);
Garden.prototype.constructor = Garden;
