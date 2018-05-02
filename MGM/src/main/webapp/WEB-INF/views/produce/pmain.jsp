<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel='stylesheet' type='text/css' href='./resources/css/gameNodeTree.css'>
	<link rel='stylesheet' type='text/css' href='./resources/css/gameNodeStyle.css'>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="./resources/js/gameNode.js"></script>
	<style>	
		.backspace{	
			-webkit-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			-moz-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			width:30px;
			height:30px;
		}
	</style>
	<script>
		$(document).ready(function(){			
			getNode(${param.gameid});
			
			$("#gotoTop").click(function(){
				location.href="gameBoard?gameid=${param.gameid}";
			});
		});		

		function displayInformation(x, y, nodeid){	
			$("#informationDiv").css("left", x + 20);
			$("#informationDiv").css("top", y - 12);
			$("#modifyDiv").attr("onclick", "location.href='loadGameScene?nodeid=" + nodeid + "'");
			$("#addSceneDiv").attr("onclick", "addChildScene(${param.gameid}," + nodeid + ")");
			$("#informationDiv").css("display", "block");
		}
	</script>
</head>
<body>
	<img src="./resources/img/game/backspace.png" style="" id="gotoTop" class="backspace">
	<div id="nodeViewDiv" class="nodeViewDiv"></div>	
	
	<div class="information_container" id="informationDiv">
		<div class="information" id="addSceneDiv">
			Add Scene
		</div>
		<div class="information inf_bottom" id="modifyDiv">
			Modify
		</div>
	</div>
</body>
</html>