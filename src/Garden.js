Garden = function(game) {
   Phaser.Group.call(this, game);
   this.physicsBodyType = Phaser.Physics.ARCADE;
   this.enableBody = true;

   // create all mazes
   var maze1 = this.create(19, 258, 'maze');
   maze1.body.immovable = true;

   var maze2 = this.create(19, 332, 'maze');
   maze2.body.immovable = true;

   var maze3 = this.create(132, 258, 'maze');
   maze3.body.immovable = true;

   var maze3 = this.create(132, 332, 'maze');
   maze3.body.immovable = true;

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
