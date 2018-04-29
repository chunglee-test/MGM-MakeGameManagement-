function exportJSON (nodeid, nodename, layersData, eventsData) {
	var mapData = new Object();

	console.log('exportJSON');
	console.log(eventsData);
	/*
		Map
		Field			Type	Description
		backgroundcolor	string	Hex-formatted color (#RRGGBB or #AARRGGBB) (optional)
		height			int		Number of tile rows
		infinite		bool	Whether the map has infinite dimensions
		layers			array	Array of layers
		nextobjectid	int		Auto-increments for each placed object
		orientation		string	orthogonal, isometric, staggered or hexagonal
		properties		array	A list of properties (name, value, type).
		renderorder		string	Rendering direction (orthogonal maps only)
		tiledversion	string	The Tiled version used to save the file
		tileheight		int		Map grid height
		tilesets		array	Array of tilesets
		tilewidth		int	Map grid width
		type			string	map (since 1.0)
		version			number	The JSON format version
		width			int		Number of tile columns
	 */
	mapData.height = 10;

	/*
		Layer
		Field		Type	Description
		data		int		Array of GIDs. tilelayer only.
		draworder	string	topdown (default) or index. objectgroup only.
		height		int		Row count. Same as map height for fixed-size maps.
		layers		array	Array of layers. group on
		name		string	Name assigned to this layer
		objects		object	Array of objects. objectgroup only.
		opacity		float	Value between 0 and 1
		properties	array	A list of properties (name, value, type).
		type		string	tilelayer, objectgroup, imagelayer or group
		visible		bool	Whether layer is shown or hidden in editor
		width		int		Column count. Same as map width for fixed-size maps.
		x			int		Horizontal layer offset in tiles. Always 0.
		y			int		Vertical layer offset in tiles. Always 0.
	 */
	mapData.layers = new Array();

	for (let layerNum = 0; layerNum < layersData.length; layerNum++) {
		var layerData = new Object();

		layerData.data = new Array();
		for (let x = 0; x < layersData[layerNum].length; x++) {
			for (let y = 0; y < layersData[layerNum][x].length; y++) {
				layerData.data.push(layersData[layerNum][x][y]);
			}
		}
		
		layerData.height = layersData[layerNum].length;
		layerData.name = "Tile Layer " + (layerNum + 1);
		layerData.opacity = 1;
		layerData.type = "tilelayer";
		layerData.visible = true;
		layerData.width = layersData[layerNum][0].length;
		layerData.x = 0;
		layerData.y = 0;

		mapData.layers.push(layerData);
	}
	
	mapData.events = new Array();
	for (let eventNum = 0; eventNum < eventsData.length; eventNum++) {
		var eventData = new Object();
		
		eventData.type = eventsData[eventNum].type;
		eventData.x = eventsData[eventNum].x;
		eventData.y = eventsData[eventNum].y;
		
		// type에 따른 이벤트 구조가 다르다
		if (eventData.type === 'posCharacter') {
			
		} else if (eventData.type === 'changeMap') {
			eventData.nextScene = eventsData[eventNum].nextScene;
		} else if (eventData.type === 'playScript') {
			eventData.scripttype = eventsData[eventNum].scripttype;
			
			// script의 type에 따른 이벤트 구조가 또 다르다
			if (eventData.scripttype === 'explanation') {
				eventData.script = new Object();
				eventData.script.text = eventsData[eventNum].script.text;
				
			} else if (eventData.scripttype === 'talk') {
				eventData.script = new Array();
				
				for (let scriptNum = 0; scriptNum < eventsData[eventNum].script.length; scriptNum++) {
					let script = new Object();
					script.charname = eventsData[eventNum].script[scriptNum].charname;
					script.text = eventsData[eventNum].script[scriptNum].text;
					
					eventData.script.push(script);
				}
				
			} else if (eventData.scripttype === 'if') {
				eventData.script = new Array();
				let scriptNum = 0;
				for (; scriptNum < eventsData[eventNum].script.length - 2; scriptNum++) {
					let script = new Object();
					script.charname = eventsData[eventNum].script[scriptNum].charname;
					script.text = eventsData[eventNum].script[scriptNum].text;
					
					eventData.script.push(script);
				}
				
				let selection1 = {
		    			text : eventsData[eventNum].script[scriptNum].text,
		    			nextScene : eventsData[eventNum].script[scriptNum].nextScene
		    	};
		    	
		    	let selection2 = {
		    			text : eventsData[eventNum].script[scriptNum+1].text,
		    			nextScene : eventsData[eventNum].script[scriptNum+1].nextScene
		    	};
		    	
		    	eventData.script.push(selection1);
		    	eventData.script.push(selection2);
			}
			
		}
		
		mapData.events.push(eventData);
	}

	mapData.nextobjectid = 1;
	mapData.orientation = "orthogonal";
	mapData.properties = new Object();
	mapData.renderorder = "right-down";
	mapData.tileheight = 32;
	
	/*
		Tileset
		Field		Type	Description
		columns		int		The number of tile columns in the tileset
		firstgid	int		GID corresponding to the first tile in the set
		grid		object	See <grid> (optional)
		image		string	Image used for tiles in this set
		imagewidth	int		Width of source image in pixels
		imageheight	int		Height of source image in pixels
		margin		int		Buffer between image edge and first tile (pixels)
		name		string	Name given to this tileset
		properties	array	A list of properties (name, value, type).
		spacing		int		Spacing between adjacent tiles in image (pixels)
		terrains	array	Array of terrains (optional)
		tilecount	int		The number of tiles in this tileset
		tileheight	int		Maximum height of tiles in this set
		tileoffset	object	See <tileoffset> (optional)
		tiles		array	List of tile (optional)
		tilewidth	int		Maximum width of tiles in this set
		type		string	tileset (for tileset files, since 1.0)
	 */
	mapData.tilesets = new Array();

	addTilesetBlank(mapData);
	addTilesetGround(mapData);
	addTilesetGround2(mapData);
	addTilesetGround3(mapData);
	addTilesetTileset1(mapData);
	addTilesetForest(mapData);
	
	mapData.tilewidth = 32;
	mapData.type = "map";
	mapData.version = 1;
	mapData.width = 10;

	var jsonData = JSON.stringify(mapData);

	//download(jsonData, 'autoTilemapJSON.json', 'text/plain');
	
	saveScene(nodeid, nodename, jsonData);
}

