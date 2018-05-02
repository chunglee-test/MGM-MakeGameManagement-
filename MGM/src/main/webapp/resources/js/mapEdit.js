var tileNumWidth = 40, tileNumHeight = 30;
var onMaking = false;
(function () {
    if (nodecontent !== null) {
        onMaking = true;
        tileNumWidth = nodecontent.layers[0].width;
        tileNumHeight = nodecontent.layers[0].height;
    } else {
        tileNumWidth = prompt('맵의 너비를 지정해주세요(단위 타일 수)', '30');
        if(tileNumWidth == null || tileNumWidth < 1){
        	tileNumWidth = 40;
        }
        tileNumHeight = prompt('맵의 높이를 지정해주세요(단위 타일 수)', '30');
        if(tileNumHeight == null || tileNumHeight < 1){
        	tileNumHeight = 30;
        }
        nodename = prompt('맵 이름을 지정해주세요', '기본 맵');
        if(nodename == null){
        	nodename = 'Scene Name';
        }
        $('#txt_nodename').val(nodename);
    }

    // 마우스 오른쪽 버튼 기본 창 띄우기 방지
    document.addEventListener('contextmenu', function(e) {e.preventDefault();}, false);
})();

/* 타일셋 부분 */
const arrGID = [1, 193, 385, 625, 753, 881, 1137, 1393, 1649, 1905];
const arrTilesetName = ['tilea1', 'tilea2', 'tilea3', 'tilea4', 'tilea5'
                        , 'tileb1', 'tileb2', 'tileb3', 'tileb4', 'tileb5'];

const cvsTileset = document.getElementById("tileset");
const ctxTileset = cvsTileset.getContext('2d');

var tilesetImg, currTileset = 0, currTile = 2;
var drawTileType = 1;

Promise.all([
    loadTilesets(0)
])
.then(([]) => {
    addEventListeners();
});

function loadTilesets(numTileset) {
    return loadImage(getContextPath() + '/resources/tilemaps/tiles/' + arrTilesetName[numTileset] + '.png')
    .then(image => {
        tilesetImg = image;
        cvsTileset.width = image.width;
        cvsTileset.height = image.height;
        ctxTileset.drawImage(tilesetImg, 0, 0);
    });
}

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

function addEventListeners() {
    cvsTileset.addEventListener("click", function (e) {
        let x = Math.floor(e.offsetX / 32);
        let y = Math.floor(e.offsetY / 32);

        ctxTileset.clearRect(0, 0, cvsTileset.width, cvsTileset.height);
        ctxTileset.drawImage(tilesetImg, 0, 0);
        ctxTileset.lineWidth="2";
        ctxTileset.strokeStyle="white";
        ctxTileset.strokeRect(x * 32, y * 32, 32, 32);

        currTile = arrGID[currTileset] + x + y * (tilesetImg.width / 32);
        console.log("tile clicked: " + currTile);
    });

    let btnList = document.getElementsByClassName('btn_tileset');
    for (let i = 0; i < btnList.length; i++) {
        btnList[i].addEventListener("click", function (e) {
            
            currTileset = this.name;
            loadTilesets(this.name);
        });
    }
    
    document.getElementById('btn_save').addEventListener("click", function (e) {
        nodename = $('#txt_nodename').val();
        exportJSON(nodeid, nodename, layersData, eventsList);
    });
    
    document.getElementById('btn_tile_1x1').addEventListener("click", function (e) {
        drawTileType = 1;
    });

    document.getElementById('btn_tile_4x4').addEventListener("click", function (e) {
        drawTileType = 2;
    })

    document.getElementById('btn_tile_full').addEventListener("click", function (e) {
        drawTileType = 0;
    })
}

/* 실제 맵 부분 */
var game = new Phaser.Game(
    800, 600, Phaser.CANVAS, 'editingmap', 
    { preload: preload, create: create, update: update, render: render });

var map, layer1, layer2;
var layersData, eventsData;

var marker;
var currentLayer;

var cursors;
var layer1Key, layer2Key, showLayersKey;

function preload() {
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

    game.load.spritesheet('dude', getContextPath() + '/resources/sprites/CharacterTileset.png', 32, 32);

    game.load.spritesheet('npc1', getContextPath() + '/resources/sprites/NPC1.png', 48, 48);
    game.load.spritesheet('npc2', getContextPath() + '/resources/sprites/NPC2.png', 48, 48);
    game.load.spritesheet('npc3', getContextPath() + '/resources/sprites/NPC3.png', 48, 48);
}

