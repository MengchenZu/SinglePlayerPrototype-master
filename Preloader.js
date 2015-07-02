
BasicGame.Preloader = function (game) {

};

BasicGame.Preloader.prototype = {

	preload: function () {
		//	Here we load the rest of the assets our game needs.
        this.game.load.image('tiles', 'assets/map10.png');
        this.game.load.tilemap('map', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('panda', 'assets/panda.png', 48, 66);
        this.game.load.spritesheet('player2', 'assets/player2.png', 32, 32);
        this.game.load.spritesheet('obstacle01', 'assets/obstacle01.png', 32, 32);
        this.game.load.spritesheet('number', 'assets/number.png', 16, 32);

        this.game.load.image('background','assets/background.png');
        this.game.load.image('berry', 'assets/berry.png');
        this.game.load.image('p_berry', 'assets/p_berry.png');
        this.game.load.image('itembar','assets/itembar.png');
        this.game.load.image('fertilizer','assets/fertilizer.png');
        this.game.load.image('seed','assets/seed.png');
        this.game.load.image('enhance','assets/enhance.png');
        this.game.load.image('invincible','assets/invincible.png');
        this.game.load.image('shoe','assets/shoe.png');
        this.game.load.image('tree','assets/tree.png');
        this.game.load.image('poison','assets/poison.png');
        this.game.load.image('clock','assets/clock.png');


    },

	create: function () {

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		this.state.start('MainMenu');
	}

};
