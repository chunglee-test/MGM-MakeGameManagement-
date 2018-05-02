$(document).ready(function(){
	$('#btn_savegame').on('click', function() {
		$.ajax({
			url: 'saveGame',
			type: 'GET',
			dataType: 'text',
			data: {
				userid: 'cjlee',
				gameid: gameid,
				nodeid: nodeid
			}
		})
		.done(function() {
			alert('저장 완료');
		})
		.fail(function() {
			alert('저장 실패');
		});
	});

	$('#btn_loadgame').on('click', function() {
		location.href="loadGameFromHis?userid=cjlee&gameid=" + gameid;
	});
});

var game = new Phaser.Game(
		800, 600, Phaser.CANVAS, 'playingmap', 
		{ preload: preload, create: create, update: update, render: render });

var eventsData;

function preload() {
	eventsData = mapData.events;
	game.load.tilemap('Map', null, mapData, Phaser.Tilemap.TILED_JSON);

	game.load.image('tilea1', getContextPath() + '/resources/tilemaps/tiles/tilea1.png');
    game.load.image('tilea2', getContextPath() + '/resources/tilemaps/tiles/tilea2.png');
    game.load.image('tilea3', getContextPath() + '/resources/tilemaps/tiles/tilea3.png');
    game.load.image('tilea4', getContextPath() + '/resources/tilemaps/tiles/tilea4.png');
    game.load.image('tilea5', getContextPath() + '/resources/tilemaps/tiles/tilea5.png');
    game.load.image('tileb1', getContextPath() + '/resources/tilemaps/tiles/tileb1.png');
    game.load.image('tileb2', getContextPath() + '/resources/tilemaps/tiles/tileb2.png');
    game.load.image('tileb3', getContextPath() + '/resources/tilemaps/tiles/tileb3.png');
    game.load.image('tileb4', getContextPath() + '/resources/tilemaps/tiles/tileb4.png');
    game.load.image('tileb5', getContextPath() + '/resources/tilemaps/tiles/tileb5.png');
    
    game.load.image('script', getContextPath() + '/resources/tilemaps/tiles/script.jpg');
    game.load.image('char1img', getContextPath() + '/resources/img/character/inuyasha.png');
    game.load.image('char2img', getContextPath() + '/resources/img/character/weda.jpg');
    game.load.image('NPC1img', getContextPath() + '/resources/img/character/NPC1img.png');
    game.load.image('NPC2img', getContextPath() + '/resources/img/character/NPC2img.png');
    game.load.image('NPC3img', getContextPath() + '/resources/img/character/NPC3img.png');

    // 캐릭터 스프라이트시트 불러오기
    // game.load.spritesheet(유니크한 이름, 경로, 타일 한 개당 너비, 타일 한 개당 높이)
    game.load.spritesheet('dude', getContextPath() + '/resources/sprites/CharacterTileset.png', 32, 32);
    game.load.spritesheet('npc1', getContextPath() + '/resources/sprites/NPC1.png', 48, 48);
    game.load.spritesheet('npc2', getContextPath() + '/resources/sprites/NPC2.png', 48, 48);
    game.load.spritesheet('npc3', getContextPath() + '/resources/sprites/NPC3.png', 48, 48);
}

// 맵 정보, 레이어 1 & 2 정보
var map, layer, layer2;
// 캐릭터 정보
var sprite, spritePosX = 0, spritePosY = 0;
// 키보드 입력 변수
var cursors, spacebar;
// npc 리스트
var npcList;
var script;

