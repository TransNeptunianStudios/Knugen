KnugenGame.GameOver = function(game){

};
KnugenGame.GameOver.prototype = {
  create: function(){
    var background = this.add.sprite(0, 0, 'gameOverScreen');

    this.game.input.onDown.add(this.restartGame, this);
  },
  restartGame: function() {
    // start the Game state
    this.state.start('MainMenu');
  }
};
