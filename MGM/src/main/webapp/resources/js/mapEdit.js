var tileNumWidth = 40, tileNumHeight = 30, sceneName = 'map name';
(function () {
	tileNumWidth = prompt('맵의 너비를 지정해주세요', '타일수 입력');
	tileNumHeight = prompt('맵의 높이를 지정해주세요', '타일수 입력');
	sceneName = prompt('맵 이름을 지정해주세요', 'map name');
})();

/* 타일셋 부분 */
const arrGID = [2, 106, 298, 490, 650];
const arrTilesetName = ['Ground', 'Ground2', 'Ground3', 'Tileset1', 'Forest'];

const cvsTileset = document.getElementById("tileset");
const ctxTileset = cvsTileset.getContext('2d');

var tilesetImg, currTileset = 0, currTile = 0;
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
        let x = Math.floor(e.layerX / 32);
        let y = Math.floor(e.layerY / 32);

        console.log({x: x, y: y});
        ctxTileset.clearRect(0, 0, 300, 300);
        ctxTileset.drawImage(tilesetImg, 0, 0);
        ctxTileset.lineWidth="2";
        ctxTileset.strokeStyle="white";
        ctxTileset.strokeRect(x * 32, y * 32, 32, 32);

        currTile = arrGID[currTileset] + x + y * (tilesetImg.width / 32);
    });

    document.getElementById('btn_tileset').addEventListener("click", function (e) {
        if (currTileset < arrTilesetName.length - 1) {
            currTileset++;
        } else {
            currTileset = 0;
        }
        loadTilesets(currTileset);
    });

    document.getElementById('btn_save').addEventListener("click", function (e) {
        exportJSON(layersData, eventsList);
    });

    document.getElementById('btn_tile_1x1').addEventListener("click", function (e) {
        drawTileType = 1;
    });

    document.getElementById('btn_tile_4x4').addEventListener("click", function (e) {
        drawTileType = 2;
    })
}

/* 실제 맵 부분 */
var game = new Phaser.Game(
    800, 600, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update, render: render });

var map, layer1, layer2;
var layersData, eventsData;

var marker;
var currentLayer;

var cursors;
var layer1Key, layer2Key, showLayersKey;

// 맵 수정 태그에서 마우스 오른쪽 버튼 기본 창 띄우기 방지
$('body').on('contextmenu', 'canvas', function(e){ return false; });

function preload() {
	game.load.image('Blank', getContextPath() + '/resources/tilemaps/tiles/blank_block.jpg');
    game.load.image('Ground', getContextPath() + '/resources/tilemaps/tiles/Ground.png');
    game.load.image('Ground2', getContextPath() + '/resources/tilemaps/tiles/Ground2.png');
    game.load.image('Ground3', getContextPath() + '/resources/tilemaps/tiles/Ground3.png');
    game.load.image('Tileset1', getContextPath() + '/resources/tilemaps/tiles/Tileset1.png');
    game.load.image('Forest', getContextPath() + '/resources/tilemaps/tiles/Forest.png');
    
    game.load.spritesheet('dude', getContextPath() + '/resources/sprites/CharacterTileset.png', 32, 32);
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
    layer1 = map.create('바닥', tileNumWidth, tileNumHeight, 32, 32);
    layer1.scrollFactorX = 1;
    layer1.scrollFactorY = 1;

    //  Resize the world
    layer1.resizeWorld();

    layer2 = map.createBlankLayer('장애물', tileNumWidth, tileNumHeight, 32, 32);
    layer2.scrollFactorX = 1;
    layer2.scrollFactorY = 1;

    currentLayer = layer1;

    //  Create our tile selector at the top of the screen
    marker = game.add.graphics();

    game.input.addMoveCallback(updateMarker, this);
    
    cursors = game.input.keyboard.createCursorKeys();

    showLayersKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    layer1Key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    layer2Key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);

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
                layersData[i][j][k] = 1;
            }
        }
    }
    
    // 이벤트 정보를 저장하기 위한 배열
    eventsData = new Array();
}

// 이벤트 추가 자식창으로부터 정보를 받아 처리하는 메소드
var eventsList = new Array();
var eventPosX, eventPosY, sprite;
function getReturnValue(returnValue) {
	let findPosChar = false;
	
	if (returnValue.type === 'posCharacter') {
		for (let i = 0; i < eventsList.length; i++) {
			if (eventsList[i].type === 'posCharacter') {
				findPosChar = true;
				eventsList[i] = returnValue;
				sprite.destroy();
				sprite = game.add.sprite(eventPosX*32, eventPosY*32, 'dude', 48);
			}
		}
		
		if (!findPosChar) {
			sprite = game.add.sprite(eventPosX*32, eventPosY*32, 'dude', 48);
		}
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

        let layerNum = (currentLayer.name === '바닥') ? 0 : 1;
        
        if (drawTileType === 1) {
            map.putTile(currTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
           
            layersData[layerNum][y][x] = currTile;
        } else {
            map.fill(currTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    layersData[layerNum][y + i][x + j] = currTile;
                }
            }
        }
    } else if (game.input.mousePointer.rightButton.justPressed()) {
    	eventPosX = game.math.snapToFloor(game.input.mousePointer.worldX, 32) / 32;
    	eventPosY = game.math.snapToFloor(game.input.mousePointer.worldY, 32) / 32;
        
        openNewWindow();
    }
}

function openNewWindow(x, y) {
  var name = '이벤트 선택 창';
  var specs = 'width=700, height=400, menubar=no, status=no, toolbar=no';
  var newWindow = window.open('eventEdit', name, specs);
  
  newWindow.focus();
}

function changeLayer(key) {
    switch (key.keyCode) {
        case Phaser.Keyboard.SPACEBAR:
            layer1.alpha = 1;
            layer2.alpha = 1;
            break;

        case Phaser.Keyboard.ONE:
            currentLayer = layer1;
            layer1.alpha = 1;
            layer2.alpha = 0.4;
            break;

        case Phaser.Keyboard.TWO:
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
    game.debug.text('숫자(1,2) = 레이어 전환. 스페이스 = 모든 레이어. 화살표 = 창 이동', 16, 570);
}