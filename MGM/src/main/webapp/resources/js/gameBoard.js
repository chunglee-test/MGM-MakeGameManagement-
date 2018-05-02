/**
 * 
 */
var modal = document.getElementById("editGameAccountDiv");

window.onclick = function(event) {
    if ($(event.target).attr("class") == $("#editGameAccountDiv").attr("class")) {
    	$("#editGameAccountDiv").css("display", "none");
	}
    else if($(event.target).attr("class") == $("#commentDiv").attr("class")) {
    	$("#commentDiv").css("display", "none");
	}
    else if($(event.target).attr("class") == $("#gameSelectDiv").attr("class")) {
    	$("#gameSelectDiv").css("display", "none");
	}
}

function saveEditData(){
    var formData = new FormData($("#editGameAccountForm")[0]);
    
	$.ajax({
		type : 'post',
        url : 'saveGameAccount',
        data : formData,
        processData : false,
        contentType : false,
        success : function(html) {
            saveGameScreenshot();
        },
        error : function(error) {
            alert("fail");
            console.log(error);
            console.log(error.status);
        }
	});
}
function saveGameScreenshot(){
    var formData = new FormData($("#saveGameScreenshot")[0]);
    
	for(var i=1; i <= 5; i++){
		if($("#screenshot_" + i).val() != null){
			$.ajax({
				type : 'post',
		        url : 'saveGameScreenshot',
		        data : formData,
		        processData : false,
		        contentType : false,
		        success : function(html) {
		        },
		        error : function(error) {
		            console.log(error);
		            console.log(error.status);
		        }
			});
			
			break;
		}
	}

    alert("저장 완료");
    location.reload();
}

function openGame(){
	var getGameid = $("#gameId").val();
	var getIsopen = $("#isOpen").val();
	
	if(getIsopen == "Y"){
		if(!(confirm("게임을 비공개로 전환하시겠습니까?"))){
			return;
		}
		else{
			getIsopen = "N";
		}
	}
	else if(getIsopen == "N"){
		if(!(confirm("게임을 공개하시겠습니까?"))){
			return;
		}
		else{
			getIsopen = "Y";
		}
	}
	
	$.ajax({
		type : 'get',
        url : 'openGame?gameid='+getGameid+'&isopen='+getIsopen,
        processData : false,
        contentType : false,
        success : function(msg) {
        	if(msg == "false"){
        		alert("문제가 발생하였습니다");
        	}
        	else{
        		alert("성공적으로 처리하였습니다");        		
        	}
        	
        	location.reload();
        },
        error : function(error) {
            console.log(error);
            console.log(error.status);
        }
	});
}

function writeComment(gameid){
	var comment = $("#commentText").val();
	var point = $("#commentPoint").val();
	
	$.ajax({
		type : 'get',
        url : 'writeComment',
        data:{
        	gameid : gameid,
        	gcomment : comment,
        	point : point
        },
        success : function(msg) {
        	if(msg == "false"){
        		alert("문제가 발생하였습니다");
        	}
        	else{
        		alert("소중한 의견 감사합니다");        		
        	}
        	
        	location.reload();
        },
        error : function(error) {
            console.log(error);
            console.log(error.status);
        }
	});
}