Knugen.Preloader = function(game){
	Knugen.WIDTH = 240;
	Knugen.HEIGHT = 400;
};
Knugen.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#FFFFFF';
		this.preloadBar = this.add.sprite((Knugen.WIDTH-311)/2,
										  								(Knugen.HEIGHT-27)/2,
																			'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		// load images
		this.load.image('menuBackground', 'assets/Menu_background.png');
		this.load.image('background', 'assets/Background.png');
		this.load.image('castle', 'assets/Castle.png');
		this.load.image('gate', 'assets/Gate.png');
		this.load.image('kungen', 'assets/Tmp_knugen.png');

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
