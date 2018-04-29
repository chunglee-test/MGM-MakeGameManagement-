function getNode(gameid) {
	$.ajax({
		type : "GET",
		url : "gameScenes?gameid=" + gameid,
		dataType : "json",
		success : function(data) {
			if (data.length == 0) {
				alert("fail");
			} else {
				for(var i=0;  i < data.length; i++){
					setNode(data[i]);
				}
				
				$("#nodeViewDiv").trigger("create");
			}
		}
	});
}

var cnt = 0;
function setNode(node){
	//첫번째 노드일 경우
	if(node.parentid=="0"){		
		var makeTopUL = "";
		makeTopUL += "<ul id='topul'>";
		makeTopUL += makeLI(node);
		makeTopUL += "</ul>";
		
		$("#nodeViewDiv").append(makeTopUL);
	}
	else{
		if($("#ul" + node.parentid).length == 0){
			$("#li" + node.parentid).append(makeUL(node));
		}
		else{
			$("#ul" + node.parentid).append(makeLI(node));
		}
	}
}

function makeUL(node){
	var inHTML = "";
	inHTML += "<ul id='ul" + node.parentid + "'>";
	inHTML += makeLI(node);
	inHTML += "</ul>";
	
	return inHTML;	
}

function makeLI(node){
	var inHTML = "";
	inHTML += "<li id='li" + node.nodeid + "' nodeid='" + node.nodeid + "'>";
	inHTML += "<span class='nodeDiv'>";
	inHTML += "<img src='./resources/img/nodeImages/SceneIcon.png' class='scene_icon'>";
	inHTML += "<br><div class='nodeText'>" + node.nodename + "</div>";
	/*inHTML += "nodecontent: " + node.nodecontent + "<br>";*/
	inHTML += "</span>";
	inHTML += "</li>";
	
	return inHTML;
}


$(window).click(function(e) {
	var parentObject = $(e.target);
	var parentNodeid;
	
	var cnt = 0;
	while(true){
		if(parentObject.attr("class") == 'nodeDiv'){
			parentObject = parentObject.parent();
			break;
		}
		else{
			parentObject = parentObject.parent();
			cnt++;
		}
		
		if(cnt > 5){
			$("#informationDiv").css("display", "none");
			return;
		}
	}
	
	parentNodeid = parentObject.attr("nodeid");
	
	console.log("x : " + e.pageX + " , y : " + e.pageY);
	
	displayInformation(e.pageX, e.pageY, parentNodeid);
	
});


function addChildScene(gameid, nodeid){
	$.ajax({
		type : "GET",
		url : "addChildScene?gameid=" + gameid + "&nodeid=" + nodeid,
		success : function(data) {
			if (data.length == 0) {
				alert("fail");
			} 
			else if(data == "false"){
				alert("insert fail");
			}			
			else {
				location.reload();
			}
		}
	});
}