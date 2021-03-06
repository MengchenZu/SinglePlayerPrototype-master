
BasicGame.Gameadvanture = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Gameadvanture.prototype = {
    create: function () {

        this.speed = 100;
        this.fruitnumber = 1;
        this.shoenumber = 0;
        this.enhancenumber = 0;
        this.treenumber = 0;
        this.invinciblenumber = 0;
        this.emitterspeed = 320;
        this.emittertime = 120;

        // Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Map
        this.map = this.add.tilemap('map');

        // The first parameter is the tileset name as specified in Tiled, the second is the key to the asset.
        this.map.addTilesetImage('map10', 'tiles');

        // Create layer
        this.blockedLayer = this.map.createLayer('Tile Layer 1');
        this.map.setCollision(8, true, this.blockedLayer);

        // Berries
        this.berries = this.game.add.group();

        // Obstacles
        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.map.createFromObjects('Object Layer 1', 9, 'obstacle01', 0, true, false, this.obstacles);
        this.obstacles.callAll('animations.add', 'animations', 'explode', [0, 1, 2, 3, 4, 5], 6, true);
        this.obstacles.setAll('body.immovable', true);

        // Kill obstacle after the animation is finished
        this.obstacles.forEach(function(obstacle) {
            obstacle.events.onAnimationComplete.add(function(){
                obstacle.kill();
            }, this);
        }, this);


        // Player
        if(this.game.global.player === 0) {
            this.player = this.game.add.sprite(48, 48, 'panda');
            this.player.anchor.setTo(0.5, 0.75);
            this.player.animations.add('down', [0, 1, 2, 3], 4, true);
            this.player.animations.add('left', [4, 5, 6, 7], 4, true);
            this.player.animations.add('right', [8, 9, 10, 11], 4, true);
            this.player.animations.add('up', [12, 13, 14, 15], 4, true);

            this.game.physics.arcade.enable(this.player);

            // This adjusts the collision body size.
            this.player.body.setSize(10, 10, 0, 0);
        }
        else {
            this.player = this.game.add.sprite(46, 26, 'player2', 5);
            this.player.anchor.setTo(0.5, 0.5);
            this.player.animations.add('down', [5, 8, 11], 4, true);
            this.player.animations.add('left', [6, 3, 9], 4, true);
            this.player.animations.add('right', [1, 4, 7], 4, true);
            this.player.animations.add('up', [0, 2, 10], 4, true);

            this.game.physics.arcade.enable(this.player);

            // This adjusts the collision body size.
            this.player.body.setSize(5, 5, -1, 20);
            this.player.scale.setTo(2.25, 2.25);
        }

        // Emitter
        this.emitter = this.game.add.emitter(0, 0);
        this.emitter.gravity = 0;
        this.emitter.minRotation = 0;
        this.emitter.maxRotation = 0;
        this.emitter.bounce.setTo(0.5, 0.5);
        this.emitter.setXSpeed(-100, 100);
        this.emitter.setYSpeed(-100, 100);

        //Emittercross
        this.emitter1 = this.game.add.emitter(0, 0, this.enhancenumber + 1);
        this.emitter1.makeParticles('p_berry');
        this.emitter1.setYSpeed(this.emitterspeed, this.emitterspeed);
        this.emitter1.setXSpeed(0, 0);
        this.emitter1.gravity = 0;
        this.emitter2 = this.game.add.emitter(0, 0, 1);
        this.emitter2.makeParticles('p_berry');
        this.emitter2.setYSpeed(-this.emitterspeed, -this.emitterspeed);
        this.emitter2.setXSpeed(0, 0);
        this.emitter2.gravity = 0;
        this.emitter3 = this.game.add.emitter(0, 0, 1);
        this.emitter3.makeParticles('p_berry');
        this.emitter3.setYSpeed(0, 0);
        this.emitter3.setXSpeed(this.emitterspeed, this.emitterspeed);
        this.emitter3.gravity = 0;
        this.emitter4 = this.game.add.emitter(0, 0, 1);
        this.emitter4.makeParticles('p_berry');
        this.emitter4.setYSpeed(0, 0);
        this.emitter4.setXSpeed(-this.emitterspeed, -this.emitterspeed);
        this.emitter4.gravity = 0;

        // itembar
        this.itembar = this.game.add.sprite(352, 400, 'itembar');
        this.itembar.anchor.setTo(0.5, 0.5);
        this.itembar.scale.setTo(0.64, 0.64);

        //item
        this.shoeicon = this.game.add.sprite(240, 400, 'shoe');
        this.shoeicon.anchor.setTo(0.5, 0.5);
        this.treeicon = this.game.add.sprite(304, 400, 'tree');
        this.treeicon.anchor.setTo(0.5, 0.5);
        this.enhanceicon = this.game.add.sprite(368, 400, 'enhance');
        this.enhanceicon.anchor.setTo(0.5, 0.5);
        this.invincibleicon = this.game.add.sprite(432, 400, 'invincible');
        this.invincibleicon.anchor.setTo(0.5, 0.5);
        this.numbershoe = this.game.add.text(272, 402, '0',
            { font: 'bold 26px Arial', fill: '#ff0000' });
        this.numbershoe.anchor.setTo(0.5, 0.5);
        this.numbertree = this.game.add.text(336, 402, '0',
            { font: 'bold 26px Arial', fill: '#ff0000' });
        this.numbertree.anchor.setTo(0.5, 0.5);
        this.numberenhance = this.game.add.text(400, 402, '0',
            { font: 'bold 26px Arial', fill: '#ff0000' });
        this.numberenhance.anchor.setTo(0.5, 0.5);
        this.numberinvincible = this.game.add.text(464, 402, '0',
            { font: 'bold 26px Arial', fill: '#ff0000' });
        this.numberinvincible.anchor.setTo(0.5, 0.5);

        //timer
        this.clock = this.game.add.sprite(16, 400, 'clock');
        this.clock.anchor.setTo(0.5, 0.5);
        this.clock.scale.setTo(0.15, 0.13);
        this.timerbar = this.game.add.sprite(64, 400, 'itembar');
        this.timerbar.anchor.setTo(0.5, 0.5);
        this.timerbar.scale.setTo(0.16, 0.64);
        this.numbertime = this.game.add.text(62, 402, 100,
            { font: 'bold 26px Arial', fill: '#ff0000' });
        this.numbertime.anchor.setTo(0.5, 0.5);
        this.game.time.reset();

        //itemgroup
        this.shoes = this.game.add.group();
        this.shoes.enableBody = true;
        this.enhances = this.game.add.group();
        this.enhances.enableBody = true;
        this.trees = this.game.add.group();
        this.trees.enableBody = true;
        this.invincibles = this.game.add.group();
        this.invincibles.enableBody = true;
        this.invincibletween = this.game.add.tween(this.player.scale).to({x: 0.8, y: 0.8}, 500).to({x: 1.0, y: 1.0}, 500).loop();
        this.poisons = this.game.add.group();
        this.poisons.enableBody = true;

        //Surrounding
        this.marker = new Phaser.Point();
        this.directions = [ null, null, null, null, null];
        this.directionObject = [0, 0, 0, 0, 0];

        //Explosiontest
        this.markerexplosion = new Phaser.Point();
        //use directions[0]

        /**
         // Keyboard
         upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
         upKey.onDown.add(function() {
            this.player.loadTexture('panda_up', 0);
            this.player.animations.add('walk');
            this.player.animations.play('walk', 10, true);

            this.player.body.velocity.y = 0;
            this.player.body.velocity.y -= this.speed;
        }, this);

         downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
         downKey.onDown.add(function() {
            this.player.loadTexture('panda_down', 0);
            this.player.animations.add('walk');
            this.player.animations.play('walk', 10, true);

            this.player.body.velocity.y = 0;
            this.player.body.velocity.y += this.speed;
        }, this);

         leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
         leftKey.onDown.add(function() {
            this.player.loadTexture('panda_left', 0);
            this.player.animations.add('walk');
            this.player.animations.play('walk', 10, true);

            this.player.body.velocity.x = 0;
            this.player.body.velocity.x -= this.speed;
        }, this);

         rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
         rightKey.onDown.add(function() {
            this.player.loadTexture('panda_right', 0);
            this.player.animations.add('walk');
            this.player.animations.play('walk', 10, true);

            this.player.body.velocity.x = 0;
            this.player.body.velocity.x += this.speed;
        }, this);
         **/

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.hitButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {

        // Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.game.physics.arcade.collide(this.emitter, this.blockedLayer);
        if(this.invinciblenumber === 0) {
            this.game.physics.arcade.overlap(this.emitter, this.player, this.quitGame, null, this);
        }

        //item
        this.game.physics.arcade.overlap(this.emitter, this.obstacles, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.shoes, this.addnumbershoe, null, this);
        this.game.physics.arcade.overlap(this.player, this.enhances, this.addnumberenhance, null, this);
        this.game.physics.arcade.overlap(this.player, this.trees, this.addnumbertree, null, this);
        this.game.physics.arcade.overlap(this.player, this.invincibles, this.addnumberinvincible, null, this);
        this.game.physics.arcade.overlap(this.player, this.poisons, this.addnumberpoison, null, this);

        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.player, this.obstacles);

        //Emittercross
        this.game.physics.arcade.collide(this.emitter1, this.blockedLayer, this.disappear, null, this);
        this.game.physics.arcade.overlap(this.emitter1, this.obstacles, this.collisionHandler, null, this);
        this.game.physics.arcade.collide(this.emitter2, this.blockedLayer, this.disappear, null, this);
        this.game.physics.arcade.overlap(this.emitter2, this.obstacles, this.collisionHandler, null, this);
        this.game.physics.arcade.collide(this.emitter3, this.blockedLayer, this.disappear, null, this);
        this.game.physics.arcade.overlap(this.emitter3, this.obstacles, this.collisionHandler, null, this);
        this.game.physics.arcade.collide(this.emitter4, this.blockedLayer, this.disappear, null, this);
        this.game.physics.arcade.overlap(this.emitter4, this.obstacles, this.collisionHandler, null, this);
        if(this.invinciblenumber === 0) {
            this.game.physics.arcade.overlap(this.emitter1, this.player, this.quitGame, null, this);
        }
        if(this.invinciblenumber === 0) {
            this.game.physics.arcade.overlap(this.emitter2, this.player, this.quitGame, null, this);
        }
        if(this.invinciblenumber === 0) {
            this.game.physics.arcade.overlap(this.emitter3, this.player, this.quitGame, null, this);
        }
        if(this.invinciblenumber === 0) {
            this.game.physics.arcade.overlap(this.emitter4, this.player, this.quitGame, null, this);
        }

        // console.log(this.player.x , this.player.y);

        this.move();

        this.timer();
    },

    additem: function(x, y) {
        var z = this.game.rnd.integerInRange(1,10);
        if(z >= 1 && z <= 2) {
            var shoe = this.shoes.create(x + 16, y + 16, 'shoe');
            shoe.anchor.setTo(0.5, 0.5);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.flicker, this, shoe);
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.disappear, this, shoe);
        }
        else if(z >= 3 && z <= 4) {
            var tree = this.trees.create(x + 16, y + 16, 'tree');
            tree.anchor.setTo(0.5, 0.5);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.flicker, this, tree);
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.disappear, this, tree);
        }
        else if(z >= 5 && z <= 6) {
            var enhance = this.enhances.create(x + 16, y + 16, 'enhance');
            enhance.anchor.setTo(0.5, 0.5);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.flicker, this, enhance);
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.disappear, this, enhance);
        }
        else if(z >= 7 && z <= 8) {
            var invincible = this.invincibles.create(x + 16, y + 16, 'invincible');
            invincible.anchor.setTo(0.5, 0.5);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.flicker, this, invincible);
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.disappear, this, invincible);
        }
        else if(z == 9) {
            var poison = this.poisons.create(x + 16, y + 16, 'poison');
            poison.anchor.setTo(0.5, 0.5);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.flicker, this, poison);
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.disappear, this, poison);
        }
    },

    addnumberenhance: function(player, enhance) {
        this.enhancenumber++;
        this.numberenhance.text = this.enhancenumber;
        this.emittertime += 100;
        enhance.kill();
    },

    addnumberinvincible: function(player, invincible) {
        this.invinciblenumber = 1;
        this.numberinvincible.text = this.invinciblenumber;
        this.invincibletween = this.game.add.tween(this.player.scale).to({x: 0.8, y: 0.8}, 500).to({x: 1.0, y: 1.0}, 500).start().loop();
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.stopinvincible, this,this.invincibletween);
        invincible.kill();
    },

    addnumberpoison: function(player, poison) {
        this.shoenumber = 0;
        this.numbershoe.text = this.shoenumber;
        this.speed = 100;
        this.enhancenumber = 0;
        this.numberenhance.text = this.enhancenumber;
        this.emittertime = 100;
        this.treenumber = 0;
        this.numbertree.text = this.treenumber;
        this.fruitnumber = 1;
        this.invincibletween.stop();
        this.invinciblenumber = 0;
        this.numberinvincible.text = this.invinciblenumber;
        poison.kill();
    },

    addnumbershoe: function(player, shoe) {
        if(this.shoenumber < 4) {
            this.shoenumber++;
            this.numbershoe.text = this.shoenumber;
            this.speed += 20;
        }
        shoe.kill();
    },

    addnumbertree: function(player, tree) {
        this.treenumber++;
        this.numbertree.text = this.treenumber;
        this.fruitnumber++;
        tree.kill();
    },

    checkSurrounding: function() {
        this.directionObject = [0, 0, 0, 0, 0];

        //Surrounded
        this.marker.x = this.game.math.snapToFloor(Math.floor(this.player.x), 32) / 32;
        this.marker.y = this.game.math.snapToFloor(Math.floor(this.player.y), 32) / 32;

        var i = this.blockedLayer.index;
        var x = this.marker.x;
        var y = this.marker.y;

        this.directions[1] = this.map.getTileLeft(i, x, y);
        this.directions[2] = this.map.getTileRight(i, x, y);
        this.directions[3] = this.map.getTileAbove(i, x, y);
        this.directions[4] = this.map.getTileBelow(i, x, y);

        var p = [(x - 1) * 32, y * 32];
        var q = [(x + 1) * 32, y * 32];
        var s = [x * 32, (y - 1) * 32];
        var t = [x * 32, (y + 1) * 32];

        for(i = 0;i < this.obstacles.length; i++) {
            this.obstacle = this.obstacles.getAt(i);
            var a = this.obstacle.x;
            var b = this.obstacle.y;
            var c = this.obstacle.alive;

            if(c === false) {
                continue;
            }

            if(a === p[0] && b === p[1]) {
                this.directionObject[1] = 1;
            }
            if(a === q[0] && b === q[1]) {
                this.directionObject[2] = 1;
            }
            if(a === s[0] && b === s[1]) {
                this.directionObject[3] = 1;
            }
            if(a === t[0] && b === t[1]) {
                this.directionObject[4] = 1;
            }
        }
    },

    collisionHandler: function(berry, obstacle) {
        if(obstacle.alive == true) {
            var x = obstacle.x;
            var y = obstacle.y;
            this.game.time.events.add(Phaser.Timer.SECOND, this.additem, this, x, y);
        }
        berry.kill();
        obstacle.animations.play('explode', 6, false, true);
        obstacle.alive = false;
    },

    disappear: function (item) {
        item.kill();
    },

    disappearobstacle: function (obstacle) {
        if(obstacle.alive == true) {
            var x = obstacle.x;
            var y = obstacle.y;
            this.game.time.events.add(Phaser.Timer.SECOND, this.additem, this, x, y);
        }
        obstacle.animations.play('explode', 6, false, true);
        obstacle.alive = false;
    },

    explosion: function(x, y, berry) {
        this.berries.remove(berry);

        this.emitter.x = x;
        this.emitter.y = y;

        this.emitter.makeParticles('p_berry', 1, 10, true, true);
        this.emitter.explode(500, 10);

        this.fruitnumber++;
    },

    explosioncross: function(x, y, berry) {
        this.berries.remove(berry);
        this.fruitnumber++;

        this.emitter1.x = x;
        this.emitter1.y = y;
        this.emitter1.start(true, this.emittertime, null, 1);
        this.emitter2.x = x;
        this.emitter2.y = y;
        this.emitter2.start(true, this.emittertime, null, 1);
        this.emitter3.x = x;
        this.emitter3.y = y;
        this.emitter3.start(true, this.emittertime, null, 1);
        this.emitter4.x = x;
        this.emitter4.y = y;
        this.emitter4.start(true, this.emittertime, null, 1);
    },

    explosiontest: function(x, y, berry) {
        this.berries.remove(berry);
        this.fruitnumber++;
        var p = x - 16;
        var q = y - 16;
        var p1 = p / 32;
        var q1 = q / 32;
        var r = this.emitterspeed * this.emittertime / 1000;

        var flag1 = Math.floor(this.player.x / 32) === Math.floor(x / 32);
        var flag2 = Math.floor(this.player.y / 32) === Math.floor(y / 32);
        var flag3 = 1;
        var flag4 = 1;
        var j;
        var k;
        var x0;
        var y0;

        this.markerexplosion.x = this.game.math.snapToFloor(Math.floor(this.player.x), 32) / 32;
        this.markerexplosion.y = this.game.math.snapToFloor(Math.floor(this.player.y), 32) / 32;
        x0 = this.markerexplosion.x;
        y0 = this.markerexplosion.y;
        if(flag1 == 1 && this.player.y <= y + r && this.player.y >= y - r && this.invinciblenumber === 0) {
            if(this.player.y <= y + r && this.player.y >= y) {
                for(j = q1 + 1;j < y0; j++) {
                    k = this.blockedLayer.index;
                    this.directions[0] = this.map.getTile(x0, j, k);
                    console.log(x0, j, this.directions[0].index);
                    if(this.directions[0].index === 8) {
                        flag3 = 0;
                        break;
                    }
                }
            }
            if(this.player.y >= y - r && this.player.y <= y) {
                for(j = q1 - 1;j > y0; j--) {
                    k = this.blockedLayer.index;
                    this.directions[0] = this.map.getTile(x0, j, k);
                    console.log(x0, j, this.directions[0].index);
                    if(this.directions[0].index === 8) {
                        flag3 = 0;
                        break;
                    }
                }
            }
            if(flag3 === 1) {
               this.quitGame();
            }
        }
        else if(flag2 == 1 && this.player.x <= x + r && this.player.x >= x - r && this.invinciblenumber === 0) {
            if(this.player.x <= x + r && this.player.x >= x) {
                for(j = p1 + 1;j < x0; j++) {
                    k = this.blockedLayer.index;
                    this.directions[0] = this.map.getTile(j, y0, k);
                    console.log(j, y0, this.directions[0].index);
                    if(this.directions[0].index === 8) {
                        flag4 = 0;
                        break;
                    }
                }
            }
            if(this.player.x >= x - r && this.player.x <= x) {
                for(j = p1 - 1;j > x0; j--) {
                    k = this.blockedLayer.index;
                    this.directions[0] = this.map.getTile(j, y0, k);
                    console.log(j, y0, this.directions[0].index);
                    if(this.directions[0].index === 8) {
                        flag4 = 0;
                        break;
                    }
                }
            }
            if(flag4 === 1) {
                this.quitGame();
            }
        }

        for(var i = 0;i < this.obstacles.length; i++) {
            this.obstacle = this.obstacles.getAt(i);
            var c = this.obstacle.alive;

            if(c === false) {
                continue;
            }
            var a = this.obstacle.x;
            var b = this.obstacle.y;
            var a1 = a / 32;
            var b1 = b / 32;
            flag3 = 1;
            flag4 = 1;

            if(a === p && b <= q + r && b >= q - r) {
                if(b <= q + r && b >= q) {
                    for(j = q1 + 1;j < b1; j++) {
                        k = this.blockedLayer.index;
                        this.directions[0] = this.map.getTile(a1, j, k);
                        if(this.directions[0].index === 8) {
                            flag3 = 0;
                            break;
                        }
                    }
                }
                if(b >= q - r && b <= q) {
                    for(j = q1 - 1;j > b1; j--) {
                        k = this.blockedLayer.index;
                        this.directions[0] = this.map.getTile(a1, j, k);
                        if(this.directions[0].index === 8) {
                            flag3 = 0;
                            break;
                        }
                    }
                }
                if(flag3 === 1) {
                    this.game.time.events.add(Phaser.Timer.SECOND * Math.abs(b - q) / 32 * 0.1, this.disappearobstacle, this, this.obstacle);
                }
            }
            else if(b === q && a <= p + r && a >= p - r) {
                if(a <= p + r && a >= p) {
                    for(j = p1 + 1;j < a1; j++) {
                        k = this.blockedLayer.index;
                        this.directions[0] = this.map.getTile(b1, j, k);
                        if(this.directions[0].index === 8) {
                            flag4 = 0;
                            break;
                        }
                    }
                }
                if(a >= p - r && a <= p) {
                    for(j = p1 - 1;j > a1; j--) {
                        k = this.blockedLayer.index;
                        this.directions[0] = this.map.getTile(b1, j, k);
                        if(this.directions[0].index === 8) {
                            flag4 = 0;
                            break;
                        }
                    }
                }
                if(flag4 === 1) {
                    this.game.time.events.add(Phaser.Timer.SECOND * Math.abs(a - p) /32 * 0.1, this.disappearobstacle, this, this.obstacle);
                }
            }
        }
    },

    flicker: function (item) {
        this.game.add.tween(item.scale).to({x: 0.3, y: 0.3}, 500).to({x: 1.0, y: 1.0}, 500).start().loop();
    },

    move: function() {
        // Reset the players velocity (Movement)
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        this.hitButton.onDown.add(this.releaseBerry,this);

        var flagx = this.game.math.fuzzyEqual(this.player.x % 32, 16, 4);
        var flagy = this.game.math.fuzzyEqual(this.player.y % 32, 16, 4);

        if(flagx == 1 && flagy == 1) {
            if(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
                this.checkSurrounding();
            }

            if (this.cursors.left.isDown) {
                // Move to the left
                if(this.directions[1].index !== 8 && this.directionObject[1] === 0) {
                    this.player.animations.play('left', 10, true);
                    this.player.body.velocity.x = -this.speed;
                    this.game.global.statex = -1;
                }
                else {
                    this.player.animations.play('left', 10, true);
                }
            }
            else if (this.cursors.right.isDown) {
                // Move to the right
                if(this.directions[2].index !== 8 && this.directionObject[2] === 0) {
                    this.player.animations.play('right', 10, true);
                    this.player.body.velocity.x = this.speed;
                    this.game.global.statex = 1;
                }
                else {
                    this.player.animations.play('right', 10, true);
                }
            }
            else if (this.cursors.up.isDown) {
                // Move to the up
                if(this.directions[3].index !== 8 && this.directionObject[3] === 0) {
                    this.player.animations.play('up', 10, true);
                    this.player.body.velocity.y = -this.speed;
                    this.game.global.statey = -1;
                }
                else {
                    this.player.animations.play('up', 10, true);
                }
            }
            else if (this.cursors.down.isDown) {
                // Move to the down
                //this.player.loadTexture('panda_down', 0);
                if(this.directions[4].index !== 8 && this.directionObject[4] === 0) {
                    this.player.animations.play('down', 10, true);
                    this.player.body.velocity.y = this.speed;
                    this.game.global.statey = 1;
                }
                else {
                    this.player.animations.play('down', 10, true);
                }
            }
            else
            {
                // Stand still
                this.player.animations.stop();
                this.game.global.statex = 0;
                this.game.global.statey = 0;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
                //console.log('Hello\n');
                // this.player.frame = 4;
            }
        }
        else if(flagy != 1) {
            if (this.game.global.statey == 1) {
                this.player.animations.play('down', 10, true);
                this.player.body.velocity.y = this.speed;
            }
            else if (this.game.global.statey == -1) {
                this.player.animations.play('up', 10, true);
                this.player.body.velocity.y = -this.speed;
            }
            if(this.game.global.statey == 0) {
                this.player.y --;
            }
        }
        else if (flagx != 1) {
            if (this.game.global.statex == 1) {
                this.player.animations.play('right', 10, true);
                this.player.body.velocity.x = this.speed;
            }
            else if (this.game.global.statex == -1) {
                this.player.animations.play('left', 10, true);
                this.player.body.velocity.x = -this.speed;
            }
            else {
                this.player.animations.stop();
            }
            if(this.game.global.statex == 0) {
                this.player.x --;
            }
        }
    },

    releaseBerry: function() {
        var x = Math.floor(this.player.x / 32) * 32 + 16;
        var y = Math.floor(this.player.y / 32) * 32 + 16;

        //console.log(this.berries.length);
        var flag = 0;
        for(var i = 0;i < this.berries.length; i++) {
            this.berryeach = this.berries.getAt(i);
            var a = this.berryeach.x;
            var b = this.berryeach.y;
            var c = this.berryeach.alive;

            if(c === false) {
                continue;
            }

            if(x === a && y === b) {
                flag = 1;
            }
        }

        if(this.fruitnumber > 0 && flag === 0) {
            var berry = this.berries.create(x, y, 'berry');
            berry.anchor.setTo(0.5, 0.5);
            var childIndex = this.berries.getChildIndex(berry);
            // Basic Timed Event
            this.game.add.tween(berry.scale).to({x: 0.3, y: 0.3}, 500).to({x: 1.0, y: 1.0}, 500).start().loop();
            //this.game.time.events.add(Phaser.Timer.SECOND * 2, this.explosioncross, this, x, y, berry);
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.explosiontest, this, x, y, berry);
            this.fruitnumber--;
        }
    },

    stopinvincible: function (tween) {
        tween.stop();
        this.invinciblenumber = 0;
        this.numberinvincible.text = this.invinciblenumber;
    },

    timer: function() {
        if(100 - Math.floor(this.game.time.totalElapsedSeconds()) < 0) {
            this.quitGame();
        }
        else {
            this.numbertime.text = 100 - Math.floor(this.game.time.totalElapsedSeconds());
        }
    },

    quitGame: function (pointer) {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');
    },

    render: function() {
        this.game.debug.body(this.player);
    }
};
