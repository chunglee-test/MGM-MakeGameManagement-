<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<title>Map Editor</title>
		
		<!-- Bootstrap -->
		<link href="<c:url value='/resources/bootstrap/css/bootstrap.css'/>" rel="stylesheet">

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
		
		<script type="module" src="<c:url value='/resources/js/main.js'/>">
		
		</script>
	</head>
	<body>
		
		<!-- 맵 에디터 메인 페이지입니다
		 -->
		<canvas id="tileset" width="600" height="600" style="background-color: red"></canvas>
		<canvas id="screen" width="640" height="640" style="background-color: black"></canvas>
		
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js'/>"></script>
		
	</body>
</html>