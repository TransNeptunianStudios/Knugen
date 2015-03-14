KnugenGame.Credits = function(game){

};
KnugenGame.Credits.prototype = {
   create: function(){
      this.add.sprite(0, 0, 'menuBackground');

      // Tns stuff
      var text = "Trans-neptunian-studios";
      var style = { font: "17px Arial", fill: "#000000", align: "center" };
      var TnsLogo = this.game.add.text(KnugenGame.WIDTH/2, 50, text, style);
      TnsLogo.anchor.setTo(0.5, 0);

      var text = "http://trans-neptunian-studios.com/";
      var style = { font: "15px Arial", fill: "#000000", align: "center" };
      var tnsLink = this.game.add.text(KnugenGame.WIDTH/2, 70, text, style);
      tnsLink.anchor.setTo(0.5, 0);
      tnsLink.inputEnabled = true;
      tnsLink.events.onInputDown.add(this.redirect, this);

      // Credits
      var text = "Programming\nRobin Reicher\nMikael Larsson\n\nArt\nDavid Levi";
      var style = { font: "13px Arial", fill: "#000000", align: "center" };
      var credits = this.game.add.text(KnugenGame.WIDTH/2, 120, text, style);
      credits.anchor.setTo(0.5, 0);

      this.game.input.onDown.add(this.startGame, this);
   },
   redirect: function(){
      var url = "http://trans-neptunian-studios.com";
      $(location).attr('href',url);
   },
   startGame: function() {
      // Back to the main menu
      this.state.start('MainMenu');
   }
};