function create() {
    game.stage.backgroundColor = '#2d2d2d';

    //  Creates a blank tilemap
    map = game.add.tilemap();

    //  Add a Tileset image to the map
    for (let i = 0; i < arrTilesetName.length; i++) {
        map.addTilesetImage(
                arrTilesetName[i], arrTilesetName[i], 32, 32, 0, 0, arrGID[i]);
    }

    //  Creates a new blank layer and sets the map dimensions.
    //  40x30 tiles in size and the tiles are 32x32 pixels in size.
    layer1 = map.create('배경 레이어', tileNumWidth, tileNumHeight, 32, 32);
    layer1.scrollFactorX = 1;
    layer1.scrollFactorY = 1;

    //  Resize the world
    layer1.resizeWorld();

    layer2 = map.createBlankLayer('이벤트 레이어', tileNumWidth, tileNumHeight, 32, 32);
    layer2.scrollFactorX = 1;
    layer2.scrollFactorY = 1;

    currentLayer = layer1;

    //  Create our tile selector at the top of the screen
    marker = game.add.graphics();

    game.input.addMoveCallback(updateMarker, this);
    
    cursors = game.input.keyboard.createCursorKeys();

    showLayersKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    layer1Key = game.input.keyboard.addKey(Phaser.Keyboard.F1);
    layer2Key = game.input.keyboard.addKey(Phaser.Keyboard.F2);

    showLayersKey.onDown.add(changeLayer, this);
    layer1Key.onDown.add(changeLayer, this);
    layer2Key.onDown.add(changeLayer, this);

    // 맵 타일 정보 저장하기 위한 배열
    layersData = new Array();

    for (let i = 0; i < 2; i++) {
        layersData[i] = new Array();
    }

    for (let i = 0; i < 2; i ++) {
        for (let j = 0; j < tileNumHeight; j++) {
            layersData[i][j] = new Array();
        }
    }

    for (let i = 0; i < 2; i ++) {
        for (let j = 0; j < tileNumHeight; j++) {
            for(let k = 0; k < tileNumWidth; k++) {
                layersData[i][j][k] = (i === 0) ? 625 : 0;
            }
        }
    }

    if (onMaking) {
        for (let i = 0; i < nodecontent.events.length; i++) {
            eventsList.push(nodecontent.events[i]);
        }
        
        let tileID, tileX, tileY, layerIndex;
        for (let i = 0; i < nodecontent.layers.length; i++) {
            layerIndex = (i === 0) ? layer1.index : layer2.index;
            
            for (let j = 0; j < nodecontent.layers[i].data.length; j++) {
                tileID = nodecontent.layers[i].data[j];
                tileY = j % nodecontent.layers[i].width;
                tileX = Math.floor(j / nodecontent.layers[i].width);

                layersData[i][tileX][tileY] = tileID;
                if (tileID !== 0) {
                    map.putTile(tileID, tileY, tileX, layerIndex);
                }
            }
        }

        // 캐릭터 초기 위치 설정
        for (let i = 0; i < eventsList.length; i++) {
            if (eventsList[i].type === 'posCharacter') {
                if (eventsList[i].charType === './resources/img/character/character1.png') {
                    // 이누야샤
                    sprite = game.add.sprite(eventsList[i].x*32, eventsList[i].y*32, 'dude', 48);
                } else if (eventsList[i].charType === './resources/img/character/character2.png') {
                    // 여자 캐릭터
                    sprite = game.add.sprite(eventsList[i].x*32, eventsList[i].y*32, 'dude', 16);
                } else {
                    alert('캐릭터 타입 미지정');
                    sprite = game.add.sprite(eventsList[i].x*32, eventsList[i].y*32, 'dude', 48);
                }
            } else if (eventsList[i].type === 'posNPC') {
                if (eventsList[i].charType === './resources/img/character/NPC1img.png') {
                    npc = game.add.sprite(eventsList[i].x*32, eventsList[i].y*32, 'npc1', 1);
                } else if (eventsList[i].charType === './resources/img/character/NPC2img.png') {
                    npc = game.add.sprite(eventsList[i].x*32, eventsList[i].y*32, 'npc2', 1);
                } else if (eventsList[i].charType === './resources/img/character/NPC3img.png') {
                    npc = game.add.sprite(eventsList[i].x*32, eventsList[i].y*32, 'npc3', 1);
                }

                npc.width = 32;
                npc.height = 32;
            }
        }
    }
}

// 이벤트 추가 자식창으로부터 정보를 받아 처리하는 메소드
var eventsList = new Array();
var eventPosX, eventPosY, sprite, npc;
function getReturnValue(returnValue) {
	let findPosChar = false;
	
	if (returnValue.type === 'posCharacter') {
		for (let i = 0; i < eventsList.length; i++) {
			if (eventsList[i].type === 'posCharacter') {
				findPosChar = true;
				eventsList[i] = returnValue;
				sprite.destroy();

                if (returnValue.charType === './resources/img/character/character1.png') {
                    // 이누야샤
                    sprite = game.add.sprite(returnValue.x*32, returnValue.y*32, 'dude', 48);
                } else if (returnValue.charType === './resources/img/character/character2.png') {
                    // 여자 캐릭터
                    sprite = game.add.sprite(returnValue.x*32, returnValue.y*32, 'dude', 16);
                }
			}
		}
		
		if (!findPosChar) {
			if (returnValue.charType === './resources/img/character/character1.png') {
                // 이누야샤
                sprite = game.add.sprite(returnValue.x*32, returnValue.y*32, 'dude', 48);
            } else if (returnValue.charType === './resources/img/character/character2.png') {
                // 여자 캐릭터
                sprite = game.add.sprite(returnValue.x*32, returnValue.y*32, 'dude', 16);
            }
		}

	} else if (returnValue.type === 'posNPC') {
        if (returnValue.charType === './resources/img/character/NPC1img.png') {
            npc = game.add.sprite(returnValue.x*32, returnValue.y*32, 'npc1', 1);
        } else if (returnValue.charType === './resources/img/character/NPC2img.png') {
            npc = game.add.sprite(returnValue.x*32, returnValue.y*32, 'npc2', 1);
        } else if (returnValue.charType === './resources/img/character/NPC3img.png') {
            npc = game.add.sprite(returnValue.x*32, returnValue.y*32, 'npc3', 1);
        }
        
        npc.width = 32;
        npc.height = 32;
    }
	
	if (!findPosChar) {
		eventsList.push(returnValue);
	}
}