function create() {
	//	You can listen for each of these events from Phaser.Loader
    /*game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);
*/
	map = game.add.tilemap('Map');

    //map.addTilesetImage(json내 tileset name, loaded image name, 32, 32, 0, 0, 0);
	map.addTilesetImage('tilea1', 'tilea1', 32, 32, 0, 0, 1);
	map.addTilesetImage('tilea2', 'tilea2', 32, 32, 0, 0, 193);
	map.addTilesetImage('tilea3', 'tilea3', 32, 32, 0, 0, 385);
	map.addTilesetImage('tilea4', 'tilea4', 32, 32, 0, 0, 625);
	map.addTilesetImage('tilea5', 'tilea5', 32, 32, 0, 0, 753);
	map.addTilesetImage('tileb1', 'tileb1', 32, 32, 0, 0, 881);
	map.addTilesetImage('tileb2', 'tileb2', 32, 32, 0, 0, 1137);
	map.addTilesetImage('tileb3', 'tileb3', 32, 32, 0, 0, 1393);
	map.addTilesetImage('tileb4', 'tileb4', 32, 32, 0, 0, 1649);
	map.addTilesetImage('tileb5', 'tileb5', 32, 32, 0, 0, 1905);

    // 맵 레이어 불러오기
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    layer2 = map.createLayer('Tile Layer 2');
    layer2.resizeWorld();
    
    // 통행 불가 타일들 지정하기
    map.setCollisionBetween(625, 625, true, layer, true);
    map.setCollisionBetween(881, 2160, true, layer2, true);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    npcList = game.add.group();

    // 맵 이벤트 발생하는 타일 지정
    setEventTile();
    
    // 카메라 캐릭터 이동에 고정
    //game.physics.arcade.enable(npcList);
    game.camera.follow(sprite);
    
    // 키보드 입력 처리하기
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    // tile에 충돌효과 주기
    //map.getTile(eventsData[0].x, eventsData[0].y).setCollision(true,true,true,true);
}

function start() {

    game.load.image('tilea1', getContextPath() + '/resources/tilemaps/tiles/tilea1.png');
    game.load.image('tilea2', getContextPath() + '/resources/tilemaps/tiles/tilea2.png');
    game.load.image('tilea3', getContextPath() + '/resources/tilemaps/tiles/tilea3.png');
    game.load.image('tilea4', getContextPath() + '/resources/tilemaps/tiles/tilea4.png');
    game.load.image('tilea5', getContextPath() + '/resources/tilemaps/tiles/tilea5.png');
    game.load.image('tileb1', getContextPath() + '/resources/tilemaps/tiles/tileb1.png');
    game.load.image('tileb2', getContextPath() + '/resources/tilemaps/tiles/tileb2.png');
    game.load.image('tileb3', getContextPath() + '/resources/tilemaps/tiles/tileb3.png');
    game.load.image('tileb4', getContextPath() + '/resources/tilemaps/tiles/tileb4.png');
    game.load.image('tileb5', getContextPath() + '/resources/tilemaps/tiles/tileb5.png');
    
    game.load.image('script', getContextPath() + '/resources/tilemaps/tiles/script.jpg');
    game.load.image('char1img', getContextPath() + '/resources/img/character/inuyasha.png');
    game.load.image('char2img', getContextPath() + '/resources/img/character/weda.jpg');
    game.load.image('NPC1img', getContextPath() + '/resources/img/character/NPC1img.png');
    game.load.image('NPC2img', getContextPath() + '/resources/img/character/NPC2img.png');
    game.load.image('NPC3img', getContextPath() + '/resources/img/character/NPC3img.png');

    // 캐릭터 스프라이트시트 불러오기
    // game.load.spritesheet(유니크한 이름, 경로, 타일 한 개당 너비, 타일 한 개당 높이)
    game.load.spritesheet('dude', getContextPath() + '/resources/sprites/CharacterTileset.png', 32, 32);
    game.load.spritesheet('npc1', getContextPath() + '/resources/sprites/NPC1.png', 48, 48);
    game.load.spritesheet('npc2', getContextPath() + '/resources/sprites/NPC2.png', 48, 48);
    game.load.spritesheet('npc3', getContextPath() + '/resources/sprites/NPC3.png', 48, 48);

    game.load.start();

}

function loadStart() {

	text.setText("Loading ...");

}

//	This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

	text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

	var newImage = game.add.image(x, y, cacheKey);

	newImage.scale.set(0.3);

	x += newImage.width + 20;

	if (x > 700)
	{
		x = 32;
		y += 332;
	}

}

function loadComplete() {

	text.setText("Load Complete");

}

function update() {
    game.physics.arcade.collide(sprite, layer);
    game.physics.arcade.collide(sprite, layer2);
    //game.physics.arcade.overlap(sprite, coins, collectCoin, null, this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.left.isDown) {
    	sprite.body.velocity.x = -200;
    	// sprite.body.x = sprite.body.x - 4;
    	sprite.animations.play('left');
    } else if (cursors.right.isDown) {
    	sprite.body.velocity.x = 200;
    	// sprite.body.x = sprite.body.x + 4;
    	sprite.animations.play('right');
    } else if (cursors.up.isDown) {
    	sprite.body.velocity.y = -200;
    	// sprite.body.y = sprite.body.y - 4;
        sprite.animations.play('up');        
    } else if (cursors.down.isDown) {
    	sprite.body.velocity.y = 200;
    	// sprite.body.y = sprite.body.y + 4;
        sprite.animations.play('down');
    }
}

