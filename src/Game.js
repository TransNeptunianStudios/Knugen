KnugenGame.Game = function(game){

};

KnugenGame.Game.prototype = {
	create: function(){
		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display ground
		this.add.sprite(0, 0, 'background');

		// Create Drottningholm
		this.castle = this.add.sprite(	KnugenGame.WIDTH/2,	50, 'castle');
		this.castle.anchor.setTo(0.5);
		this.game.physics.arcade.enable(this.castle);
		this.castle.body.immovable = true;
		this.gate = this.add.sprite(KnugenGame.WIDTH/2, 80, 'gate');
		this.gate.anchor.setTo(0.5);

		this.Knugen = new Knugen(this.game);
		this.game.add.existing(this.Knugen);

		this.releaseFrog();
	},
	update: function(){
		this.game.physics.arcade.collide(this.Knugen, this.castle);

	},
	releaseFrog: function(){
		// Open the gate

		// Release a frog

		// close gate
	}
};
