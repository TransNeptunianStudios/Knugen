KnugenGame.Game = function(game){

};

KnugenGame.Game.prototype = {
	create: function(){
		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display ground
		var bg = this.add.sprite(0, 0, 'background');

		// Create Drottningholm
		this.castle = new Castle(this.game);

		// Create Knugen
		this.knugen = new Knugen(this.game);

		// Create Crowns
		this.crowns = new Crowns(this.game, this.knugen, 30, 0);

		this.frogs = this.game.add.group();

		this.game.time.events.loop(Phaser.Timer.SECOND*6, this.releaseFrog, this);
	},

	update: function(){
		this.frogs.sort('y', Phaser.Group.SORT_ASCENDING);
		this.game.physics.arcade.collide(this.knugen, this.castle);
		this.game.physics.arcade.overlap(this.knugen, this.crowns, this.collectCrown, null, this);
		this.game.physics.arcade.overlap(this.knugen, this.frogs, this.killKnugen, null, this);
	},

	releaseFrog: function() {
		
		// Open the gate
		this.castle.openGate();
		
		// Spawn a frog
		this.frogs.add(new Frog(this.game, this.castle.centerFloor, this.knugen));

		// close gate
		this.game.time.events.add(Phaser.Timer.SECOND*3, this.castle.closeGate, this.castle);
	},

	collectCrown: function(theKnug, crown) {
		crown.kill();
	},

	killKnugen: function(theKnug, frog) {
		theKnug.kill();
	}
};
