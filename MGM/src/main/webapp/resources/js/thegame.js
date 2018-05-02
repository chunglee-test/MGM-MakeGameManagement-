var theGame = function(game){
	/*// 맵 정보, 레이어 1 & 2 정보
	var map, layer, layer2;
	// 캐릭터 정보
	var sprite, spritePosX = 0, spritePosY = 0;
	// 키보드 입력 변수
	var cursors, spacebar, fullscreen;
	// npc 리스트
	var npcList;
	var script;
	var tileOnEvent;

	var i = 1;
	// 일반 대화중 대화, 분기 대화중 대화, 화자이름
	var textT, textIf, textNPC;
	var selection1, selection2;
	var scriptListInEvent;
	var styleForScript;
	var char1img, char2img, NPC1img, NPC2img, NPC3img;

	var onScript = false;

	var changeMapFlag = true;*/
	map = null;
	layer = null;
	layer2 = null;
	sprite = null;
	spritePosX = 0;
	spritePosY = 0;
	cursors = null;
	spacebar = null;
	fullscreen = null;
	npcList = null;
	script = null;
	tileOnEvent = null;
	i = 1;
	textT = null;
	textIf= null;
	textNPC= null;
	selection1= null;
	selection2= null;
	scriptListInEvent= null;
	styleForScript= null;
	char1img= null;
	char2img= null;
	NPC1img= null;
	NPC2img= null;
	NPC3img= null;
	onScript = false;
	changeMapFlag = true;
}


