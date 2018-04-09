export function exportJSON (layersData) {
	console.log(layersData);

	var mapData = new Object();

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

	download(jsonData, 'autoTilemapJSON.json', 'text/plain');

	console.log(jsonData);
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function addTilesetGround(mapData) {
	var tilesetData = new Object();

	tilesetData.firstgid = 1;
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

	tilesetData.firstgid = 105;
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

	tilesetData.firstgid = 297;
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

	tilesetData.firstgid = 489;
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

	tilesetData.firstgid = 649;
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