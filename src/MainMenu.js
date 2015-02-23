KnugenGame.MainMenu = function(game){

};
KnugenGame.MainMenu.prototype = {
	create: function(){
		var background = this.add.sprite(0, 0, 'menuBackground');

		var text = this.add.text(KnugenGame.WIDTH/2,
									KnugenGame.HEIGHT-50,
									'(Tryck för att bli Knugen)', // Va fan ska man skriva liksom?
									{ font: "10px Arial"});
		text.anchor.setTo(0.5);

		this.game.input.onDown.add(this.startGame, this);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
