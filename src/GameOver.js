KnugenGame.GameOver = function(game){

};
KnugenGame.GameOver.prototype = {
   create: function(){
      var background = this.add.sprite(0, 0, 'gameOverScreen');
      var background = this.add.sprite(100, 270, 'KnugGroda');

      // defined in grodor.json
      var totalGrodor = grodor.length;
      var groda = this.game.rnd.pick(grodor);

      // Header
      var text = "Groda " + groda.nr + " / " + totalGrodor + ": ";
      var style = { font: "20px Arial", fill: "#000000", align: "center" };
      var header = this.game.add.text(KnugenGame.WIDTH/2, 10, text, style);
      header.anchor.setTo(0.5, 0);

      // Comment
      var text = groda.comment + " (" + groda.year + ")";
      var style = { font: "10px Arial", fill: "#000000", align: "center" };
      var comment = this.game.add.text(KnugenGame.WIDTH/2, 35, text, style);
      comment.anchor.setTo(0.5, 0);
      comment.wordWrapWidth = 200;
      comment.wordWrap = true;

      var bubbleStart = comment.y + comment.height +10;
      var graphics = this.game.add.graphics( 0, 0);
      var style = { font: "13px Arial", fill: "#000000", align: "left" };
      var quote = this.game.add.text(25, bubbleStart+ 10, groda.quote, style);
      quote.wordWrapWidth = 190;
      quote.wordWrap = true;

      // draw a speach bubble
      graphics.beginFill(0xFFFFFF, 1);
      graphics.drawRoundedRect(20, bubbleStart, quote.width+10, 20 + quote.height, 10);

      graphics.moveTo(50,quote.height + bubbleStart);
      graphics.lineTo(90, quote.height + bubbleStart);
      graphics.lineTo(130, 265);
      graphics.endFill();

      // Will be changed to some highscore list
      this.add.text(10, 350, "Kronor: " + this.game.points, { font: "10px Arial"});

      this.game.input.onDown.add(this.restartGame, this);
      },
      restartGame: function() {
      // start the Game state
      this.state.start('Highscore');
   }
};
