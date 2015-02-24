Knugen.Game = function(game){

};

Knugen.Game.prototype = {
	create: function(){
		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display background
		this.add.sprite(0, 0, 'background');

		this.castle = this.add.sprite(	Knugen.WIDTH/2,	50, 'castle');
		this.castle.anchor.setTo(0.5);
		this.game.physics.arcade.enable(this.castle);
		this.castle.body.immovable = true;

		var gate = this.add.sprite(	Knugen.WIDTH/2, 80, 'gate');
		gate.anchor.setTo(0.5);

		this.knugen = new Kungen(this.game);
		this.game.add.existing(this.knugen);

		this.crowns = new Crowns(this.game, this.knugen, 30, 0);
	},
	update: function(){
		this.game.physics.arcade.collide(this.knugen, this.castle);
		this.game.physics.arcade.overlap(this.knugen, this.crowns, collectCrown, null, this);
	}
};

function collectCrown(theKnug, crown) {
	crown.kill();
}