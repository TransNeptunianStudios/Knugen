KnugenGame.Highscore = function(game){

};
KnugenGame.Highscore.prototype = {
   create: function(){
      this.add.sprite(0, 0, 'gameOverScreen');
      this.add.sprite(100, 270, 'KnugGroda');

      // Header
      var text = "HighScore";
      var style = { font: "20px Arial", fill: "#000000", align: "center" };
      var header = this.game.add.text(KnugenGame.WIDTH/2, 20, text, style);
      header.anchor.setTo(0.5, 0);

      // gör en get och läs in den json fil som skapas med highscore?

      this.game.input.onDown.add(this.startGame, this);
   },
   startGame: function() {
      // start the Game state
      this.state.start('MainMenu');
   }
};
