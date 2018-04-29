<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="./resources/css/gameBoardStyle.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script src="./resources/js/gameBoard.js"></script>
	<script>
		$(document).ready(function(){
			$("#playBtn").click(function(){
				location.href="loadGame?gameid=2";
			});
			$("#editBtn").click(function(){
				$("#editGameAccountDiv").css("display","block");
			});
			$("#sceneBtn").click(function(){
				location.href="produceScene?gameid=${param.gameid}";
			});
			$("#saveBtn").click(function(){
				saveEditData();
			});
			$(".wait_screenshot").click(function(event){
				var getImgDiv = $(event.target).parent().attr("id");
				var imgHTML = $("#"+getImgDiv).html();
				$("#screenshotMain").html(imgHTML);
			});
		});
	</script>
</head>
<body>
	<div class="container gameboard-container">
		<div class="title_area">
			<p class="game_title">
				${game.gamename}
			</p>
			<p class="title_button">
				<button type="button" class="btn btn-primary" id="playBtn">Play&nbsp;!</button>
				<button type="button" class="btn btn-success" id="openBtn">Open&nbsp;</button>
				<button type="button" class="btn btn-warning" id="editBtn">Edit</button>
				<button type="button" class="btn btn-danger" id="sceneBtn">Scene</button>
			</p>
		</div>
		<div class="game_image_area">
			<div class="left-account-area">
				<div class="game_screenshot">
					<div class="game_screenshot_view" id="screenshotMain">
						<img src="./resources/img/game/1_screenshot_1.jpg"
							onerror="javascript:this.src='./resources/img/game/NoImage.png'">
					</div>
					<div class="game_screenshot_wait">
						<div class="wait_screenshot" id="screenshot_1">
							<img src="./resources/img/game/screenshot_1.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
						<div class="wait_screenshot" id="screenshot_2">
							<img src="./resources/img/game/screenshot_2.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
						<div class="wait_screenshot" id="screenshot_3">
							<img src="./resources/img/game/screenshot_3.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
						<div class="wait_screenshot" id="screenshot_4">
							<img src="./resources/img/game/screenshot_4.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
						<div class="wait_screenshot" id="screenshot_5">
							<img src="./resources/img/game/screenshot_5.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
					</div>
				</div>
			</div>
			<div class="right-account-area">
				<div class="game_account">
					<img class="game_title_view" src="./resources/img/game/${param.gameid}_maintitle.jpg" 
						onerror="javascript:this.src='./resources/img/game/NoImage.png'">
					
					<table class="account_table">
						<tr class="producer">
							<td class="left_td">
								제작자
							</td>
							<td>
								${game.nick}
							</td>
						</tr>
						<tr class="opendate">
							<td class="left_td">
								공개일
							</td>
							<td>
								${game.opendate }
							</td>
						</tr>
						<tr class="game_point">
							<td class="left_td">
								점수
							</td>
							<td>
								7.5
							</td>
						</tr>
						<tr>
							<td colspan="2" class="account-area">
								${game.gamecontent }		
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	<div class="edit-game-account-div modal" id="editGameAccountDiv">
		<div class="modal-content animate" id="loginForm">
			<div class="container edit-container">
				<form id="editGameAccountForm" method="post" enctype="multipart/form-data">
					<span onclick="closeEditDiv()" class="close" title="Close Modal">
						&times;
					</span>
					<p class="title-area">
						<label>게임 제목</label>
						<input type="text" placeholder="게임 타이틀" name="gamename" id="gamename" value="${game.gamename }" required>
					</p>
					<p class="content-area">
						<label>게임 설명</label>
						<textarea placeholder="게임 설명" name="gamecontent" id="gamecontent" required>${game.gamecontent}</textarea>
					</p>
					<p class="img-area">
						<label>타이틀 이미지</label>
						<input type="file" name="maintitle" id="maintitle" required>
						<input type="hidden" name="gameid" id="hiddenGameId" value="${param.gameid}">				
					</p>
				</form>
				<form id="editScreenShotForm" method="post" enctype="multipart/form-data" style="padding-bottom:10px;">
					<p class="screenshot-area">
						<label>인게임 스크린샷</label>
						<input type="file" name="screenshot_1" id="screenshot_1">	
						<input type="file" name="screenshot_2" id="screenshot_2">
						<input type="file" name="screenshot_3" id="screenshot_3">
						<input type="file" name="screenshot_4" id="screenshot_4">
						<input type="file" name="screenshot_5" id="screenshot_5">
					</p>
					<p class="savebtn-area">
						<button type="button" class="btn btn-primary savebtn" id="saveBtn">SAVE</button>
					</p>
				</form>
			</div>
		</div>
	</div>
</body>
</html>