function saveScene(nodeid, nodename, jsonData) {
	$.ajax({
		url: 'updateGameScene'
		, type: 'POST'
		, dataType: "text"
		, data: {
			nodeid: nodeid
			, nodename: nodename
			, nodecontent: jsonData
		}
		, success: function (data) {
			//location.href = data;
			alert('맵 수정 완료');
		}
		, error: function (data) {
			console.log('error');
		}
	});	
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function addTilesetBlank(mapData) {
	var tilesetData = new Object();

	tilesetData.firstgid = 1;
	tilesetData.image = "..\/tiles\/blank.png";
	tilesetData.imageheight = 32;
	tilesetData.imagewidth = 32;
	tilesetData.margin = 0;
	tilesetData.name = "Blank";
	tilesetData.properties = new Object();
	tilesetData.spacing = 0;
	tilesetData.tileheight = 32;
	tilesetData.tilewidth = 32;

	mapData.tilesets.push(tilesetData);
}

function addTilesetGround(mapData) {
	var tilesetData = new Object();

	tilesetData.firstgid = 2;
	tilesetData.image = "..\/tiles\/Ground.png";
	tilesetData.imageheight = 256;
	tilesetData.imagewidth = 416;
	tilesetData.margin = 0;
	tilesetData.name = "Ground";
	tilesetData.properties = new Object();
	tilesetData.spacing = 0;
	tilesetData.tileheight = 32;
	tilesetData.tilewidth = 32;

	mapData.tilesets.push(tilesetData);
}

function addTilesetGround2(mapData) {
	var tilesetData = new Object();

	tilesetData.firstgid = 106;
	tilesetData.image = "..\/tiles\/Ground2.png";
	tilesetData.imageheight = 384;
	tilesetData.imagewidth = 512;
	tilesetData.margin = 0;
	tilesetData.name = "Ground2";
	tilesetData.properties = new Object();
	tilesetData.spacing = 0;
	tilesetData.tileheight = 32;
	tilesetData.tilewidth = 32;

	mapData.tilesets.push(tilesetData);
}

function addTilesetGround3(mapData) {
	var tilesetData = new Object();

	tilesetData.firstgid = 298;
	tilesetData.image = "..\/tiles\/Ground3.png";
	tilesetData.imageheight = 384;
	tilesetData.imagewidth = 512;
	tilesetData.margin = 0;
	tilesetData.name = "Ground3";
	tilesetData.properties = new Object();
	tilesetData.spacing = 0;
	tilesetData.tileheight = 32;
	tilesetData.tilewidth = 32;

	mapData.tilesets.push(tilesetData);
}

function addTilesetTileset1(mapData) {
	var tilesetData = new Object();

	tilesetData.firstgid = 490;
	tilesetData.image = "..\/tiles\/Tileset1.png";
	tilesetData.imageheight = 320;
	tilesetData.imagewidth = 512;
	tilesetData.margin = 0;
	tilesetData.name = "Tileset1";
	tilesetData.properties = new Object();
	tilesetData.spacing = 0;
	tilesetData.tileheight = 32;
	tilesetData.tilewidth = 32;

	mapData.tilesets.push(tilesetData);
}

function addTilesetForest(mapData) {
	var tilesetData = new Object();

	tilesetData.firstgid = 650;
	tilesetData.image = "..\/tiles\/Forest.png";
	tilesetData.imageheight = 512;
	tilesetData.imagewidth = 512;
	tilesetData.margin = 0;
	tilesetData.name = "Forest";
	tilesetData.properties = new Object();
	tilesetData.spacing = 0;
	tilesetData.tileheight = 32;
	tilesetData.tilewidth = 32;

	mapData.tilesets.push(tilesetData);
}