theGame.prototype = {
	preload: function(){
		eventsData = mapData.events;
		this.game.load.tilemap('Map', null, mapData, Phaser.Tilemap.TILED_JSON);
	},
  	create: function(){
  		$('#bgmPlayer').attr('src', './resources/mp3/'+nodeid+'.mp3');
  		document.getElementById('bgmPlayer').play();

		map = this.game.add.tilemap('Map');

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
	    
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    npcList = this.game.add.group();

	    // 맵 이벤트 발생하는 타일 지정
	    this.setEventTile();
	    
	    // 카메라 캐릭터 이동에 고정
	    //game.physics.arcade.enable(npcList);
	    this.game.camera.follow(sprite);
	    
	    // 키보드 입력 처리하기
	    cursors = this.game.input.keyboard.createCursorKeys();
	    spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    fullscreen = this.game.input.keyboard.addKey(Phaser.Keyboard.F11);
	    
	    fullscreen.onDown.add(this.makeFullScreen, this);

	    // Stretch to fill
	    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

	    // Keep original size
	    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

	    // tile에 충돌효과 주기
	    //map.getTile(eventsData[0].x, eventsData[0].y).setCollision(true,true,true,true);
		
	},
	update: function(){
		this.game.physics.arcade.collide(sprite, layer);
	    this.game.physics.arcade.collide(sprite, layer2);

	    sprite.body.velocity.x = 0;
	    sprite.body.velocity.y = 0;

	    if (cursors.left.isDown) {
	    	sprite.body.velocity.x = -200;
	    	sprite.animations.play('left');
	    } else if (cursors.right.isDown) {
	    	sprite.body.velocity.x = 200;
	    	sprite.animations.play('right');
	    } else if (cursors.up.isDown) {
	    	sprite.body.velocity.y = -200;
	        sprite.animations.play('up');        
	    } else if (cursors.down.isDown) {
	    	sprite.body.velocity.y = 200;
	        sprite.animations.play('down');
	    }
	},
	makeFullScreen: function(){
		if (this.game.scale.isFullScreen) {
	        this.game.scale.stopFullScreen();
	    } else {
	        this.game.scale.startFullScreen(false);
	    }
	},
	setEventTile: function(){
		//setTileLocationCallback(x, y, width, height, callback, callbackContext [, layer])
		for (let i = 0; i < eventsData.length; i++) {
			let event = eventsData[i];
			
			if (event.type === 'posCharacter') {
				spritePosX = event.x * 32;
				spritePosY = event.y * 32;
				if (event.charType === './resources/img/character/character1.png') {
					// 이누야샤
					sprite = this.game.add.sprite(spritePosX, spritePosY, 'dude', 48);
					
					// 캐릭터 움직임 선언
	    			// sprite.animations.add(유니크한 애니메이션 이름, 반복할 타일 번호, 프레임수, true)
					sprite.animations.add('left', [32, 33, 34, 35, 36, 37, 32], 60, false);
				    sprite.animations.add('right', [40, 41, 42, 43, 44, 45, 40], 60, false);
				    sprite.animations.add('down', [48, 49, 50, 51, 52, 53, 48], 60, false);
				    sprite.animations.add('up', [56, 57, 58, 59, 60, 61, 56], 60, false);
				    
				} else if (event.charType === './resources/img/character/character2.png') {
					// 여자 캐릭터
					sprite = this.game.add.sprite(spritePosX, spritePosY, 'dude', 16);
					sprite.animations.add('left', [0, 1, 2, 3, 4, 5, 0], 60, false);
				    sprite.animations.add('right', [8, 9, 10, 11, 12, 13, 8], 60, false);
				    sprite.animations.add('down', [16, 17, 18, 19, 20, 21, 16], 60, false);
				    sprite.animations.add('up', [24, 25, 26, 27, 28, 29, 24], 60, false);

				} else {
					alert('캐릭터 타입 미지정');
					sprite = this.game.add.sprite(spritePosX, spritePosY, 'dude', 48);
					sprite.animations.add('left', [32, 33, 34, 35, 36, 37, 32], 60, false);
				    sprite.animations.add('right', [40, 41, 42, 43, 44, 45, 40], 60, false);
				    sprite.animations.add('down', [48, 49, 50, 51, 52, 53, 48], 60, false);
				    sprite.animations.add('up', [56, 57, 58, 59, 60, 61, 56], 60, false);
				}

				this.game.physics.arcade.enable(sprite);

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
					npc = this.game.add.sprite(spritePosX, spritePosY, 'npc1', 1);
				} else if (event.charType === './resources/img/character/NPC2img.png') {
					npc = this.game.add.sprite(spritePosX, spritePosY, 'npc2', 1);
				} else if (event.charType === './resources/img/character/NPC3img.png') {
					npc = this.game.add.sprite(spritePosX, spritePosY, 'npc3', 1);
				}

				npc.width = 32;
				npc.height = 32;
				npcList.add(npc);
			    this.game.physics.arcade.enable(npcList);

			} else if (event.type === 'changeMap') {
				map.setTileLocationCallback(event.x, event.y, 1, 1, this.changeMapHandler(event), this);

			} else if (event.type === 'playScript') {
				//map.setTileLocationCallback(event.x, event.y, 1, 1, playScript(event), this, layer2);

				// 이벤트 발생 타일의 상하좌우 
				aboveTile = map.getTileAbove(layer2.index, event.x, event.y);
				belowTile = map.getTileBelow(layer2.index, event.x, event.y);
				leftTile = map.getTileLeft(layer2.index, event.x, event.y);
				rightTile = map.getTileRight(layer2.index, event.x, event.y);
				
				aboveTile.setCollisionCallback(this.playScript(event), this);
				belowTile.setCollisionCallback(this.playScript(event), this);
				leftTile.setCollisionCallback(this.playScript(event), this);
				rightTile.setCollisionCallback(this.playScript(event), this);
			}
		}
	},
	playScript: function(event){
		map.getTile(event.x, event.y).setCollision(true,true,true,true);
		/**
		 * @param  sprite 충돌을 일으킨 캐릭터
		 * @param  tile   충돌이 일어난 타일
		 */
		return function(sprite, tile) {
			if (spacebar.justPressed() && !onScript) {
				
				if (event.scripttype === 'explanation') {
					var textEx = event.script.text;
					textEx = this.game.add.text((event.x-1) * 32, (event.y-1) * 32, 
							event.script.text, {font: "20px Arial", fill: "#ffffff"} );
				    this.game.add.tween(textEx).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

				} else if (event.scripttype === 'talk') {
					script = this.game.add.sprite(32, 500, 'script');
					script.inputEnabled = true;
					script.events.onInputDown.add(this.scriptHandler, this);

					script.fixedToCamera = true;
				    script.cameraOffset.setTo(0, 450);
					
				    styleForScript = {font: "32px 30 Arial", fill:"#ffffff", wordWrap: true, wordWrapWidth: script.width, align:"center"};
					textT = this.game.add.text(35, 500, event.script[0].text, styleForScript);
					
					this.createObjImg(event.script[0].charname);

					textT.fixedToCamera = true;
				    textT.cameraOffset.setTo(150, 500);
					
					scriptListInEvent = event.script;
					onScript = true;

					this.game.input.keyboard.stop();

				} else if (event.scripttype === 'if') {
					script = this.game.add.sprite(32, 500, 'script');
					script.inputEnabled = true;
					script.events.onInputDown.add(this.ifHandler, this);
					
					script.fixedToCamera = true;
				    script.cameraOffset.setTo(0, 445);

				    styleForScript = {font: "32px 30 Arial", fill:"#ffffff", wordWrap: true, wordWrapWidth: script.width, align:"center"};
					textIf = this.game.add.text(35, 470, event.script[0].text, styleForScript);
					
					this.createObjImg(event.script[0].charname);

					textIf.fixedToCamera = true;
				    textIf.cameraOffset.setTo(150, 500);

					scriptListInEvent = event.script;
					onScript = true;
					
					this.game.input.keyboard.stop();

				}

			} else if (!onScript) {
				//console.log('playScript');
			}
			
		};
	},
	scriptHandler: function(){
		if (i < scriptListInEvent.length) {
			textT.text = scriptListInEvent[i].text;
			
			this.destroyObjImg();

			textT.destroy();
			textNPC.destroy();

			textT.text = scriptListInEvent[i].text;
			
			textT = this.game.add.text(35, 470, scriptListInEvent[i].text, styleForScript);
		    textT.fixedToCamera = true;
		    textT.cameraOffset.setTo(150, 500);
			
			this.createObjImg(scriptListInEvent[i].charname);

			i++;

		} else {
			this.destroyObjImg();
			
			script.destroy();
			textT.destroy();
			textNPC.destroy();
			onScript = false;
			this.game.input.keyboard.start();

			i = 1;
		}
	},
	ifHandler: function(){
		if (i < scriptListInEvent.length - 2) {
			this.destroyObjImg();

			textIf.destroy();
			textNPC.destroy();

			textIf.text = scriptListInEvent[i].text;
			
			textIf = this.game.add.text(35, 470, scriptListInEvent[i].text, styleForScript);
		    textIf.fixedToCamera = true;
		    textIf.cameraOffset.setTo(150, 500);
			
			this.createObjImg(scriptListInEvent[i].charname);

			i++;

		} else if (i === scriptListInEvent.length - 2) {
			this.destroyObjImg();

			textIf.destroy();
			textNPC.destroy();

			selection1 = this.game.add.text(32, 500, scriptListInEvent[i].text,  {font: "30px Arial", fill: "#ffffff"})
			selection2 = this.game.add.text(32, 550, scriptListInEvent[i+1].text,  {font: "30px Arial", fill: "#ffffff"})
			
			selection1.inputEnabled = true;
			selection2.inputEnabled = true;

			selection1.fixedToCamera = true;
		    selection1.cameraOffset.setTo(30, 500);
		    
		    selection2.fixedToCamera = true;
		    selection2.cameraOffset.setTo(30, 550);
		    
			selection1.events.onInputDown.add(this.selectionHandler(this, scriptListInEvent[i]), this);
			selection2.events.onInputDown.add(this.selectionHandler(this, scriptListInEvent[i+1]), this);
			
			i++;

		} else {
			i = 1;
		}

		onScript = false;
	},
	selectionHandler: function(game, event){
		return function() {

			//let mapChangeFunc = this.changeMapHandler(event);
		
			console.log("go to: " + event.nextScene);
			
			script.destroy();
			selection1.destroy();
			selection2.destroy();
			onScript = false;
			this.game.input.keyboard.start();
			
			//mapChangeFunc();
			(this.changeMapHandlerByScript(game, event))();
			//(game.changeMapHandler(event))();
		}
	},
	changeMapHandlerByScript: function(game, event){
		return function() {
			if(changeMapFlag) {
				changeMapFlag = false;
				$.ajax({
		    		url: "loadScene"
		    		, type: "GET"
		    		, data: {
		    			nodeid: event.nextScene
		    		}
		    		, dataType: "json"
		    		, async: false
		    		, success : function(data) {
		    			nodeid = event.nextScene;
						changeMapFlag = true;
						mapData = JSON.parse(data.nodecontent);
		    		}
		    		, error : function(xhr, status, error) {
		    			alert("에러발생");
		    		}
		    	});
		    	game.game.state.start("TheGame");
		    	//this.changeMap(returnedNode);
			}
		}
	},
	changeMapHandler: function(event){
		return function() {
			if(changeMapFlag) {
				changeMapFlag = false;
				$.ajax({
		    		url: "loadScene"
		    		, type: "GET"
		    		, data: {
		    			nodeid: event.nextScene
		    		}
		    		, dataType: "json"
		    		, async: false
		    		, success : function(data) {
		    			nodeid = event.nextScene;
						changeMapFlag = true;
						mapData = JSON.parse(data.nodecontent);
		    		}
		    		, error : function(xhr, status, error) {
		    			alert("에러발생");
		    		}
		    	});
		    	this.game.state.start("TheGame");
		    	//this.changeMap(returnedNode);
			}
		}
	},
	changeMap: function(nodecontent){
		eventsData = nodecontent.events;

		this.game.load.tilemap('Map', null, nodecontent, Phaser.Tilemap.TILED_JSON);
		layer.destroy();
		layer2.destroy();
		map.destroy();
		
		map = this.game.add.tilemap('Map');

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
	   	npcList = this.game.add.group();

	    this.setEventTile();
	    
	    sprite.bringToTop();
	    //npcList.bringToTop();
	    
	    // 카메라 캐릭터 이동에 고정
		this.game.camera.follow(sprite);
	},
	createObjImg: function(charname){
		if(charname === './resources/img/character/NPC1img.png'){
			NPC1img = this.game.add.sprite(1, 1, 'NPC1img');
			NPC1img.fixedToCamera = true;
			NPC1img.cameraOffset.setTo(10, 455);
			textNPC = this.game.add.text(35, 470, 'NPC1', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(charname === './resources/img/character/NPC2img.png' ) {
			NPC2img = this.game.add.sprite(1, 1, 'NPC2img');
			NPC2img.fixedToCamera = true;
			NPC2img.cameraOffset.setTo(10, 455);
			textNPC = this.game.add.text(35, 470, 'NPC2', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(charname === './resources/img/character/NPC3img.png' ) {
			NPC3img = this.game.add.sprite(1, 1, 'NPC3img');
			NPC3img.fixedToCamera = true;
			NPC3img.cameraOffset.setTo(10, 455);
			textNPC = this.game.add.text(35, 470, 'NPC3', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(charname === './resources/img/character/character1.png' ) {
			char1img = this.game.add.sprite(1, 1, 'char1img');
			char1img.fixedToCamera = true;
			char1img.cameraOffset.setTo(10, 455);
			textNPC = this.game.add.text(35, 470, '이누야샤', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);

		} else if(charname === './resources/img/character/character2.png' ) {
			char2img = this.game.add.sprite(1, 1, 'char2img');
			char2img.fixedToCamera = true;
			char2img.cameraOffset.setTo(10, 455);
			textNPC = this.game.add.text(35, 470, '웨다', styleForScript);
			textNPC.fixedToCamera = true;
			textNPC.cameraOffset.setTo(150, 470);
		} 
	},
	destroyObjImg: function(){
		if(NPC1img !== undefined && NPC1img !== null) {
			NPC1img.destroy();
		} 
		if (NPC2img !== undefined && NPC2img !== null) {
			NPC2img.destroy();
		}
		if (NPC3img !== undefined && NPC3img !== null) {
			NPC3img.destroy();
		}
		if (char1img !== undefined && char1img !== null) {
			char1img.destroy();
		}
		if (char2img !== undefined && char2img !== null) {
			char2img.destroy();
		}
	}
	//this.game.state.start("GameOver",true,false,score);
}