KnugenGame.Game = function(game){

};

KnugenGame.Game.prototype = {
	create: function(){

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.setBounds(0, 0, this.game.width, this.game.height);

		// display ground
		this.game.add.sprite(0, 0, 'garden');
		this.clouds = this.game.add.tileSprite(0, 0, this.game.width, 23, 'clouds');

		this.physicalGroup = this.game.add.group();
		this.physicalGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.physicalGroup.enableBody = true;

		// Create garden
		this.garden = new Garden(this.game, this.physicalGroup);

		// Create Drottningholm
		this.castle = new Castle(this.game, this.physicalGroup);
		this.gateSound = this.game.add.audio('gate', 0.5, false);

		// Create Knugen
		this.knugen = new Knugen(this.game);
		this.physicalGroup.add(this.knugen);

		// Create Crowns
		this.crowns = new Crowns(this.game, this.physicalGroup, this.knugen, 30, 0);
		this.croakSound = this.game.add.audio('crown', 0.9, false);

		this.game.points = 0;
		var crown = this.game.add.sprite(2, 2, 'crown');
		var style = { font: "14px Arial", fill: "#000000", align: "center" };
		this.pointsText = this.game.add.text(20, 3, '', style);
		this.pointsText.setText(this.game.points); // why is this needed?

		this.game.time.events.loop(Phaser.Timer.SECOND*5, this.releaseFrog, this);
	},

	update: function(){
		// move clouds
		this.clouds.tilePosition.x -= 0.1;

		this.game.physics.arcade.overlap(this.knugen, this.crowns, this.collectCrown, null, this);
		this.game.physics.arcade.overlap(this.physicalGroup, this.crowns, this.collectCrown, null, this);
		this.game.physics.arcade.overlap(this.knugen, this.physicalGroup, this.killKnugen, null, this);

		this.game.physics.arcade.collide(this.physicalGroup, this.castle);
		this.game.physics.arcade.collide(this.physicalGroup,this.physicalGroup);

		// depth sorting
		this.physicalGroup .sort('y', Phaser.Group.SORT_DECENDING);
	},
	releaseFrog: function() {
		// Open the gate
		this.castle.openGate();
		this.gateSound.play();

		// Spawn a frog
		this.physicalGroup.add(new Frog(this.game, this.castle.centerFloor, this.physicalGroup, this.knugen));

		// close gate
		this.game.time.events.add(Phaser.Timer.SECOND*1.5, this.castle.closeGate, this.castle);
	},

	collectCrown: function(collector, crown) {
		crown.kill();
		this.crowns.scheduleNewCrown();

		if(collector.knugen){
			this.croakSound.play();
			this.game.points++;
			this.pointsText.setText(this.game.points);
		}
	},

	killKnugen: function(theKnug, stuff) {
		if(stuff.frog){
			theKnug.kill();
			this.state.start('GameOver');
		}

	}
};
