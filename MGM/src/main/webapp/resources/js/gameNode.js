function getNode(gameid) {
	$.ajax({
		type : "GET",
		url : "sceneLoad?gameid=" + gameid,
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
	inHTML += "<li id='li" + node.nodeid + "'>";
	inHTML += "<div class='nodeDiv'>";
	inHTML += "id : " + node.nodeid + "<br>";
	inHTML += "parentid : " + node.parentid + "<br>";
	inHTML += "nodename : " + node.nodename + "<br>";
	/*inHTML += "nodecontent: " + node.nodecontent + "<br>";*/
	inHTML += "</div>";
	inHTML += "</li>";
	
	return inHTML;
}