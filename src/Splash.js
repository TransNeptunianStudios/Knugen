KnugenGame.Splash = function(game){
};
KnugenGame.Splash.prototype = {
   create: function(){

      var logo = this.add.sprite(this.game.width/2, this.game.height/2, 'TNSlogo');
      logo.anchor.setTo(0.5);
      logo.scale.setTo(0.6);
      var fadeTween = this.game.add.tween(logo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 3000);
      fadeTween.onComplete.add(this.startGame, this);
      fadeTween.start();

      this.game.input.onDown.add(this.startGame, this);

      var music = this.game.add.audio('bgMusic', 0.7, true);
      music.play();
   },
   startGame: function() {
      // start the Game state
      this.state.start('MainMenu');
   }
};
