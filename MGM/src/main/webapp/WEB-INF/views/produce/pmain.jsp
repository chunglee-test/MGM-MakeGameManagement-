<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel='stylesheet' type='text/css' href='./resources/css/gameNodeStyle.css'>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="./resources/js/gameNode.js"></script>
	<script>
		$(document).ready(function(){
			getNode(${param.gameid});
		});
	</script>
</head>
<body>
	<div id="nodeViewDiv" class="nodeViewDiv"></div>
</body>
</html>