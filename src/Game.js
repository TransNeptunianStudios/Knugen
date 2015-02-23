Knugen.Game = function(game){
};

Knugen.Game.prototype = {
	create: function(){
		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display background
		this.add.sprite(0, 0, 'background');

		var castle = this.add.sprite(	Knugen.WIDTH/2,	50, 'castle');
		castle.anchor.setTo(0.5);

		var gate = this.add.sprite(	Knugen.WIDTH/2, 80, 'gate');
		gate.anchor.setTo(0.5);

		this.knugen = new Kungen(this.game);
		this.game.add.existing(this.knugen);
	},
	update: function(){
	}
};
