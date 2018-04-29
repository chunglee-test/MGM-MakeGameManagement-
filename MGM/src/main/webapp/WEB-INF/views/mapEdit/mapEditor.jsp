<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>MGM - Map Editor Page</title>
		
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
		<script src="resources/js/phaser-2-10-3.js"></script>
		
		<script type="text/javascript" src="resources/js/exportToJSON.js"></script>
		<script type="text/javascript" src="resources/js/util.js"></script>
		<script type="text/javascript">
			var gameid = "${scene.gameid}";
			var nodeid = "${scene.nodeid}";
			var nodename = "${scene.nodename}";
			var nodecontent = ${scene.nodecontent};

			var childList = new Array();
			let child = new Object();
			<c:forEach items="${childList}" var="child">
				childList.push({nodeid:'${child.nodeid}', nodename:'${child.nodename}'});
			</c:forEach>
		</script>
	</head>
	<body>
		<div class="search_div">
			<input type="text" id="txt_nodename">
			<button><img src="resources/img/Icon/searchbt.png"></button>
			<button id="btn_save">저장</button>
			<button id="btn_uppermenu">상위메뉴로</button>
		</div>
		<div style="float: left;">
			<div class="inner_div">
				<canvas id="tileset" style="background-color: gray"></canvas><br>
				<button id="btn_tileset">타일셋 변경</button>
				<button id="btn_tile_1x1">1x1타일</button>
				<button id="btn_tile_4x4">4x4타일</button>
			</div>
		</div>
		
		<script type="text/javascript" src="resources/js/mapEdit.js"></script>
	</body>
</html>