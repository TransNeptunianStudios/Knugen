KnugenGame.MainMenu = function(game){

};
KnugenGame.MainMenu.prototype = {
	create: function(){
		var background = this.add.sprite(0, 0, 'menuBackground');

		var text = "(Tryck för att bli Knugen)";
		var style = { font: "10px Arial", fill: "#000000", align: "center" };
		var startText = this.game.add.text(KnugenGame.WIDTH/2, 200, text, style);
		startText.anchor.setTo(0.5, 0);

		var text = "Version: 0.2 Beta";
		var style = { font: "10px Arial", fill: "#000000", align: "center" };
		var version = this.game.add.text(5, 385, text, style);

		this.game.input.onDown.add(this.startGame, this);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
