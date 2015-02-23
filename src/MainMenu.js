Knugen.MainMenu = function(game){

};
Knugen.MainMenu.prototype = {
	create: function(){
		var background = this.add.sprite(0, 0, 'menuBackground');

		var text = this.add.text(Knugen.WIDTH/2,
									Knugen.HEIGHT-50,
									'(Tryck för att bli knugen)', // Va fan ska man skriva liksom?
									{ font: "10px Arial"});
		text.anchor.setTo(0.5);

		this.game.input.onDown.add(this.startGame, this);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
