<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>MGM - Map Editor Page</title>
		
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
		<script src="resources/js/phaser-2-10-3.js"></script>
		<script type="module" src="resources/js/mapEdit.js"></script>
		<link rel="stylesheet" href="./resources/css/mainStyle.css">
		<script type="text/javascript">
			var eventsList = new Array();
			var eventPosX, eventPosY;
			function getReturnValue(returnValue) {
				console.log("total events ");
				console.log(returnValue);
				eventsList.push(returnValue);
			}
		</script>
	</head>
	<body>
		<div class="search_div">
			<input type="text" class="search_area">
			<button><img src="resources/img/Icon/searchbt.png"></button>
			<button class="bt_save">저장</button>
			<button class="bt_uppermenu">상위메뉴로</button>
		</div>
		<div style="float: left;">
			<div class="inner_div">
				<canvas id="tileset" style="background-color: gray"></canvas><br>
				<button id="btn_tileset">타일셋 변경</button>
				<button id="btn_save">저장하기</button>
				<button id="btn_tile_1x1">1x1타일</button>
				<button id="btn_tile_4x4">4x4타일</button>
			</div>
		</div>
	</body>
</html>