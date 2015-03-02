KnugenGame.Preloader = function(game){
	KnugenGame.WIDTH = 240;
	KnugenGame.HEIGHT = 400;
};
KnugenGame.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#000000';
		this.preloadBar = this.add.sprite( (KnugenGame.WIDTH-311)/2
													, (KnugenGame.HEIGHT-27)/2
													, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		// load images
		this.load.image('TNSlogo', 'assets/TNS_logo.png');
		this.load.image('menuBackground', 'assets/Menu_background.png');
		this.load.image('gameOverScreen', 'assets/GameOverScreen.png');
		this.load.image('garden', 'assets/Garden.png');
		this.load.image('castle', 'assets/Castle.png');
		this.load.image('left_gate', 'assets/LeftGate.png');
		this.load.image('right_gate', 'assets/RightGate.png');
		this.load.image('crown', 'assets/Crown.png');
		this.load.image('maze', 'assets/Maze.png');
		this.load.image('fountainSmall', 'assets/Fountain_small.png');
		this.load.image('fountainBig', 'assets/Fountain_big.png');

		// load spritesheets
		this.load.spritesheet('knugen', 'assets/Knugen.png', 16, 32);
		this.load.spritesheet('frog', 'assets/Frog.png', 16, 16);

		// Load music
		//  Firefox doesn't support mp3 files, so use ogg
		//this.load.audio('croak1', 'assets/audio/Croak1.ogg');
	},
	create: function(){
		// start the MainMenu state
		this.state.start('Splash');
	}
};
