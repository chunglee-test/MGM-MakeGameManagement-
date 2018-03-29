import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function getContextPath() {
    var hostIndex = location.href.indexOf( location.host ) + location.host.length;
    return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
};

/**
 * 배경화면 그려주기 위한 메소드
 * @param background JSON 파일 내 backgrounds 키에 대응하는 값
 * @param context 그림을 그려줄 위치
 * @param sprites 타일셋에서 읽어 들인 부분, 그려줄 타일
 * @returns
 */
function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}


//loadImage(getContextPath() + '/resources/img/Mario.png')
loadImage(getContextPath() + '/resources/img/VX Scenery Tileset.png')
.then(image => {
	
	// 타일셋 하나마다 분할된 타일을 가지고 있는 sprite를 생성해야 한다 
    const sprites = new SpriteSheet(image);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 1, 1);

    //loadLevel('1-1')
    loadLevel(getContextPath() + '/resources/levels/1-1.json')
    .then(level => {
    	console.log(level);
    	
        level.backgrounds.forEach(bg => {
            drawBackground(bg, context, sprites);
        });
    });
});
















