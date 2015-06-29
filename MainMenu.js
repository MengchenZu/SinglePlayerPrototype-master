
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

        this.count = 0;

        //background
        this.game.add.image(0, 0, 'background');

        //nameLabel
        var nameLabel = this.game.add.text(this.game.world.centerX, 80, 'Fruit Bang',
            { font: '60px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);

        //nameLabel tween
        var tween = this.game.add.tween(nameLabel);
        tween.to({angle: -2}, 500);
        tween.to({angle: 2}, 500);
        tween.to({angle: 0}, 250);
        tween.loop();
        tween.start();

        //startLabel
        var startLabel = this.game.add.text(this.game.world.centerX, this.game.world.height-80,
            'press the left or right arrow key to\n        choose player and start',
            { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);

        //moving player
        this.player1 = this.game.add.sprite(160, this.game.world.centerY, 'panda');
        this.player1.anchor.setTo(0.5, 0.5);
        this.player1.scale.setTo(2, 2);
        this.player1.animations.add('down', [0, 1, 2, 3], 4, true);
        this.player1.animations.play('down', 10, true, false);

        this.player2 = this.game.add.sprite(320, this.game.world.centerY, 'player2', 5);
        this.player2.anchor.setTo(0.5, 0.5);
        this.player2.scale.setTo(4.5, 4.5);
        this.player2.animations.add('down', [5, 8, 11], 4, true);
        this.player2.animations.play('down', 10, true, false);

        // itembar
        this.itembar = this.game.add.sprite(416, 400, 'itembar');
        this.itembar.anchor.setTo(0.5, 0.5);
        this.itembar.scale.setTo(0.32, 0.64);

        //item
        this.fertilizericon = this.game.add.sprite(368, 400, 'fertilizer');
        this.fertilizericon.anchor.setTo(0.5, 0.5);
        this.seedicon = this.game.add.sprite(432, 400, 'seed');
        this.seedicon.anchor.setTo(0.5, 0.5);
        this.seedicon.scale.setTo(0.8, 0.8);
        if(this.game.global.fertilizernumber != 0) {
            this.numberfertilizer = this.game.add.text(400, 402, this.game.global.fertilizernumber,
                { font: 'bold 26px Arial', fill: '#ff0000' });
        }
        else {
            this.numberfertilizer = this.game.add.text(400, 402, '0',
                { font: 'bold 26px Arial', fill: '#ff0000' });
        }
        this.numberfertilizer.anchor.setTo(0.5, 0.5);

        if(this.game.global.seednumber != 0) {
            this.numberseed = this.game.add.text(464, 402, this.game.global.seednumber,
                {font: 'bold 26px Arial', fill: '#ff0000'});
        }
        else {
            this.numberseed = this.game.add.text(464, 402, '0',
                { font: 'bold 26px Arial', fill: '#ff0000' });
        }
        this.numberseed.anchor.setTo(0.5, 0.5);

        //start
        this.cursors = this.game.input.keyboard.createCursorKeys();

        // Berries
        this.berries = this.game.add.group();

        // Emitter
        this.emitter = this.game.add.emitter(0, 0);
        this.emitter.gravity = 0;
        this.emitter.minRotation = 0;
        this.emitter.maxRotation = 0;
        this.emitter.bounce.setTo(0.5, 0.5);
        this.emitter.setXSpeed(-50, 50);
        this.emitter.setYSpeed(-50, 50);


        this.hitButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function () {

		//	Do some nice funky main menu effect here
        //this.startGame();

        /*if (this.cursors.left.isDown) {
            // Move to the left
            this.game.global.player = 0;
            this.startGame();
        }
        else if (this.cursors.right.isDown) {
            // Move to the right
            this.game.global.player = 1;
            this.startGame();
        }*/

        if (this.hitButton.isDown) {
            // Move to the left
            this.game.global.player = 0;
            this.startGame();
        }

        if (this.cursors.up.isDown) {
            // Move to the left
            this.game.global.game = 0;
        }
        else if (this.cursors.down.isDown) {
            // Move to the right
            this.game.global.game = 1;
        }

        if(this.count > 60) {
            this.count -= 60;
        }
        this.count++;
        if(this.count % 60 === 0) {
            this.releaseBerry();
        }
	},

	startGame: function (pointer) {
		//	And start the actual game
        if(this.game.global.game === 1) {
            this.state.start('Gameadvanture');
        }
        else {
            this.state.start('Gamebonus');
        }


	},

    releaseBerry: function() {

        var x = this.game.rnd.integerInRange(0,480);
        var y = this.game.rnd.integerInRange(0,416);

        var berry = this.berries.create(x, y, 'berry');
        berry.anchor.setTo(0.5, 0.5);
        var childIndex = this.berries.getChildIndex(berry);
        // Basic Timed Event
        this.game.add.tween(berry.scale).to({x: 0.3, y: 0.3}, 500).to({x: 1.0, y: 1.0}, 500).start().loop();
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.explosion, this, x, y + 16, berry);
    },

    explosion: function(x, y, berry) {
        this.berries.remove(berry);

        this.emitter.x = x;
        this.emitter.y = y;

        this.emitter.makeParticles('p_berry', 1, 10, true, true);
        this.emitter.explode(2000, 10);

    }
};


