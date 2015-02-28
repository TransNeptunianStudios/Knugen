KnugenGame.GameOver = function(game){

};
KnugenGame.GameOver.prototype = {
   create: function(){
      var background = this.add.sprite(0, 0, 'gameOverScreen');

      // defined in grodor.json
      var totalGrodor = grodor.length;
      var groda = this.game.rnd.pick(grodor);

      this.add.text(30, 30, "Groda " + groda.nr + " / " + totalGrodor + ": ",{ font: "20px Arial"});
      this.add.text(30, 50, "\"" + groda.quote + "\"",{ font: "15px Arial"});
      this.add.text(30, 80, groda.comment,{ font: "10px Arial"});
      this.add.text(30, 95, groda.year,{ font: "10px Arial"});

      this.game.input.onDown.add(this.restartGame, this);
      },
      restartGame: function() {
      // start the Game state
      this.state.start('MainMenu');
   }
};
