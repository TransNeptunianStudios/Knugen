KnugenGame.Preloader = function(game){
	KnugenGame.WIDTH = 240;
	KnugenGame.HEIGHT = 400;
};
KnugenGame.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#FFFFFF';
		this.preloadBar = this.add.sprite((KnugenGame.WIDTH-311)/2,
										  								(KnugenGame.HEIGHT-27)/2,
																			'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		// load images
		this.load.image('menuBackground', 'assets/Menu_background.png');
		this.load.image('background', 'assets/Background.png');
		this.load.image('castle', 'assets/Castle.png');
		this.load.image('gate', 'assets/Gate.png');
		this.load.image('kungen0', 'assets/Tmp_knugen_0.png');
		this.load.image('kungen90', 'assets/Tmp_knugen_90.png');
		this.load.image('kungen180', 'assets/Tmp_knugen_180.png');
		this.load.image('kungen270', 'assets/Tmp_knugen_270.png');
		this.load.image('frog', 'assets/Frog.png');

		// load spritesheets
		//this.load.spritesheet('button-start', 'assets/button-start.png', 200, 100);

		// Load music
		//  Firefox doesn't support mp3 files, so use ogg
		//this.load.audio('bgMusic', 'assets/audio/bensound-jazzyfrenchy.ogg');
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
