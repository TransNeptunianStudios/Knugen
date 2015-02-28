Garden = function(game) {

   // display ground
   game.add.sprite(0, 0, 'garden');

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
}

Garden.prototype = Object.create(Phaser.Group.prototype);
Garden.prototype.constructor = Garden;
