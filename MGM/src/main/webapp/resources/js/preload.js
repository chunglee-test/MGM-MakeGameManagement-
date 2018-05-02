var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
		var logo = this.add.sprite(400,300,"logo");
		logo.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(logo);

		// eventsData = mapData.events;
		// this.game.load.tilemap('Map', null, mapData, Phaser.Tilemap.TILED_JSON);

		this.game.load.image('tilea1', getContextPath() + '/resources/tilemaps/tiles/tilea1.png');
	    this.game.load.image('tilea2', getContextPath() + '/resources/tilemaps/tiles/tilea2.png');
	    this.game.load.image('tilea3', getContextPath() + '/resources/tilemaps/tiles/tilea3.png');
	    this.game.load.image('tilea4', getContextPath() + '/resources/tilemaps/tiles/tilea4.png');
	    this.game.load.image('tilea5', getContextPath() + '/resources/tilemaps/tiles/tilea5.png');
	    this.game.load.image('tileb1', getContextPath() + '/resources/tilemaps/tiles/tileb1.png');
	    this.game.load.image('tileb2', getContextPath() + '/resources/tilemaps/tiles/tileb2.png');
	    this.game.load.image('tileb3', getContextPath() + '/resources/tilemaps/tiles/tileb3.png');
	    this.game.load.image('tileb4', getContextPath() + '/resources/tilemaps/tiles/tileb4.png');
	    this.game.load.image('tileb5', getContextPath() + '/resources/tilemaps/tiles/tileb5.png');
	    
	    this.game.load.image('script', getContextPath() + '/resources/tilemaps/tiles/script.jpg');
	    this.game.load.image('char1img', getContextPath() + '/resources/img/character/inuyasha.png');
	    this.game.load.image('char2img', getContextPath() + '/resources/img/character/weda.jpg');
	    this.game.load.image('NPC1img', getContextPath() + '/resources/img/character/NPC1img.png');
	    this.game.load.image('NPC2img', getContextPath() + '/resources/img/character/NPC2img.png');
	    this.game.load.image('NPC3img', getContextPath() + '/resources/img/character/NPC3img.png');

	    // 캐릭터 스프라이트시트 불러오기
	    // game.load.spritesheet(유니크한 이름, 경로, 타일 한 개당 너비, 타일 한 개당 높이)
	    this.game.load.spritesheet('dude', getContextPath() + '/resources/sprites/CharacterTileset.png', 32, 32);
	    this.game.load.spritesheet('npc1', getContextPath() + '/resources/sprites/NPC1.png', 48, 48);
	    this.game.load.spritesheet('npc2', getContextPath() + '/resources/sprites/NPC2.png', 48, 48);
	    this.game.load.spritesheet('npc3', getContextPath() + '/resources/sprites/NPC3.png', 48, 48);
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}