var game = new Phaser.Game(
		800, 600, Phaser.CANVAS, 'phaser-example', 
		{ preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.tilemap('map', 'tilemaps/maps/autoTilemapJSON.json', null, Phaser.Tilemap.TILED_JSON);
    
    game.load.image('Ground', 'tilemaps/tiles/Ground.png');
    game.load.image('Ground2', 'tilemaps/tiles/Ground2.png');
    game.load.image('Ground3', 'tilemaps/tiles/Ground3.png');
    game.load.image('Tileset1', 'tilemaps/tiles/Tileset1.png');
    game.load.image('Forest', 'tilemaps/tiles/Forest.png');

    // 캐릭터 스프라이트시트 불러오기
    // game.load.spritesheet(유니크한 이름, 경로, 타일 한 개당 너비, 타일 한 개당 높이)
    game.load.spritesheet('dude', 'sprites/dude.png', 32, 48);
    
    // 이미지 불러오기
    //game.load.image('phaser', 'sprites/mushroom2.png');
}

var cursors, spacebar;
var map;
var coins;

var layer, layer2;
var sprite;

function create() {
    map = game.add.tilemap('map');

    //map.addTilesetImage(json내 tileset name, loaded image name, 32, 32, 0, 0, 0);
    map.addTilesetImage('Ground', 'Ground', 32, 32, 0, 0, 1);
    map.addTilesetImage('Ground2', 'Ground2', 32, 32, 0, 0, 105);
    map.addTilesetImage('Ground3', 'Ground3', 32, 32, 0, 0, 297);
    map.addTilesetImage('Tileset1', 'Tileset1', 32, 32, 0, 0, 489);
    map.addTilesetImage('Forest', 'Forest', 32, 32, 0, 0, 649);

    // 맵 레이어 불러오기
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    layer2 = map.createLayer('Tile Layer 2');
    layer2.resizeWorld();
    
    // 통행 불가 타일들 지정하기
    // map.setCollisionBetween(9, 9, true, layer2);
    map.setCollisionBetween(8, 8);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // 캐릭터 맵에 추가
    // game.add.sprite(posX, posY, )
    sprite = game.add.sprite(100, 200, 'dude');
    game.physics.arcade.enable(sprite);

    // 캐릭터 움직임 선언
    // sprite.animations.add(유니크한 애니메이션 이름, 반복할 타일 번호, 프레임수, true)
    sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    sprite.animations.add('turn', [4], 20, true);
    sprite.animations.add('right', [5, 6, 7, 8], 10, true);

    // 캐릭터의 충돌 사이즈 조절
    sprite.body.setSize(32, 32, 0, 0);
    sprite.body.collideWorldBounds = true;
    sprite.anchor.set(1);
    //sprite.tint = 0x000000;

    // 카메라 캐릭터 이동에 고정
    game.camera.follow(sprite);

    // 키보드 입력 처리하기
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {

    game.physics.arcade.collide(sprite, layer);
    game.physics.arcade.collide(sprite, layer2);
    //game.physics.arcade.overlap(sprite, coins, collectCoin, null, this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.left.isDown) {
    	sprite.body.velocity.x = -300;
    	sprite.animations.play('left');

    } else if (cursors.right.isDown) {
    	sprite.body.velocity.x = 300;
    	sprite.animations.play('right');

    } else {
    	sprite.animations.play('turn');
    }

    if (cursors.up.isDown) {
    	sprite.body.velocity.y = -300;
    	
    } else if (cursors.down.isDown) {
    	sprite.body.velocity.y = 300;
    }

    if (sprite.x === 100 && (290 <= sprite.y && sprite.y <= 290)) {
        if (spacebar.justPressed()) {
            console.log("말을 걸었다");
        }
    }
}

function collectCoin(player, coin) {
    coin.kill();
}

function render() {
    //game.debug.body(sprite);
    game.debug.text('x: ' + sprite.x + ', y: ' + sprite.y, 32, 32);
}