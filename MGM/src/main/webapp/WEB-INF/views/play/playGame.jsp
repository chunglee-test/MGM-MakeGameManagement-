<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>MGM - Game Play Page</title>
		
		<!-- jQuery -->
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
		<!-- 페이저 -->
		<script src="resources/js/phaser-2-10-3.js"></script>
		<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
		<!-- 합쳐지고 최소화된 최신 CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">	
		<!-- 부가적인 테마 -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

		<script type="text/javascript">
			var gameid = ${scene.gameid};
			var nodeid = ${scene.nodeid};
			var mapData = ${scene.nodecontent};
		</script>		
		<script type="text/javascript" src="resources/js/util.js"></script>
		<script type="text/javascript" src="resources/js/playGame.js"></script>

		<style type="text/css">
			@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
			* {
				font-family: 'Nanum Gothic', sans-serif;
			}
		   
			body{
				background-color: #333333;
			}
			.background-player{
				display:none;
			}
		</style>
	</head>
	<body>
		<audio controls="controls" autoplay loop class="background-player" id="bgmPlayer">		
		    <source src="./resources/mp3/${scene.nodeid}.mp3" type="audio/mp3" />		
		</audio>
		<button id="btn_savegame" class="btn btn-primary">저장하기</button>
		<button id="btn_loadgame" class="btn btn-success">불러오기</button>
		<div style="width: fit-content; margin: auto;">
			<div style="float: left;">
				<img src="./resources/img/game/left.png" style="height:90%;">
			</div>
			<div id="playingmap" style="width: fit-content; float: left;"></div>
			<div style="float: left;">
				<img src="./resources/img/game/right.png" style="height: 600px;">
			</div>
		</div>
	</body>
</html>