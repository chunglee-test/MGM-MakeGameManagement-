<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<link rel="stylesheet" href="./resources/css/loginPageStyle.css">

<div id="login-container" class="modal">
	<div class="modal-content animate" id="loginForm">
		<div class="container form-container">
			<span onclick="closeLogin()" class="close" title="Close Modal">
				&times;
			</span>
			<label for="uname">
				UserID
			</label> 
			<input type="text" placeholder="Enter ID" name="userid" id="userid" required> 
			<label for="psw">
				Password
			</label> 
			<input type="password" placeholder="Enter Password" name="userpw" id="userpw" required>
			<input type="button" class="btn btn-primary" style="width:100%" value="Login" onclick="loginChk();">
			<label><a href="javascript:signup();">회원가입</a></label>
		</div>
	</div>
</div>
<div id="signup-container" class="modal">
	<div class="modal-content animate">
		<form class="container form-container">
			<h1>회원가입</h1>
			<label>계정명</label>
			<input type="text" placeholder="Enter ID" name="signup-id" id="signup-id" required>
			<label class="requireId">중복된 ID입니다</label>
			<input type="hidden" id="signup-idchk" value="N">
			<label>비밀번호</label>
			<input type="password" placeholder="Enter PW" name="signup-pw" id="signup-pw" required>
			<label>닉네임</label>
			<input type="text" placeholder="Enter NickName" name="signup-nick" id="signup-nick" required>
			<label>이메일</label>
			<input type="text" placeholder="Enter E-mail" name="signup-email" id="signup-email" required>
			<label>프로필 사진</label>
			<input type="file" name="signup-profile" id="signup-profile" required>
			<button type="button" onclick="signUp();">회원가입</button>
		</form>
	</div>
</div>

<script>
	var modal = document.getElementById('login-container');
	var modal2= document.getElementById('signup-container');

	window.onclick = function(event) {
	    if (event.target == modal) {
	    	closeLogin();
    	}
	    else if(event.target == modal2){
	    	closeSignup();
	    }
	}
	
	$("#signup-id").blur(function(){
		$.ajax({
			url:'idChk',
			type:'post',
			data:$("#signup-id"),
			success:function(result){
				if(result != "true"){
					
				}
			},
			error:function(){
				alert('Server Error')
			}
		});
	});
	
	function loginChk(){
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
	
	
	
	function signUp(){
		var userid = $('#signup-id');
		var userpw = $('#signup-pw');
		var nick = $('#signup-nick');
		var email = $('#signup-email');
		$.ajax({
			url:'signup',
			type:'post',
			data:{
				userid:userid,
				userpw:userpw,
				nick:nick,
				email:email
			},
			success:function(){
				if($('#signup-profile' != '')){
					alert("here1");
					signUp_profile();
				}
				else{
					alert("회원가입이 되었습니다.");
					signUp_complete();					
				}
			}
		});
	}
	
	function signUp_profile(){
		$.ajax({
			url: 'signupProfile',
		    data: $('#signup-profile').attr('files'),
		    cache: false,
		    contentType: 'multipart/form-data',
		    processData: false,
		    type: 'post',
		    success: function(data){
		        alert(data);
		    }
		});
	}
	
	function signUp_complete(){
		closeSignup();
		$("login-container").css("display", "block");
	}
	
	function closeLogin(){
		$("#login-container").css("display", "none");
	}
	function closeSignup(){
		$("#signup-container").css("display", "none");
	}

	function signup(){
		closeLogin();
		$("#signup-container").css("display", "block");
	}
</script>