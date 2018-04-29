/**
 * 
 */
var modal = document.getElementById("editGameAccountDiv");

window.onclick = function(event) {
    if ($(event.target).attr("class") == $("#editGameAccountDiv").attr("class")) {
    	closeEditDiv();
	}
}

function closeEditDiv(){	
	$("#editGameAccountDiv").css("display", "none");	
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
            alert("저장 완료");
            location.reload();
        },
        error : function(error) {
            alert("fail");
            console.log(error);
            console.log(error.status);
        }
	});
}