let tileOnEvent;
function setEventTile() {	
	//setTileLocationCallback(x, y, width, height, callback, callbackContext [, layer])
	for (let i = 0; i < eventsData.length; i++) {
		let event = eventsData[i];
		
		if (event.type === 'posCharacter') {
			spritePosX = event.x * 32;
			spritePosY = event.y * 32;
			if (event.charType === './resources/img/character/character1.png') {
				// 이누야샤
				sprite = game.add.sprite(spritePosX, spritePosY, 'dude', 48);
				
				// 캐릭터 움직임 선언
    			// sprite.animations.add(유니크한 애니메이션 이름, 반복할 타일 번호, 프레임수, true)
				sprite.animations.add('left', [32, 33, 34, 35, 36, 37, 32], 60, false);
			    sprite.animations.add('right', [40, 41, 42, 43, 44, 45, 40], 60, false);
			    sprite.animations.add('down', [48, 49, 50, 51, 52, 53, 48], 60, false);
			    sprite.animations.add('up', [56, 57, 58, 59, 60, 61, 56], 60, false);
			    
			} else if (event.charType === './resources/img/character/character2.png') {
				// 여자 캐릭터
				sprite = game.add.sprite(spritePosX, spritePosY, 'dude', 16);
				sprite.animations.add('left', [0, 1, 2, 3, 4, 5, 0], 60, false);
			    sprite.animations.add('right', [8, 9, 10, 11, 12, 13, 8], 60, false);
			    sprite.animations.add('down', [16, 17, 18, 19, 20, 21, 16], 60, false);
			    sprite.animations.add('up', [24, 25, 26, 27, 28, 29, 24], 60, false);

			} else {
				alert('캐릭터 타입 미지정');
				sprite = game.add.sprite(spritePosX, spritePosY, 'dude', 48);
				sprite.animations.add('left', [32, 33, 34, 35, 36, 37, 32], 60, false);
			    sprite.animations.add('right', [40, 41, 42, 43, 44, 45, 40], 60, false);
			    sprite.animations.add('down', [48, 49, 50, 51, 52, 53, 48], 60, false);
			    sprite.animations.add('up', [56, 57, 58, 59, 60, 61, 56], 60, false);
			}

			game.physics.arcade.enable(sprite);

		    // 캐릭터의 충돌 사이즈 조절
		    sprite.body.setSize(30, 30, 0, 0);
		    sprite.body.collideWorldBounds = true;
		    sprite.anchor.set(1);
		    
		} else if (event.type === 'posNPC') {
			spritePosX = event.x * 32;
			spritePosY = event.y * 32;
			map.getTile(event.x, event.y).setCollision(true,true,true,true);
			
			let npc;
			
			if (event.charType === './resources/img/character/NPC1img.png') {
				npc = game.add.sprite(spritePosX, spritePosY, 'npc1', 1);
			} else if (event.charType === './resources/img/character/NPC2img.png') {
				npc = game.add.sprite(spritePosX, spritePosY, 'npc2', 1);
			} else if (event.charType === './resources/img/character/NPC3img.png') {
				npc = game.add.sprite(spritePosX, spritePosY, 'npc3', 1);
			}

			npc.width = 32;
			npc.height = 32;
			npcList.add(npc);
		    game.physics.arcade.enable(npcList);

		} else if (event.type === 'changeMap') {
			map.setTileLocationCallback(event.x, event.y, 1, 1, changeMapHandler(event), this);

		} else if (event.type === 'playScript') {
			//map.setTileLocationCallback(event.x, event.y, 1, 1, playScript(event), this, layer2);

			// 이벤트 발생 타일의 상하좌우 
			aboveTile = map.getTileAbove(layer2.index, event.x, event.y);
			belowTile = map.getTileBelow(layer2.index, event.x, event.y);
			leftTile = map.getTileLeft(layer2.index, event.x, event.y);
			rightTile = map.getTileRight(layer2.index, event.x, event.y);
			
			aboveTile.setCollisionCallback(playScript(event), this);
			belowTile.setCollisionCallback(playScript(event), this);
			leftTile.setCollisionCallback(playScript(event), this);
			rightTile.setCollisionCallback(playScript(event), this);
		}
	}
}

