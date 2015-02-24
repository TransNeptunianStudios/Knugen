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

		this.knugen = new Knugen(this.game);
		this.game.add.existing(this.knugen);

		this.crowns = new Crowns(this.game, this.knugen, 30, 0);
	},

	update: function(){
		this.game.physics.arcade.collide(this.knugen, this.castle);
		this.game.physics.arcade.overlap(this.knugen, this.crowns, this.collectCrown, null, this);
		this.releaseFrog();
	},

	releaseFrog: function(){
		// Open the gate

		// Release a frog

		// close gate
	},

	collectCrown: function(theKnug, crown) {
		crown.kill();
	}
};
