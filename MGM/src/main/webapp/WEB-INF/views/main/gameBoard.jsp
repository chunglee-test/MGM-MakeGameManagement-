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
		    $('#loading').hide(); 
			$("#playBtn").click(function(){
				<c:choose>
					<c:when test="${empty userid}">
						alert("로그인을 해주세요");
					</c:when>
					<c:otherwise>
						$("#gameSelectDiv").css("display", "block");
					</c:otherwise>
				</c:choose>
			});
			$("#openBtn").click(function(){
				openGame();
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
			$("#commentBtn").click(function(){
				$("#commentDiv").css("display","block");
			});
			$("#writeCommentBtn").click(function(){
				writeComment(${param.gameid});
			});
			$("#commentIsGood").click(function(){
				var point = $("#commentPoint").val();
				
				if(point == 1){
					$("#commentIsGood").attr("src", "./resources/img/game/BadFace.png");
					$("#commentPoint").val(-1);
				}
				else if(point == -1){
					$("#commentIsGood").attr("src", "./resources/img/game/GoodFace.png");
					$("#commentPoint").val(1);
				}
				else{
					location.reload();
				}
			});
			$("#playNewGame").click(function(){
				location.href="loadGame?gameid=${param.gameid}";
			});
			$("#playSaveGame").click(function(){
				location.href="loadGameFromHis?gameid=${param.gameid}";
			});
			$("#closeWindow").click(function(){
		    	$("#editGameAccountDiv").css("display", "none");
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
	<%@ include file="./loading.jsp"%>
	<input type="hidden" value="${param.gameid}" id="gameId">
	<input type="hidden" value="${game.isopen}" id="isOpen">
	<div class="container gameboard-container">
		<div class="title_area">
			<p class="game_title">
				${game.gamename}
			</p>
			<p class="title_button">
				<button type="button" class="btn btn-primary" id="playBtn">실행</button>
				<c:set var="open" value="Y" />
				<c:set var="close" value="N" />
				<c:if test="${game.userid == userid}">
					<c:if test="${game.isopen == open}">
						<button type="button" class="btn btn-basic" id="openBtn"><b>비공개</b></button>
					</c:if>
					<c:if test="${game.isopen == close}">
						<button type="button" class="btn btn-success" id="openBtn"><b>공개</b></button>
					</c:if>
					<button type="button" class="btn btn-warning" id="editBtn"><b>수정</b></button>
					<button type="button" class="btn btn-danger" id="sceneBtn"><b>줄거리</b></button>
				</c:if>
			</p>
		</div>
		<div class="game_image_area">
			<div class="left-account-area">
				<div class="game_screenshot">
					<div class="game_screenshot_view" id="screenshotMain">
						<img src="./resources/img/game/${param.gameid}_screenshot_1.jpg"
							onerror="javascript:this.src='./resources/img/game/NoImage.png'">
					</div>
					<div class="game_screenshot_wait">
						<div class="wait_screenshot" id="screenshot_1">
							<img src="./resources/img/game/${param.gameid}_screenshot_1.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
						<div class="wait_screenshot" id="screenshot_2">
							<img src="./resources/img/game/${param.gameid}_screenshot_2.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
						<div class="wait_screenshot" id="screenshot_3">
							<img src="./resources/img/game/${param.gameid}_screenshot_3.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
						<div class="wait_screenshot" id="screenshot_4">
							<img src="./resources/img/game/${param.gameid}_screenshot_4.jpg"
								onerror="javascript:this.style.display='none'">
						</div>
						<div class="wait_screenshot" id="screenshot_5">
							<img src="./resources/img/game/${param.gameid}_screenshot_5.jpg"
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
								${game.opendate}
							</td>
						</tr>
						<tr class="game_point">
							<td class="left_td">
								점수
							</td>
							<td>
								${gamePoint.PP - gamePoint.MP} ( 
								<font color="green">
									${gamePoint.PP}
								</font> / 
								<font color="red">
									${gamePoint.MP} 
								</font>
								)
							</td>
						</tr>
						<tr>
							<td colspan="2" class="account-area">
								${game.gamecontent }		
							</td>
						</tr>
						<tr>
							<td class="comment-bt-td" colspan="2">
								<button class="btn btn-danger" id="commentBtn" style="float:right;">댓글보기</button>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal edit-game-account-div" id="editGameAccountDiv">
		<div class="modal-content animate">
			<div class="container edit-container">
				<form id="editGameAccountForm" method="post" enctype="multipart/form-data">
					<span class="close" title="Close Modal" id="closeWindow">
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
				<form id="saveGameScreenshot" method="post" enctype="multipart/form-data" style="padding-bottom:10px;">
					<p class="screenshot-area">
						<label>인게임 스크린샷</label>
						<input type="file" name="screenshot_1" id="screenshot_1">	
						<input type="file" name="screenshot_2" id="screenshot_2">
						<input type="file" name="screenshot_3" id="screenshot_3">
						<input type="file" name="screenshot_4" id="screenshot_4">
						<input type="file" name="screenshot_5" id="screenshot_5">
						<input type="hidden" name="gameid" id="hiddenGameId" value="${param.gameid}">
					</p>
					<p class="savebtn-area">
						<button type="button" class="btn btn-primary savebtn" id="saveBtn">SAVE</button>
					</p>
				</form>
			</div>
		</div>
	</div>

	<div class="modal comment-div" id="commentDiv">
		<div class="commentArea modal-content animate">
			<div class="container comment-container" style="height:550px;">
				<c:if test="${!empty userid}">
					<div class="input-comment">
						<input type="hidden" value="1" id="commentPoint">
						<input type="text" class="comment-text" id="commentText" style="width: 700px;">
						<img src="./resources/img/game/GoodFace.png" style="width:40px;" id="commentIsGood">
						<button type="button" class="write-comment-btn"
							id="writeCommentBtn">평가 남기기</button>
					</div>
				</c:if>
				<div class="comment-inner-div" style="max-height:460px;">
					<c:forEach items="${cList}" var="comment">
						<c:choose>
							<c:when test="${comment.point == 1}">
								<c:set var="setColor" value="good-point" />								
							</c:when>
							<c:when test="${comment.point == -1}">
								<c:set var="setColor" value="bad-point" />
							</c:when>
						</c:choose>
						<div class="view-comment ${setColor}"> 
							<img src="./resources/img/user/${comment.userid}.jpg"  onerror="javascript:this.src='./resources/img/user/NoProfile.png'"
								class="user-profile"> 
							<span class="comment-span">${comment.gcomment }</span>
							<div>${comment.nick}</div>
						</div>						
					</c:forEach>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal game-select" id="gameSelectDiv">
		<div class="modal-content animate game-select-content" id="gameSelectContent">
			<div class="game-select-container container" style="width:100%;height:30vh;">
				<div class="select-option" style="float:left;" id="playNewGame">
					<img src="./resources/img/game/myListPlus.png" class="game-select-img">
					<div>새로운 게임</div>
				</div>
				<div class="select-option" style="float:right;" id="playSaveGame">
					<img src="./resources/img/game/GameSaveImg.png" class="game-select-img">
					<div>저장된 게임</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>