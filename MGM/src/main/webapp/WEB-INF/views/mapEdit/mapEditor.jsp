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
		<canvas id="tileset" style="background-color: gray"></canvas>
		<button id="btn_tileset">타일셋 변경</button>
		<button id="btn_save">저장하기</button>
		
		<br>

		<button id="btn_tile_1x1">1x1타일</button>
		<button id="btn_tile_4x4">4x4타일</button>
		
	</body>
</html>