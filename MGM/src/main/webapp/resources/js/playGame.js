import {getContextPath} from './util.js';

var game = new Phaser.Game(
		800, 600, Phaser.CANVAS, 'phaser-example', 
		{ preload: preload, create: create, update: update, render: render });

var eventsData;

function preload() {
	$.getJSON(getContextPath() + '/resources/tilemaps/maps/autoTilemapJSONwithSelection.json', 
		function(jsonData) {
			eventsData = jsonData.events;
			game.load.tilemap('eventMap', null, jsonData, Phaser.Tilemap.TILED_JSON);
	});
    
    game.load.image('Ground', getContextPath() + '/resources/tilemaps/tiles/Ground.png');
    game.load.image('Ground2', getContextPath() + '/resources/tilemaps/tiles/Ground2.png');
    game.load.image('Ground3', getContextPath() + '/resources/tilemaps/tiles/Ground3.png');
    game.load.image('Tileset1', getContextPath() + '/resources/tilemaps/tiles/Tileset1.png');
    game.load.image('Forest', getContextPath() + '/resources/tilemaps/tiles/Forest.png');
    game.load.image('script', getContextPath() + '/resources/tilemaps/tiles/script.png');
    
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
var sprite, spritePosX = 0, spritePosY = 0;

var text, style;

var script;

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
    map.setCollisionBetween(601, 601);
    map.setCollisionBetween(161, 161);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // 맵 이벤트 발생하는 타일 지정
    setEventTile();
    
    // 캐릭터 맵에 추가
    // game.add.sprite(posX, posY, key, frame#)
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
    
    /*script = game.add.sprite(32, 500, 'script');
	script.inputEnable = true;
	script.input.enableDrag();*/
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

function setEventTile() {
	//setTileLocationCallback(x, y, width, height, callback, callbackContext [, layer])
	for (let i = 0; i < eventsData.length; i++) {
		let event = eventsData[i];
		
		if (event.type === 'posCharacter') {
			spritePosX = event.x * 32;
			spritePosY = event.y * 32;
		} else if (event.type === 'changeMap') {
			map.setTileLocationCallback(event.x, event.y, 1, 1, changeMap, this);
		} else if (eventsData[i].type === 'playScript') {
			map.setTileLocationCallback(event.x, event.y, 1, 1, playScript(event), this);
		}
	}
}


var i = 1;
var textT, textIf;
var selection1, selection2;
var scriptListInEvent;
var style1;
var onScript = false;
function playScript(event) {
	return function() {
		if (spacebar.justPressed() && !onScript) {
			if (event.scripttype === 'explanation') {
				//console.log(event.script.text);
				var textEx = event.script.text;
				textEx = game.add.text(event.x * 28, event.y * 28, event.script.text, {font: "10px Arial", fill: "#ffffff"} );
				
				onScript = true;
			} else if (event.scripttype === 'talk') {
				script = game.add.sprite(32, 500, 'script');
				script.inputEnabled = true;
				script.events.onInputDown.add(scriptHandler, this);
				
				style1 = {font: "32px 30 Arial", fill:"#ffffff", wordWrap: true, wordWrapWidth: script.width, align:"center"};
				textT = game.add.text(35, 500, event.script[0].text, style1);
				
				scriptListInEvent = event.script;
				onScript = true;
			} else if (event.scripttype === 'if') {
				script = game.add.sprite(32, 500, 'script');
				script.inputEnabled = true;
				script.events.onInputDown.add(ifHandler, this);
				
				style1 = {font: "32px 30 Arial", fill:"#ffffff", wordWrap: true, wordWrapWidth: script.width, align:"center"};
				textIf = game.add.text(35, 500, event.script[0].text, style1);
				
				scriptListInEvent = event.script;
				onScript = true;

			}
			
		}
	};
}

function scriptHandler() {
	console.log('script handler');
	if (i < scriptListInEvent.length) {
		textT.text = scriptListInEvent[i].text;
		i++;
	} else {
		// TODO: destroy script
		i = 1;
		script.destroy();
		textT.destroy();
		onScript = false;
	}
}

function ifHandler() {
	if (i < scriptListInEvent.length - 2) {
		textIf.text = scriptListInEvent[i].text;
		i++;
	} else if (i === scriptListInEvent.length - 2) {
		selection1 = game.add.text(32, 500, scriptListInEvent[i].text,  {font: "30px Arial", fill: "#ffffff"})
		selection2 = game.add.text(32, 550, scriptListInEvent[i+1].text,  {font: "30px Arial", fill: "#ffffff"})
		selection1.inputEnabled = true;
		selection2.inputEnabled = true;
		textIf.destroy();
		selection1.events.onInputDown.add(selection1Handler, this);
		selection2.events.onInputDown.add(selection2Handler, this);
		i++;
	} else {
		i = 1;
		//script.destroy();
		//textIf.destroy();
		onScript = false;
	}
	onScript = false;
}

function selection1Handler() {
	console.log(scriptListInEvent[i-1].nextScene);
	script.destroy();
	selection1.destroy();
	selection2.destroy();
	//textIf.destory();
}

function selection2Handler() {
	console.log(scriptListInEvent[i].nextScene);
	script.destroy();
	selection1.destroy();
	selection2.destroy();
	//textIf.destory();
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
		    
		    setEventTile();
		    
		    sprite.bringToTop();
		    sprite.x = spritePosX;
		    sprite.y = spritePosY;
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