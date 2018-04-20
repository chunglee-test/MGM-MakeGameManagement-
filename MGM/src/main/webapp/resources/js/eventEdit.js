$(function(){
    $("#set_char").click(function(){
    	var event = {
    		type: 'posCharacter',
    		x : x,
    		y : y
    	};
    	//opener.getReturnValue(JSON.stringify(event));
    	opener.getReturnValue(event);
    	window.close();
    });
    
    $("#change_map").click(function(){
    	var event = {
    		type: 'changeMap',
    		x : x,
    		y : y
    	};
    	// 멥 리스트를 보여주기 위한 배열을 생성함.
    	var maplist = new array() ; 
    	maplist.push(getContextpath() + "resources/tilemaps/autoTilemapJSON2.json");
    	console.log(maplist);
    	opener.getReturnValue(event);
//    	window.close();
    });
    
    $("#add_script").click(function(){
    	var event = {
    		type: 'playScript',
    		x : x,
    		y : y
    	};
    	opener.getReturnValue(event);
    	window.close();
    });
    
    $('#returnButton').click(function() {
    	window.close();
    });
})


