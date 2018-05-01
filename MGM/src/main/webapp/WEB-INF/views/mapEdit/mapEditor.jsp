<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>MGM - Map Editor Page</title>
		
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
		
		<script type="text/javascript" src="resources/js/exportToJSON.js"></script>
		<script type="text/javascript" src="resources/js/util.js"></script>
		<script type="text/javascript">
			var gameid = "${scene.gameid}";
			var nodeid = "${scene.nodeid}";
			var nodename = "${scene.nodename}";
			var nodecontent = ${scene.nodecontent};

			var childrenList = new Array();
			let child = new Object();
			<c:forEach items="${childList}" var="child">
				childrenList.push({nodeid:'${child.nodeid}', nodename:'${child.nodename}'});
			</c:forEach>
		</script>

		<style>
		.btn-group button {
		    background-color: #f7f7f7; /* Green background */
		    border: 1px solid #ddd; /* Green border */
		    color: black; /* White text */
		    padding: 10px 20px; /* Some padding */
		    cursor: pointer; /* Pointer/hand icon */
		    width: 100%; /* Set a width if needed */
		    display: block; /* Make the buttons appear below each other */
		}

		.btn-group button:not(:last-child) {
		    border-bottom: none; /* Prevent double borders */
		}

		/* Add a background color on hover */
		.btn-group button:hover {
		    background-color: #e6e6e6;
		}
		</style>

	</head>
	<body>
		<div>
			<div style="float: left; width: 42%; border-right: 2px solid #151515; margin-left: 30px; margin-right: 30px; margin-top: 10px; ">
				<div style="float: left;">
					<div class="btn-group">
						<button class="btn_tileset" name="0">바닥타일1</button>
						<button class="btn_tileset" name="1">바닥타일2</button>
					  	<button class="btn_tileset" name="2">바닥타일3</button>
					  	<button class="btn_tileset" name="3">바닥타일4</button>
						<button class="btn_tileset" name="4">바닥타일5</button>
					  	<button class="btn_tileset" name="5">물건타일1</button>
					  	<button class="btn_tileset" name="6">물건타일2</button>
						<button class="btn_tileset" name="7">물건타일3</button>
					  	<button class="btn_tileset" name="8">물건타일4</button>
					  	<button class="btn_tileset" name="9">물건타일5</button>
					</div>
				</div>
				<div style="float: left;">				
					<canvas id="tileset"></canvas>
				</div>
			</div>
		</div>
		<div style="float: left; margin-right: 50px; margin-top: 10px;">
			<div>
				<input type="text" id="txt_nodename" value="${scene.nodename}" style="font-size:20pt; font-weight:bold;">
				<button class="btn btn-primary" id="btn_save">저장</button>
				<button class="btn btn-danger" id="btn_uppermenu">상위메뉴로</button>

				<button id="btn_tile_1x1" class="btn btn-default">1x1 그리기</button>
				<button id="btn_tile_4x4" class="btn btn-default">4x4 그리기</button>
				<button id="btn_tile_full" class="btn btn-default">전체 그리기</button>
			</div>
			<div id="editingmap" style="width: 100%; float: right; ">
			</div>
		</div>
		
		<%@ include file="eventEditor.jsp" %>
		
		<script type="text/javascript" src="resources/js/mapEdit.js"></script>
		<script type="text/javascript" src="resources/js/eventEdit.js"></script>
	</body>
</html>