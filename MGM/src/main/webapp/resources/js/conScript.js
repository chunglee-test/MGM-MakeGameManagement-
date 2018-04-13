/**
 * 
 */
import {getContextPath} from './util.js';

var game = new Phaser.Game(800, 200, Phaser.CANVAS, 'phaser-example',
		{preload: preload, create: create, update: update, render:render});

function preload() {
	//대화창 이미지
	game.load.image('Script', getContextPath() + '/resources/img/script.png');
	
	game.load.tilemap('map', getContextPath() + '/resources/tilemaps/maps/autoTilemapJSON.json', null, Phaser.Tilemap.TILED_JSON);
    
    game.load.image('Ground', getContextPath() + '/resources/tilemaps/tiles/Ground.png');
    game.load.image('Ground2', getContextPath() + '/resources/tilemaps/tiles/Ground2.png');
    game.load.image('Ground3', getContextPath() + '/resources/tilemaps/tiles/Ground3.png');
    game.load.image('Tileset1', getContextPath() + '/resources/tilemaps/tiles/Tileset1.png');
    game.load.image('Forest', getContextPath() + '/resources/tilemaps/tiles/Forest.png');

    // 캐릭터 스프라이트시트 불러오기
    // game.load.spritesheet(유니크한 이름, 경로, 타일 한 개당 너비, 타일 한 개당 높이)
    game.load.spritesheet('dude', getContextPath() + '/resources/sprites/Characterset2.png', 63, 64);
    
    // 이미지 불러오기
    //game.load.image('phaser', getContextPath() + '/resources/sprites/mushroom2.png');

}

var cursors, spacebar;
var map;
var coins;

var layer, layer2;
var sprite, script;
var text;

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
    
    	//script 삽입
    	script = game.add.sprite(0, 0,'Script');
    	script.inputEnabled = true;
    	text = game.add.text(200, 200,'fff', {fill: '#ffffff'});
    	script.events.onInputDown.add(listener, this);
    
    // 캐릭터 움직임 선언
    // sprite.animations.add(유니크한 애니메이션 이름, 반복할 타일 번호, 프레임수, true)
    sprite.animations.add('up', [0, 1, 2, 3, 4, 5, 6, 7, 8], 60, false);
    sprite.animations.add('left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 60, false);
    sprite.animations.add('down', [18, 19, 20, 21, 22, 23, 24, 25, 26], 60, false);
    sprite.animations.add('right', [27, 28, 29, 30, 31, 32, 33, 34, 35], 60, false);

    // 캐릭터의 충돌 사이즈 조절
    sprite.body.setSize(32, 32, 0, 0);
    sprite.body.collideWorldBounds = true;
    sprite.anchor.set(1);
    //sprite.tint = 0x000000;

    // 카메라 캐릭터 이동에 고정
    game.camera.follow(sprite);
    //game.camera.follow(script);

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
    } else if (cursors.up.isDown) {
    	sprite.body.velocity.y = -300;
        sprite.animations.play('up');        
    } else if (cursors.down.isDown) {
    	sprite.body.velocity.y = 300;
        sprite.animations.play('down');
    }

    if (sprite.x === 100 && (280 <= sprite.y && sprite.y <= 290)) {
        if (spacebar.justPressed()) {
            console.log("말을 걸었다");
        }
    }
}

function collectCoin(player, coin) {
    coin.kill();
}
//클릭 시 바꿔지는 효과가 들어갈 function
function listener() {
	text.text = "ddd";
}

function render() {
    //game.debug.body(sprite);
    game.debug.text('x: ' + sprite.x + ', y: ' + sprite.y, 32, 32);
}

