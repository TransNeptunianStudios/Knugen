KnugenGame.Splash = function(game){
};
KnugenGame.Splash.prototype = {
   create: function(){

      var logo = this.add.sprite(this.game.width/2, this.game.height/2, 'TNSlogo');
      logo.anchor.setTo(0.5);
      logo.scale.setTo(0.6);

      var music = this.game.add.audio('bgMusic', 0.7, true);
      //music.play();

      // Music credits
      var text = "Music:\nMinstrel Guild - Kevin MacLeod";
      var style = { font: "10px Arial", fill: "#FFFFFF", align: "center" };
      var credits = this.game.add.text(KnugenGame.WIDTH/2, 370, text, style);
      credits.anchor.setTo(0.5, 0);

      var logoFade = this.game.add.tween(logo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 3000);
      var creditFade = this.game.add.tween(credits).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 3000);
      creditFade.onComplete.add(this.startGame, this);
      creditFade.start();

      this.game.input.onDown.add(this.startGame, this);
   },
   startGame: function() {
      // start the Game state
      this.state.start('MainMenu');
   }
};
