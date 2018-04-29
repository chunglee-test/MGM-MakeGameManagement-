var game = new Phaser.Game(
		800, 600, Phaser.CANVAS, 'phaser-example', 
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
    
    // 캐릭터 스프라이트시트 불러오기
    // game.load.spritesheet(유니크한 이름, 경로, 타일 한 개당 너비, 타일 한 개당 높이)
    game.load.spritesheet('dude', getContextPath() + '/resources/sprites/CharacterTileset.png', 32, 32);
    
    // 이미지 불러오기
    //game.load.image('phaser', getContextPath() + '/resources/sprites/mushroom2.png');
}

// 맵 정보, 레이어 1 & 2 정보
var map, layer, layer2;
// 캐릭터 정보
var sprite, spritePosX = 0, spritePosY = 0;
// 키보드 입력 변수
var cursors, spacebar;

var script;

function create() {
	
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
    map.setCollisionBetween(625, 625, true, layer);
    
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
    sprite.anchor.set(0.5);
    //sprite.tint = 0x000000;

    // 카메라 캐릭터 이동에 고정
    game.camera.follow(sprite);
    
    // 키보드 입력 처리하기
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    // tile에 충돌효과 주기
    //map.getTile(eventsData[0].x, eventsData[0].y).setCollision(true,true,true,true);
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

let tileOnEvent;
function setEventTile() {	
	//setTileLocationCallback(x, y, width, height, callback, callbackContext [, layer])
	for (let i = 0; i < eventsData.length; i++) {
		let event = eventsData[i];
		
		if (event.type === 'posCharacter') {
			spritePosX = event.x * 32;
			spritePosY = event.y * 32;
		} else if (event.type === 'changeMap') {
			map.setTileLocationCallback(event.x, event.y, 1, 1, changeMapHandler(event), this);
		} else if (event.type === 'playScript') {
			map.setTileLocationCallback(event.x, event.y, 1, 1, playScript(event), this);
		}
	}
}

var i = 1;
var textT, textIf;
var selection1, selection2;
var scriptListInEvent;
var styleForScript;
var onScript = false;
function playScript(event) {
	/**
	 * @param  sprite 충돌을 일으킨 캐릭터
	 * @param  tile   충돌이 일어난 타일
	 */
	return function(sprite, tile) {
		if (spacebar.justPressed() && !onScript) {
			
			if (event.scripttype === 'explanation') {
				var textEx = event.script.text;
				textEx = game.add.text(event.x * 28, event.y * 28, event.script.text, {font: "20px Arial", fill: "#ffffff"} );
				
				//game.time.events.add(Phaser.Timer.SECOND * 4, textEx, this);
			    game.add.tween(textEx).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

				onScript = true;
			} else if (event.scripttype === 'talk') {
				script = game.add.sprite(32, 500, 'script');
				script.inputEnabled = true;
				script.events.onInputDown.add(scriptHandler, this);

				script.fixedToCamera = true;
			    script.cameraOffset.setTo(0, 450);
				
				script.fixedToCamera = true;
			    script.cameraOffset.setTo(0, 450);
				
			    styleForScript = {font: "32px 30 Arial", fill:"#ffffff", wordWrap: true, wordWrapWidth: script.width, align:"center"};
				textT = game.add.text(35, 500, event.script[0].text, styleForScript);
				
				textT.fixedToCamera = true;
			    textT.cameraOffset.setTo(30, 500);
				
				scriptListInEvent = event.script;
				onScript = true;
				//cursors.inputEnabled = false;

				game.input.keyboard.stop();
			} else if (event.scripttype === 'if') {
				script = game.add.sprite(32, 500, 'script');
				script.inputEnabled = true;
				script.events.onInputDown.add(ifHandler, this);
				
				script.fixedToCamera = true;
			    script.cameraOffset.setTo(0, 450);

			    styleForScript = {font: "32px 30 Arial", fill:"#ffffff", wordWrap: true, wordWrapWidth: script.width, align:"center"};
				textIf = game.add.text(35, 500, event.script[0].text, styleForScript);
				
				textIf.fixedToCamera = true;
			    textIf.cameraOffset.setTo(30, 500);

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
		i++;
	} else {
		i = 1;
		script.destroy();
		textT.destroy();
		onScript = false;
		game.input.keyboard.start();
	}
}

function ifHandler() {
	if (i < scriptListInEvent.length - 2) {
		textIf.text = scriptListInEvent[i].text;
		i++;
	} else if (i === scriptListInEvent.length - 2) {
		textIf.destroy();

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
		
	    setEventTile();
	    
	    sprite.bringToTop();
	    sprite.x = spritePosX;
	    sprite.y = spritePosY;
		
	    map.setCollisionBetween(625, 625, true, layer);
}

function collectCoin(player, coin) {
    coin.kill();
}

function render() {
	//game.debug.body(sprite);
	//game.debug.bodyInfo(sprite, 16, 24);
	//game.debug.text('x: ' + sprite.x + ', y: ' + sprite.y, 32, 32);
}