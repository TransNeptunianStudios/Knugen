KnugenGame.Game = function(game){

};

KnugenGame.Game.prototype = {
	create: function(){
		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.setBounds(0, 0, this.game.width, this.game.height);

		// display ground
		this.game.add.sprite(0, 0, 'garden');

		// Group with all that needs depth sorting
		// Doesnt really work, because of weird anchors?
		// http://www.html5gamedevs.com/topic/3995-is-it-possible-to-sort-nested-groups/
		this.depthSortGroup = this.game.add.group();

		// Create garden
		this.garden = new Garden(this.game);
		this.depthSortGroup.add(this.garden);

		// Create Drottningholm
		this.castle = new Castle(this.game);

		// Create Knugen
		this.knugen = new Knugen(this.game);
		this.depthSortGroup.add(this.knugen);

		// Create Crowns
		this.crowns = new Crowns(this.game, this.knugen, 30, 0);

		this.frogs = this.game.add.group();
		this.depthSortGroup.add(this.frogs);

		this.game.time.events.loop(Phaser.Timer.SECOND*5, this.releaseFrog, this);
	},

	update: function(){
		this.depthSortGroup.sort('y', Phaser.Group.SORT_DECENDING);

		this.game.physics.arcade.collide(this.knugen,this.garden);
		this.game.physics.arcade.collide(this.knugen, this.castle);
		this.game.physics.arcade.overlap(this.knugen, this.crowns, this.collectCrown, null, this);
		this.game.physics.arcade.overlap(this.knugen, this.frogs, this.killKnugen, null, this);

		this.game.physics.arcade.collide(this.frogs,this.garden);
	},

	releaseFrog: function() {
		// Open the gate
		this.castle.openGate();

		// Spawn a frog
		this.frogs.add(new Frog(this.game, this.castle.centerFloor, this.knugen));

		// close gate
		this.game.time.events.add(Phaser.Timer.SECOND*1.5, this.castle.closeGate, this.castle);
	},

	collectCrown: function(theKnug, crown) {
		crown.kill();
	},

	killKnugen: function(theKnug, frog) {
		theKnug.kill();
		this.state.start('GameOver');
	}
};
