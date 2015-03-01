KnugenGame.GameOver = function(game){

};
KnugenGame.GameOver.prototype = {
   create: function(){
      var background = this.add.sprite(0, 0, 'gameOverScreen');
      var bubble = this.add.sprite(20, 80, 'bubble');
      
      // defined in grodor.json
      var totalGrodor = grodor.length;
      var groda = this.game.rnd.pick(grodor);

      var header = this.add.text(this.game.width/2, 20, "Groda " + groda.nr + " / " + totalGrodor + ": ",{ font: "20px Arial"});
      header.anchor.setTo(0.5, 0.5);
      var comment = this.add.text(this.game.width/2, 35, groda.comment + ", (" + groda.year + ")",{ font: "10px Arial"});
      comment.anchor.setTo(0.5, 0);
      comment.wordWrap = true;
      comment.wordWrapWidth = 190;

      var quote = this.add.text(30, 85, "\"" + groda.quote + "\"",{ font: "15px Arial"});
      quote.wordWrap = true;
      quote.wordWrapWidth = 190;

      this.add.text(30, 220, "Kronor: " + this.game.points, { font: "20px Arial"});

      this.game.input.onDown.add(this.restartGame, this);
      },
      restartGame: function() {
      // start the Game state
      this.state.start('MainMenu');
   }
};
