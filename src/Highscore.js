KnugenGame.Highscore = function(game){

};
KnugenGame.Highscore.prototype = {
   create: function(){
      this.add.sprite(0, 0, 'gameOverScreen');
      this.add.sprite(100, 270, 'KnugGroda');

      // Header
      var text = "HighScore";
      var style = { font: "20px Arial", fill: "#000000", align: "center" };
      var header = this.game.add.text(KnugenGame.WIDTH/2, 10, text, style);
      header.anchor.setTo(0.5, 0);

      // gör en get och läs in den json fil som skapas med highscore?

      // Score
      var text = "Score: " + this.game.points;
      var style = { font: "15px Arial", fill: "#000000", align: "center" };
      var header = this.game.add.text(25, 300, text, style);
      header.anchor.setTo(0, 0);

      // Best
      var text = "Best: " + this.compareScore(this.game.points);
      var style = { font: "15px Arial", fill: "#000000", align: "center" };
      var header = this.game.add.text(25, 320, text, style);
      header.anchor.setTo(0, 0);

      this.game.input.onDown.add(this.startGame, this);
   },
   compareScore: function(score){
      if (!this.supports_html5_storage()) { console.log("NOO"); return false; }

      var best = localStorage.getItem("BestLocal");
      console.log("best: " + best);
      if(!best || best < score){
         localStorage["BestLocal"] = score;
         return score;
      }
      return best;
   },
   supports_html5_storage: function () {
      try {
         return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
         return false;
      }
   },
   startGame: function() {
      // start the Game state
      this.state.start('MainMenu');
   }
};
