<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<link rel="stylesheet" href="./resources/css/loginPageStyle.css">

<div id="login-container" class="modal">
	<form class="modal-content animate" id="loginForm">
		<div class="container form-container">
			<label for="uname">
				<b>UserID</b>
			</label> 
			<input type="text" placeholder="Enter ID" name="userid" id="userid" required> 
			<label for="psw">
				<b>Password</b>
			</label> 
			<input type="password" placeholder="Enter Password" name="userpw" id="userpw" required>
			<input type="button" class="btn btn-primary" style="width:100%" value="Login" onclick="loginChk();">
		</div>
	</form>
</div>

<script>
	var modal = document.getElementById('login-container');

	window.onclick = function(event) {
	    if (event.target == modal) {
    	    modal.style.display = "none";
    	}
	}
	
	function loginChk(){
		var form = $("#loginForm");
		var userid = $("#userid").val();
		var userpw = $("#userpw").val();
		
		alert(userid + "/" + userpw);
		
		$.ajax({
			url:'login',
			type:'post',
			data:{
				userid:userid,
				userpw:userpw
			},
			success:function(result){
				if(result == 'true'){
					location.reload();
				}
				else if(result == 'false'){
					alert('잘못 입력하셨습니다');
				}
			},
			error:function(){
				alert('Server Error');	
			}
		});	
	}
</script>