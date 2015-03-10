KnugenGame.Highscore = function(game){
};
KnugenGame.Highscore.prototype = {
   create: function(){

      // Get our highscore
      $.ajax({
         context: this,
         url: 'php/getHighscore.php',
         type: 'GET',
         success: this.gotHighScore
      });

      this.add.sprite(0, 0, 'gameOverScreen');
      this.add.sprite(100, 270, 'KnugGroda');

      var graphics = this.game.add.graphics( 0, 0);
      graphics.beginFill(0xFFFFFF, 1);
      graphics.drawRoundedRect(10, 10, 220, 290, 10);
      graphics.alpha = 0.5;

      // Header
      var text = "HighScore";
      var style = { font: "20px Arial", fill: "#000000", align: "center" };
      var header = this.game.add.text(KnugenGame.WIDTH/2, 10, text, style);
      header.anchor.setTo(0.5, 0);

      // Score
      var text = "Score: " + this.game.points;
      var style = { font: "15px Arial", fill: "#000000", align: "center" };
      var score = this.game.add.text(15, 330, text, style);
      score.anchor.setTo(0, 0);

      // Best
      var text = "Best: " + this.compareScore(this.game.points);
      var style = { font: "15px Arial", fill: "#000000", align: "center" };
      var best = this.game.add.text(15, 350, text, style);
      best.anchor.setTo(0, 0);

      // Frogs Seen
      var text = "Grodor: " + this.getFrogProgress();
      var style = { font: "15px Arial", fill: "#000000", align: "center" };
      var frogsSeen = this.game.add.text(15, 370, text, style);
      frogsSeen.anchor.setTo(0, 0);

      graphics.beginFill(0xFFFFFF, 1);
      graphics.drawRoundedRect(10, 320, frogsSeen.width + 10, 73, 10);
      graphics.alpha = 0.5;

      this.game.input.onDown.add(this.startGame, this);
   },
   gotHighScore: function(data){
      var highscore = JSON.parse(data);

      // Sort list
      highscore.sort(function(a, b){
         return b.score - a.score;
      });

      var style = { font: "10px Arial", fill: "#000000", align: "center" };
      var y = 50
      for(i = 0; i < highscore.length; ++i){
         this.game.add.text(20, y, i+1, style);
         this.game.add.text(80, y, highscore[i].nick, style);
         this.game.add.text(200, y, highscore[i].score, style);
         y += 20;
      }
   },
   compareScore: function(score){
      if (!this.supports_html5_storage()) { console.log("NOO"); return false; }

      var best = localStorage.getItem("BestLocal");
      if(!best || best < score){
         localStorage["BestLocal"] = score;
         return score;
      }
      return best;
   },
   getFrogProgress: function(){
      if (!this.supports_html5_storage()) {
          console.log("NOO"); return "-";
          }

      var frogsSeen = JSON.parse(localStorage.getItem("Frogs"));

      return frogsSeen.length + "/" + grodor.length;
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
