KnugenGame.Credits = function(game){

};
KnugenGame.Credits.prototype = {
   create: function(){
      var background = this.add.sprite(0, 0, 'menuBackground');

      // Credits
      var text = "Programming\nRobin Reicher\nMikael Larsson\n\nArt\nDavid Levi";
      var style = { font: "15px Arial", fill: "#000000", align: "center" };
      var credits = this.game.add.text(KnugenGame.WIDTH/2, 100, text, style);
      credits.anchor.setTo(0.5, 0);

      this.game.input.onDown.add(this.startGame, this);
   },
   startGame: function() {
      // Back to the main menu
      this.state.start('MainMenu');
   }
};
