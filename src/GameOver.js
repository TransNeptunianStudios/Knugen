KnugenGame.GameOver = function(game){

};
KnugenGame.GameOver.prototype = {
   create: function(){
      var background = this.add.sprite(0, 0, 'gameOverScreen');

      // defined in grodor.json
      var totalGrodor = grodor.length;
      var groda = this.game.rnd.pick(grodor);

      this.add.text(30, 30, "Kronor: " + this.game.points, { font: "20px Arial"});
      this.add.text(30, 50, "Groda " + groda.nr + " / " + totalGrodor + ": ",{ font: "20px Arial"});
      this.add.text(30, 70, "\"" + groda.quote + "\"",{ font: "15px Arial"});
      this.add.text(30, 100, groda.comment,{ font: "10px Arial"});
      this.add.text(30, 115, groda.year,{ font: "10px Arial"});

      this.game.input.onDown.add(this.restartGame, this);
      },
      restartGame: function() {
      // start the Game state
      this.state.start('MainMenu');
   }
};
