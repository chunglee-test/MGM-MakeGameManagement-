<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	
	<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<!-- 합쳐지고 최소화된 최신 CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">	
	<!-- 부가적인 테마 -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
	<style>
		img:hover {
			filter: gray; /* IE6-9 */
			-webkit-filter: grayscale(1);
			/* Google Chrome, Safari 6+ & Opera 15+ */
			-webkit-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			-moz-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
		}
		.maker-name{
			text-align:left;
		}
		.gamelist {
			clear: both;
			padding-top: 20px;
			color: white;
			padding-left: 30px;
		}
		.card {
			float: left;
			width: 300px;
			height: 150px;
			margin-right: 30px;
		}
		.list_thumbnail {
			max-width: 100%;
			height: auto;
		}
		.gamelist:hover {
			background-color: rgb(58,58,58);
			height: 165px;
		}
	</style>
</head>
<body style="background-color: #333333;">
<!-- https://getbootstrap.com/docs/4.1/components/card/ -->
	<div class="container">
		<c:forEach items="${gList}" var="gList">
			<div class="gamelist" onclick="location.href='gameBoard?gameid=${gList.gameid}'">
				<%-- ${gList.gameid}_maintitle --%>
				<div class="card text-white bg-primary mb-3" style= "max-width: 18vw; max-height: 16vh;"><img src="resources/img/game/${gList.gameid}_maintitle.jpg" class="list_thumbnail"></div>
				<div class="gamereference">
					<div class="card-header" style="font-size: 18px;">${gList.gamename}</div>
					<div class="card-body">
						<h5 class="card-title maker-name">${gList.nick}</h5>
						<p class="card-text" style="color: white;">${gList.gamecontent}안녕하세요.</p>
					</div>
				</div>
			</div>
		</c:forEach>
		<c:if test="${empty gList}">
			<div class="none-list">
				해당하는 리스트가 없습니다.
			</div>
		</c:if>
	</div>
</body>
</html>