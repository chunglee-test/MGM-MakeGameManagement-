export default class SpriteSheet {
    constructor(image, w = 32, h = 32) {
        this.image = image;
        this.width = w;
        this.height = h;
        this.tiles = new Map();
    }

    // 타일셋의 특정 위치에 있는 그림을 크롭해서 이름을 지정해두는 메소드
    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.height = this.height;
        buffer.width = this.width;

        // drawImage(img, cx, cy, cwidth, cheight, posx, posy, width, height)
        // cx, cy, cwidth, cheight: 이미지 크롭 시작 위치와 크기
        // posx, posy, width, height: 이미지 그리는 위치와 크기
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                this.width * x,
                this.height * y,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height);
        this.tiles.set(name, buffer);
    }

    // 실제로 특정 픽셀 위치에 타일을 그리는 메소드
    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    // 특정 격자에 타일을 그리는 메소드 
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }

}