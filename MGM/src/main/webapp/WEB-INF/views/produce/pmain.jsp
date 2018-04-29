<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="./resources/css/mainStyle.css">
	<link rel='stylesheet' type='text/css' href='./resources/css/gameNodeTree.css'>
	<link rel='stylesheet' type='text/css' href='./resources/css/gameNodeStyle.css'>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="./resources/js/gameNode.js"></script>
	<script>
		$(document).ready(function(){			
			getNode(${param.gameid});
		});		

		function displayInformation(x, y, nodeid){	
			$("#informationDiv").css("left", x + 20);
			$("#informationDiv").css("top", y - 12);
			$("#modifyDiv").attr("onclick", "location.href='loadGameScene?nodeid=" + nodeid + "'");
			$("#addSceneDiv").attr("onclick", "addChildScene(${param.gameid}," + nodeid + ")");
			$("#informationDiv").css("display", "block");
		}
		
		function closeInformation(){
			$("#informationDiv").css("display", "none");   
	    }
	</script>
</head>
<body>
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