KnugenGame.Game = function(game){

};

KnugenGame.Game.prototype = {
	create: function(){
		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display background
		this.add.sprite(0, 0, 'background');

		this.castle = this.add.sprite(	KnugenGame.WIDTH/2,	50, 'castle');
		this.castle.anchor.setTo(0.5);
		this.game.physics.arcade.enable(this.castle);
		this.castle.body.immovable = true;

		var gate = this.add.sprite(	KnugenGame.WIDTH/2, 80, 'gate');
		gate.anchor.setTo(0.5);

		this.Knugen = new Knugen(this.game);
		this.game.add.existing(this.Knugen);
	},
	update: function(){
		this.game.physics.arcade.collide(this.Knugen, this.castle);
	}
};