// 맵을 찍으면 타일을 놓는 메소드
function updateMarker() {
    marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * 32;

    if (drawTileType === 1) {
        marker.clear();
        marker.lineStyle(2, 0xFFFFFF, 1);
        marker.drawRect(0, 0, 32, 32);
    } else {
        marker.clear();
        marker.lineStyle(2, 0xFFFFFF, 1);
        marker.drawRect(0, 0, 4 * 32, 4 * 32);
    }
    
    if (game.input.mousePointer.leftButton.isDown) {
        let x = game.math.snapToFloor(game.input.mousePointer.worldX, 32) / 32;
        let y = game.math.snapToFloor(game.input.mousePointer.worldY, 32) / 32;

        let layerNum = (currentLayer.name === layer1.name) ? 0 : 1;
        
        if (drawTileType === 1) {
            map.putTile(currTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
           
            layersData[layerNum][y][x] = currTile;
        } else if (drawTileType === 2) {
            map.fill(currTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    layersData[layerNum][y + i][x + j] = currTile;
                }
            }
        } else if (drawTileType === 0) {
            map.fill(currTile, currentLayer.getTileX(0), currentLayer.getTileY(0), tileNumWidth, tileNumHeight, currentLayer);

            for (let i = 0; i < tileNumWidth; i++) {
                for (let j = 0; j < tileNumHeight; j++) {
                    layersData[layerNum][j][i] = currTile;
                }
            }
        }

    } else if (game.input.mousePointer.rightButton.justPressed()) {
    	eventPosX = game.math.snapToFloor(game.input.mousePointer.worldX, 32) / 32;
    	eventPosY = game.math.snapToFloor(game.input.mousePointer.worldY, 32) / 32;
        
        $("#eventpopup").css("display", "block");
    }
}

function changeLayer(key) {
    switch (key.keyCode) {
        case Phaser.Keyboard.ESC:
            layer1.alpha = 1;
            layer2.alpha = 1;
            break;

        case Phaser.Keyboard.F1:
            currentLayer = layer1;
            layer1.alpha = 1;
            layer2.alpha = 0.4;
            break;

        case Phaser.Keyboard.F2:
            currentLayer = layer2;
            layer1.alpha = 0.4;
            layer2.alpha = 1;
            break;
    }
}

function update() {
    if (cursors.left.isDown) {
        game.camera.x -= 4;
    } else if (cursors.right.isDown) {
        game.camera.x += 4;
    }

    if (cursors.up.isDown) {
        game.camera.y -= 4;
    } else if (cursors.down.isDown) {
        game.camera.y += 4;
    }

}

function render() {
    game.debug.text('현재 레이어: ' + currentLayer.name, 16, 550);
    game.debug.text('F1 & F2 = 레이어 전환. ESC = 모든 레이어 한 번에 표시. 화살표 = 맵 이동', 16, 570);
}

document.getElementById('btn_uppermenu').addEventListener("click", function (e) {
    location.href = "produceScene?gameid=" + gameid;
});

document.getElementById('btn_music').addEventListener("click", function (e) {
    $("#musicSelectDiv").css("display", "block");
});

document.getElementById('closeMusicDiv').addEventListener("click", function(e){
	$("#musicSelectDiv").css("display", "none");
});
//here
document.getElementById('saveMusicBtn').addEventListener("click", function (e) {
    var formData = new FormData($("#musicSelectForm")[0]);
    
	$.ajax({
		type : 'post',
        url : 'saveGameMusic',
        data : formData,
        processData : false,
        contentType : false,
        success : function(result) {
        	if(result == 'true'){
        		alert("저장하였습니다");   
        		$("#musicSelectDiv").css("display", "none");
        	}
        	else{
        		alert("파일을 다시 확인해주세요");
        	}
        },
        error : function(error) {
            alert("fail");
        }
	});
});

// 이벤트 창 열렸을 때 창 밖 누르면 자동으로 닫힘
window.onclick = function(event) {
    if ($(event.target).attr("id") == $("#eventpopup").attr("id")) {
       closeEventPopup();
   }
    else if($(event.target).attr("id") == $("#musicSelectDiv").attr("id")){
    	$("#musicSelectDiv").css("display", "none");
    }
}

// 창 닫는 함수
function closeEventPopup() {
    $("#eventpopup").css("display", "none");
}