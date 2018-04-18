import {getContextPath} from './util.js';

var game = new Phaser.Game(
		800, 600, Phaser.CANVAS, 'phaser-example', 
		{ preload: preload, create: create, update: update, render: render });

var eventsData;

function preload() {
	$.getJSON(getContextPath() + '/resources/tilemaps/maps/autoTilemapJSONwithPos.json', 
		function(jsonData) {
			eventsData = jsonData.events;
			game.load.tilemap('eventMap', null, jsonData, Phaser.Tilemap.TILED_JSON);
	});
    //game.load.tilemap('map', getContextPath() + '/resources/tilemaps/maps/autoTilemapJSON.json', null, Phaser.Tilemap.TILED_JSON);
    
    game.load.image('Ground', getContextPath() + '/resources/tilemaps/tiles/Ground.png');
    game.load.image('Ground2', getContextPath() + '/resources/tilemaps/tiles/Ground2.png');
    game.load.image('Ground3', getContextPath() + '/resources/tilemaps/tiles/Ground3.png');
    game.load.image('Tileset1', getContextPath() + '/resources/tilemaps/tiles/Tileset1.png');
    game.load.image('Forest', getContextPath() + '/resources/tilemaps/tiles/Forest.png');

    // 캐릭터 스프라이트시트 불러오기
    // game.load.spritesheet(유니크한 이름, 경로, 타일 한 개당 너비, 타일 한 개당 높이)
    game.load.spritesheet('dude', getContextPath() + '/resources/sprites/CharacterTileset.png', 32, 32);
    game.load.spritesheet('dude-test', getContextPath() + '/resources/sprites/32x32.png', 32, 32);
    
    // 이미지 불러오기
    //game.load.image('phaser', getContextPath() + '/resources/sprites/mushroom2.png');
    
}

var cursors, spacebar;
var map;
var coins;

var layer, layer2;
var sprite;

var text, style;

function create() {
	
	map = game.add.tilemap('eventMap');

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
    // game.add.sprite(posX, posY, key, frame#)
    setCharacterPos();
    sprite = game.add.sprite(spritePosX, spritePosY, 'dude', 48);
    game.physics.arcade.enable(sprite);

    // 캐릭터 움직임 선언
    // sprite.animations.add(유니크한 애니메이션 이름, 반복할 타일 번호, 프레임수, true)
    sprite.animations.add('left', [32, 33, 34, 35, 36, 37, 32], 60, false);
    sprite.animations.add('right', [40, 41, 42, 43, 44, 45, 40], 60, false);
    sprite.animations.add('down', [48, 49, 50, 51, 52, 53, 48], 60, false);
    sprite.animations.add('up', [56, 57, 58, 59, 60, 61, 56], 60, false);

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

    style = { font: "bold 32px Arial", fill: "#fff", 
    		boundsAlignH: "center", boundsAlignV: "middle" };
    
    
    // tile에 충돌효과 주기
    //map.getTile(eventsData[0].x, eventsData[0].y).setCollision(true,true,true,true);
    
    // 맵 이동 이벤트 발생하는 타일 지정
    setMapChangeTile();
    
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
}

var spritePosX = 0, spritePosY = 0;

function setCharacterPos() {
	for (let i = 0; i < eventsData.length; i++) {
		if (eventsData[i].type === 'posCharacter') {
			spritePosX = eventsData[i].x * 32;
			spritePosY = eventsData[i].y * 32;
			break;
		}
	}
}

function setMapChangeTile() {
	//setTileLocationCallback(x, y, width, height, callback, callbackContext [, layer])
	for (let i = 0; i < eventsData.length; i++) {
		if (eventsData[i].type === 'changeMap') {
			map.setTileLocationCallback(eventsData[i].x, eventsData[i].y, 1, 1, changeMap, this);
		}
	}
}

function changeMap() {
	console.log('changed map');
	
	$.getJSON(getContextPath() + '/resources/tilemaps/maps/autoTilemapJSONwithEvent.json', 
		function(jsonData) {
			console.log('load json successfully');
			eventsData = jsonData.events;
			game.load.tilemap('map2', null, jsonData, Phaser.Tilemap.TILED_JSON);
			layer.destroy();
			layer2.destroy();
			map.destroy();
			
			map = game.add.tilemap('map2');
			
			map.addTilesetImage('Ground', 'Ground', 32, 32, 0, 0, 1);
		    map.addTilesetImage('Ground2', 'Ground2', 32, 32, 0, 0, 105);
		    map.addTilesetImage('Ground3', 'Ground3', 32, 32, 0, 0, 297);
		    map.addTilesetImage('Tileset1', 'Tileset1', 32, 32, 0, 0, 489);
		    map.addTilesetImage('Forest', 'Forest', 32, 32, 0, 0, 649);
		    
			layer = map.createLayer('Tile Layer 1');
		    layer.resizeWorld();

		    layer2 = map.createLayer('Tile Layer 2');
		    layer2.resizeWorld();
		    
		    setCharacterPos();
		    sprite.bringToTop();
		    sprite.x = spritePosX;
		    sprite.y = spritePosY;
		    
		    setMapChangeTile();
	});
}

var talkNum = 0;
var talkEnd = false;
function startTalk() {
	console.log("말을 걸었다");
	text = game.add.text(200, 500, "phaser 2.4 text bounds", { font: "32px Arial", fill: "#ffffff", align: "center" });
    text.fixedToCamera = true;
    text.cameraOffset.setTo(200, 200);
    talkNum++;
    
    console.log("talkNum = " + talkNum);
    
    /*while(!talkEnd) {
    	if (spacebar.justDown) {
        	console.log('다시 누름');
        	talkEnd = true;
        }
    }*/
}

function collectCoin(player, coin) {
    coin.kill();
}

function render() {
    //game.debug.body(sprite);
    game.debug.text('x: ' + sprite.x + ', y: ' + sprite.y, 32, 32);
}