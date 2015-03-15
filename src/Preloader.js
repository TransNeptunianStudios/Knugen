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
		this.load.image('menuBackground', 'assets/Menu.png');
		this.load.image('title', 'assets/Knugen_Title.png');
		this.load.image('gameOverScreen', 'assets/GameOverScreen.png');
		this.load.image('garden', 'assets/Garden.png');
		this.load.image('clouds', 'assets/Clouds.png');
		this.load.image('castle', 'assets/Castle.png');
		this.load.image('left_gate', 'assets/LeftGate.png');
		this.load.image('right_gate', 'assets/RightGate.png');
		this.load.image('crown', 'assets/Crown.png');
		this.load.image('maze', 'assets/Maze.png');
		this.load.image('fountainSmall', 'assets/Small fountain.png');
		this.load.image('KnugGroda', 'assets/Grodknugen.png');
		this.load.image('frog', 'assets/Frog.png');

		// load spritesheets
		this.load.spritesheet('knugen', 'assets/Knugen.png', 19, 32);
		this.load.spritesheet('fountainBig', 'assets/Hero fountain.png', 50, 50);

		// Load music
		//  Firefox doesn't support mp3 files, so use ogg
		this.load.audio('bgMusic', 'assets/audio/Minstrel_Guild.ogg');
		this.load.audio('croak', 'assets/audio/13598_weldonsmith_frog1alien.ogg');
		this.load.audio('crown', 'assets/audio/Crown.ogg');
		this.load.audio('gate', 'assets/audio/Gate.ogg');
		this.load.audio('death', 'assets/audio/Death.ogg');

	},
	create: function(){
		// start the MainMenu state
		this.state.start('Splash');
	}
};