var i = 1;
// 일반 대화중 대화, 분기 대화중 대화, 화자이름
var textT, textIf, textNPC;
var selection1, selection2;
var scriptListInEvent;
var styleForScript;
var char1img, char2img, NPC1img, NPC2img, NPC3img;

var onScript = false;
function playScript(event) {
	map.getTile(event.x, event.y).setCollision(true,true,true,true);
	/**
	 * @param  sprite 충돌을 일으킨 캐릭터
	 * @param  tile   충돌이 일어난 타일
	 */
	return function(sprite, tile) {
		if (spacebar.justPressed() && !onScript) {
			
			if (event.scripttype === 'explanation') {
				var textEx = event.script.text;
				textEx = game.add.text((event.x-1) * 32, (event.y-1) * 32, 
						event.script.text, {font: "20px Arial", fill: "#ffffff"} );
			    game.add.tween(textEx).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

			} else if (event.scripttype === 'talk') {
				script = game.add.sprite(32, 500, 'script');
				script.inputEnabled = true;
				script.events.onInputDown.add(scriptHandler, this);

				script.fixedToCamera = true;
			    script.cameraOffset.setTo(0, 450);
				
			    styleForScript = {font: "32px 30 Arial", fill:"#ffffff", wordWrap: true, wordWrapWidth: script.width, align:"center"};
				textT = game.add.text(35, 500, event.script[0].text, styleForScript);
				
				if(event.script[0].charname === './resources/img/character/NPC1img.png'){
					NPC1img = game.add.sprite(1, 1, 'NPC1img');
					NPC1img.fixedToCamera = true;
			    	NPC1img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, 'NPC1', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				} else if(event.script[0].charname === './resources/img/character/NPC2img.png' ) {
					NPC2img = game.add.sprite(1, 1, 'NPC2img');
					NPC2img.fixedToCamera = true;
			    	NPC2img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, 'NPC2', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				} else if(event.script[0].charname === './resources/img/character/NPC3img.png' ) {
					NPC3img = game.add.sprite(1, 1, 'NPC3img');
					NPC3img.fixedToCamera = true;
			    	NPC3img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, 'NPC3', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				} else if(event.script[0].charname === './resources/img/character/character1.png' ) {
					char1img = game.add.sprite(1, 1, 'char1img');
					char1img.fixedToCamera = true;
			    	char1img.cameraOffset.setTo(10, 470);
					textNPC = game.add.text(35, 470, '이누야샤', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				} else if(event.script[0].charname === './resources/img/character/character2.png' ) {
					char2img = game.add.sprite(1, 1, 'char2img');
					char2img.fixedToCamera = true;
			    	char2img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, '웨다', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				}

				textT.fixedToCamera = true;
			    textT.cameraOffset.setTo(150, 500);
				
				scriptListInEvent = event.script;
				onScript = true;

				game.input.keyboard.stop();

			} else if (event.scripttype === 'if') {
				script = game.add.sprite(32, 500, 'script');
				script.inputEnabled = true;
				script.events.onInputDown.add(ifHandler, this);
				
				script.fixedToCamera = true;
			    script.cameraOffset.setTo(0, 445);

			    styleForScript = {font: "32px 30 Arial", fill:"#ffffff", wordWrap: true, wordWrapWidth: script.width, align:"center"};
				textIf = game.add.text(35, 470, event.script[0].text, styleForScript);
				
				if(event.script[0].charname === './resources/img/character/NPC1img.png'){
					NPC1img = game.add.sprite(1, 1, 'NPC1img');
					NPC1img.fixedToCamera = true;
			    	NPC1img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, 'NPC1', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				} else if(event.script[0].charname === './resources/img/character/NPC2img.png' ) {
					NPC2img = game.add.sprite(1, 1, 'NPC2img');
					NPC2img.fixedToCamera = true;
			    	NPC2img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, 'NPC2', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				} else if(event.script[0].charname === './resources/img/character/NPC3img.png' ) {
					NPC3img = game.add.sprite(1, 1, 'NPC3img');
					NPC3img.fixedToCamera = true;
			    	NPC4img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, 'NPC3', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				} else if(event.script[0].charname === './resources/img/character/character1.png' ) {
					char1img = game.add.sprite(1, 1, 'char1img');
					char1img.fixedToCamera = true;
			    	char1img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, '이누야샤', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				} else if(event.script[0].charname === './resources/img/character/character2.png' ) {
					char2img = game.add.sprite(1, 1, 'char2img');
					char2img.fixedToCamera = true;
			    	char2img.cameraOffset.setTo(10, 455);
					textNPC = game.add.text(35, 470, '웨다', styleForScript);
					textNPC.fixedToCamera = true;
					textNPC.cameraOffset.setTo(150, 470);
				}

				textIf.fixedToCamera = true;
			    textIf.cameraOffset.setTo(150, 500);

				scriptListInEvent = event.script;
				onScript = true;
				game.input.keyboard.stop();

			}

		} else if (!onScript) {
			//console.log('playScript');
		}
		
	};
}

function scriptHandler() {
	if (i < scriptListInEvent.length) {
		textT.text = scriptListInEvent[i].text;
		
		destroyObjImg();

		textT.destroy();
		textNPC.destroy();

		textT.text = scriptListInEvent[i].text;
		
		textT = game.add.text(35, 470, scriptListInEvent[i].text, styleForScript);
	    textT.fixedToCamera = true;
	    textT.cameraOffset.setTo(150, 500);
		
		if(scriptListInEvent[i].charname === './resources/img/character/NPC1img.png'){
			NPC1img = game.add.sprite(1, 1, 'NPC1img');
			NPC1img.fixedToCamera = true;
			NPC1img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, 'NPC1', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(scriptListInEvent[i].charname === './resources/img/character/NPC2img.png' ) {
			NPC2img = game.add.sprite(1, 1, 'NPC2img');
			NPC2img.fixedToCamera = true;
			NPC2img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, 'NPC2', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(scriptListInEvent[i].charname === './resources/img/character/NPC3img.png' ) {
			NPC3img = game.add.sprite(1, 1, 'NPC3img');
			NPC3img.fixedToCamera = true;
			NPC3img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, 'NPC3', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(scriptListInEvent[i].charname === './resources/img/character/character1.png' ) {
			char1img = game.add.sprite(1, 1, 'char1img');
			char1img.fixedToCamera = true;
			char1img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, '이누야샤', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(scriptListInEvent[i].charname === './resources/img/character/character2.png' ) {
			char2img = game.add.sprite(1, 1, 'char2img');
			char2img.fixedToCamera = true;
			char2img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, '웨다', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);
		}

		i++;

	} else {
		destroyObjImg();
		
		script.destroy();
		textT.destroy();
		textNPC.destroy();
		onScript = false;
		game.input.keyboard.start();

		i = 1;
	}
}

function ifHandler() {
	if (i < scriptListInEvent.length - 2) {
		destroyObjImg();

		textIf.destroy();
		textNPC.destroy();

		textIf.text = scriptListInEvent[i].text;
		
		textIf = game.add.text(35, 470, scriptListInEvent[i].text, styleForScript);
	    textIf.fixedToCamera = true;
	    textIf.cameraOffset.setTo(150, 500);
		
		if(scriptListInEvent[i].charname === './resources/img/character/NPC1img.png'){
			NPC1img = game.add.sprite(1, 1, 'NPC1img');
			NPC1img.fixedToCamera = true;
			NPC1img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, 'NPC1', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(scriptListInEvent[i].charname === './resources/img/character/NPC2img.png' ) {
			NPC2img = game.add.sprite(1, 1, 'NPC2img');
			NPC2img.fixedToCamera = true;
			NPC2img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, 'NPC2', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(scriptListInEvent[i].charname === './resources/img/character/NPC3img.png' ) {
			NPC3img = game.add.sprite(1, 1, 'NPC3img');
			NPC3img.fixedToCamera = true;
			NPC3img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, 'NPC3', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(scriptListInEvent[i].charname === './resources/img/character/character1.png' ) {
			char1img = game.add.sprite(1, 1, 'char1img');
			char1img.fixedToCamera = true;
			char1img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, '이누야샤', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(scriptListInEvent[i].charname === './resources/img/character/character2.png' ) {
			char2img = game.add.sprite(1, 1, 'char2img');
			char2img.fixedToCamera = true;
			char2img.cameraOffset.setTo(10, 455);
			textNPC = game.add.text(35, 470, '웨다', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);
		} 

		i++;

	} else if (i === scriptListInEvent.length - 2) {
		destroyObjImg();

		textIf.destroy();
		textNPC.destroy();

		selection1 = game.add.text(32, 500, scriptListInEvent[i].text,  {font: "30px Arial", fill: "#ffffff"})
		selection2 = game.add.text(32, 550, scriptListInEvent[i+1].text,  {font: "30px Arial", fill: "#ffffff"})
		
		selection1.inputEnabled = true;
		selection2.inputEnabled = true;

		selection1.fixedToCamera = true;
	    selection1.cameraOffset.setTo(30, 500);
	    
	    selection2.fixedToCamera = true;
	    selection2.cameraOffset.setTo(30, 550);
	    
		selection1.events.onInputDown.add(selectionHandler(scriptListInEvent[i]), this);
		selection2.events.onInputDown.add(selectionHandler(scriptListInEvent[i+1]), this);
		
		i++;

	} else {
		i = 1;
	}

	onScript = false;
}

function selectionHandler(event) {
	return function() {
		let mapChangeFunc = changeMapHandler(event);
		
		console.log("go to: " + event.nextScene);
		
		script.destroy();
		selection1.destroy();
		selection2.destroy();
		onScript = false;
		game.input.keyboard.start();
		
		mapChangeFunc();
	}
}

function destroyObjImg() {
	if(NPC1img !== undefined) {
		NPC1img.destroy();
	} 
	if (NPC2img !== undefined) {
		NPC2img.destroy();
	}
	if (NPC3img !== undefined) {
		NPC3img.destroy();
	}
	if (char1img !== undefined) {
		char1img.destroy();
	}
	if (char2img !== undefined) {
		char2img.destroy();
	}
}

var changeMapFlag = true;
function changeMapHandler(event) {
	return function () {
		if(changeMapFlag) {
			changeMapFlag = false;
			$.ajax({
	    		url: "loadScene"
	    		, type: "GET"
	    		, data: {
	    			nodeid: event.nextScene
	    		}
	    		, dataType: "json"
	    		, success : function(data) {
	    			nodeid = event.nextScene;
					changeMap(JSON.parse(data.nodecontent));
					changeMapFlag = true;
	    		}
	    		, error : function(xhr, status, error) {
	    			alert("에러발생");
	    		}
	    	});
		}
	}
}

function changeMap(nodecontent) {
	eventsData = nodecontent.events;

	game.load.tilemap('Map', null, nodecontent, Phaser.Tilemap.TILED_JSON);
	layer.destroy();
	layer2.destroy();
	map.destroy();
	
	map = game.add.tilemap('Map');

	map.addTilesetImage('tilea1', 'tilea1', 32, 32, 0, 0, 1);
	map.addTilesetImage('tilea2', 'tilea2', 32, 32, 0, 0, 193);
	map.addTilesetImage('tilea3', 'tilea3', 32, 32, 0, 0, 385);
	map.addTilesetImage('tilea4', 'tilea4', 32, 32, 0, 0, 625);
	map.addTilesetImage('tilea5', 'tilea5', 32, 32, 0, 0, 753);
	map.addTilesetImage('tileb1', 'tileb1', 32, 32, 0, 0, 881);
	map.addTilesetImage('tileb2', 'tileb2', 32, 32, 0, 0, 1137);
	map.addTilesetImage('tileb3', 'tileb3', 32, 32, 0, 0, 1393);
	map.addTilesetImage('tileb4', 'tileb4', 32, 32, 0, 0, 1649);
	map.addTilesetImage('tileb5', 'tileb5', 32, 32, 0, 0, 1905);
	
	layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    layer2 = map.createLayer('Tile Layer 2');
    layer2.resizeWorld();
	
    // 통행 불가 타일들 지정하기
    map.setCollisionBetween(625, 625, true, layer);
    map.setCollisionBetween(881, 2160, true, layer2);

	sprite.destroy();
    npcList.destroy();
   	npcList = game.add.group();

    setEventTile();
    
    sprite.bringToTop();
    //npcList.bringToTop();
    
    // 카메라 캐릭터 이동에 고정
	game.camera.follow(sprite);
}

function collectCoin(player, coin) {
    coin.kill();
}

function render() {
	//game.debug.body(sprite);
	//game.debug.bodyInfo(sprite, 16, 24);
	//game.debug.text('x: ' + sprite.x + ', y: ' + sprite.y, 32, 32);
}

