<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>Make Game Manager</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="./resources/css/mainStyle.css">
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="resources/js/mainpagetest.js"></script>
<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<!-- 부가적인 테마 -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<script type="text/javascript">
	var supportsTouch = "ontouchstart" in window
			|| window.navigator.msPointerEnabled;
	if (supportsTouch) {
		document.querySelector(".container").style.overflowX = "scroll";
		document.querySelector("#nav-right").style.display = "none";
		document.querySelector("#nav-left").style.display = "none";
	}
</script>
</head>
<body class="mainpage_body">
	<!--images from http://haryarti.deviahntart.com/gallery/-->
	<div class="container">
		<header><h2 style="color: white;margin-top:5vh">인기게임 Top 4</h2></header>
		<ul class="gallery">
			<c:forEach items="${pList }" var="game">
				<li>
					<div class="flip" onclick="location.href='gameBoard?gameid=${game.gameid}'" style="cursor: pointer; margin-right:10px;">
						<div class="front-side" style="background-image:url('./resources/img/game/${game.gameid}_maintitle.jpg')"></div>
						<div class="back-side">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>${game.gamename }</h3>
									<p>${game.gamecontent }</p>
								</div>
							</div>
						</div>
					</div>
				</li>
			</c:forEach>
		</ul>
		<header><h2 style="color: white;margin-top:5vh">신작게임 Top 4</h2></header>
		<ul class="gallery">
			<c:forEach items="${rList }" var="game">
				<li>
					<div class="flip" onclick="location.href='gameBoard?gameid=${game.gameid}'" style="cursor: pointer;">
						<div class="front-side" style="background-image:url('./resources/img/game/${game.gameid}_maintitle.jpg')"></div>
						<div class="back-side">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>${game.gamename }</h3>
									<p>${game.gamecontent }</p>
								</div>
							</div>
						</div>
					</div>
				</li>
			</c:forEach>
		</ul>
	</div>
</body>
</html>