import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadTileset, loadLevel, loadJSONTileset} from './loaders.js';

const cvsMap = document.getElementById('screen');
const ctxMap = cvsMap.getContext('2d');
const cvsTileset = document.getElementById('tileset');
const ctxTileset = cvsTileset.getContext('2d');

const TILE_SIZE = 32;

var currTileset, currTileName;
var mapTileNames = new Map();

function getContextPath() {
    var hostIndex = location.href.indexOf(location.host) + location.host.length;
    return location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
};

/**
 * 배경화면 그려주기 위한 메소드
 * @param background JSON 파일 내 backgrounds 키에 대응하는 값
 * @param context 그림을 그려줄 위치
 * @param sprites 타일셋에서 읽어 들인 부분, 그려줄 타일
 * @returns
 */
function drawBackground(background, context, sprites) {
    /*background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });*/
}

/**
 * then으로 실행 순서가 순차적으로 진행되는게 아니기 때문에
 * Promise를 통해서 순차적으로 진행되게끔 한다
 * @return {[type]} [description]
 */
function loadMap() {
    // TODO: after image loaded, draw the image into the canvas
    return loadImage(getContextPath() + '/resources/img/Basic Map Modified.png')
    .then(image => {
        //resolve(image);
        return image;
    });
}

/**
 * Load tileset images
 * @return {image} [description]
 */
function loadTilesetMap() {
    return loadImage(getContextPath() + '/resources/img/Tileset Test.png')
    .then(image => {
        // TODO: draw tileset image on the canvas
        ctxTileset.drawImage(image, 0, 0);

        const sprites = new SpriteSheet(image);

        loadJSONTileset(getContextPath() + '/resources/json/tileset.json')
        .then(json => {
            json.tiles.forEach(tile => {
                sprites.define(tile.name, tile.pos[0], tile.pos[1]);
                mapTileNames.set(tile.pos[0] + ',' + tile.pos[1], tile.name);
            });
        });
        
        currTileset = sprites;
        return image;
    });
}



// Promise가 다 끝나면 그 결과를 받아 함수를 실행한다
// 다수의 Promise를 병렬적으로 실행시키는 함수이다
Promise.all([
    loadMap(),
    loadTilesetMap()
])
.then(([map, tileset]) => {
    ctxMap .drawImage(map, 0, 0);
    addEventListeners();
});

/**
 * Add event listeners to the canvas
 */
function addEventListeners() {
    cvsMap.addEventListener("click", function (e) {
        // 클릭시 타일 계산
        let x = Math.floor(e.layerX / 32);
        let y = Math.floor(e.layerY / 32);
        console.log({x: x, y: y});
        //console.log(currSelectedTile);
        //currTileset.drawTile("unpacked box", ctxMap, x, y);
        currTileset.drawTile(currTileName, ctxMap, x, y);
    });

    cvsTileset.addEventListener("click", function (e) {
        let x = Math.floor(e.layerX / 32);
        let y = Math.floor(e.layerY / 32);
        console.log({x: x, y: y});
        currTileName = mapTileNames.get(x + ',' + y);
        console.log("name: " + currTileName);
    });
}





