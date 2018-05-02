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
			<div style="margin-left:80%;margin-top:2vh;">
				<label><a href="javascript:signup();">회원가입</a></label>
			</div>
		</div>
	</div>
</div>
<div id="signup-container" class="modal">
	<div class="modal-content animate">
		<form class="container form-container" id="formContainer" method="post" enctype="multipart/form-data">
			<h1>회원가입</h1>
			<label>계정명</label>
			<input type="text" placeholder="Enter ID" name="userid" id="signup-id" required>
			<label class="requireId" id="requireId">중복된 ID입니다</label>
			<input type="hidden" id="signup-idchk" value="N">
			<label>비밀번호</label>
			<input type="password" placeholder="Enter PW" name="userpw" id="signup-pw" required>
			<label>닉네임</label>
			<input type="text" placeholder="Enter NickName" name="nick" id="signup-nick" required>
			<label>이메일</label>
			<input type="text" placeholder="Enter E-mail" name="email" id="signup-email" required>
			<label>프로필 사진</label>
			<input type="file" name="signup-profile" id="userprofile" required>
			<button type="button" onclick="signUp();" >회원가입</button>
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
			url:'idCheck',
			type:'post',
			data:{
				joinId:$("#signup-id").val()
			},
			success:function(result){
				if(result != "true"){
					$("#requireId").css("display", "block");
					$("#signup-id").focus();	
				}
				else{
					$("#requireId").css("display", "none");
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
        var formData = new FormData($("#formContainer")[0]);
        
		$.ajax({
			type : 'post',
            url : 'signup',
            data : formData,
            processData : false,
            contentType : false,
            success : function(html) {
                alert("가입 완료");
                signUp_complete();
            },
            error : function(error) {
                alert("fail");
                console.log(error);
                console.log(error.status);
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
		$("#signup-id").val("");
		$("#signup-pw").val("");
		$("#signup-nick").val("");
		$("#signup-email").val("");
		$("#signup-container").css("display", "none");
	}

	function signup(){
		closeLogin();
		$("#signup-container").css("display", "block");
	}
</script>