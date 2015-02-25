KnugenGame.Game = function(game){

};

KnugenGame.Game.prototype = {
	create: function(){
		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display ground
		this.add.sprite(0, 0, 'background');

		// Create Drottningholm
		this.castle = new Castle(this.game);

		// Create Knugen
		this.knugen = new Knugen(this.game);

		// Create Crowns
		this.crowns = new Crowns(this.game, this.knugen, 30, 0);

		this.game.time.events.loop(Phaser.Timer.SECOND*6, this.releaseFrog, this);
	},

	update: function(){
		this.game.physics.arcade.collide(this.knugen, this.castle);
		this.game.physics.arcade.overlap(this.knugen, this.crowns, this.collectCrown, null, this);
	},

	releaseFrog: function() {
		
		// Open the gate
		this.castle.openGate();
		
		// Release a frog

		// close gate
		this.game.time.events.add(Phaser.Timer.SECOND*3, this.castle.closeGate, this.castle);
	},

	collectCrown: function(theKnug, crown) {
		crown.kill();
	}
};
