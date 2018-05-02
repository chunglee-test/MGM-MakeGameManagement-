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
			/* filter:none;
			-webkit-filter: grayscale(0);
			
			-webkit-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			-moz-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75); */
		}
		img{
			/* filter: gray; 		
			-webkit-filter: grayscale(1); */
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
			filter: gray; /* IE6-9 */		
			-webkit-filter: grayscale(1);
		}
		.gamelist:hover{
			filter:none;
			-webkit-filter: grayscale(0);
			/* Google Chrome, Safari 6+ & Opera 15+ */
			-webkit-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			-moz-box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);
			box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.75);		
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
		.gamelist{
			height:24%;
		}
		.gamelist:hover {
			background-color: rgb(58,58,58);
			height:24%;
		}
		.none-list{
			color:white;
			font-size:2vw;
			text-align:center;
		}
		
		.move-page{		
			color:white;
			font-size:5vw;
			font-weight:bold;
			height:100%;
			width:10%;
			cursor:default;
		}
		.move-page:hover{
			color:gray;
        	background-color: rgba(255,255,255,0.1);
		}
		.left{
			position:absolute;
			left:0%;
		}
		.right{
			position:absolute;
			left:90%;
		}
		.left-page-move{
			position:absolute;
			top:40%;
			left:30%;
		}
		.right-page-move{
			position:absolute;
			top:40%;
			left:30%;
		}
		.gamereference{
			height:80%;
			max-height:80%;
		}
		.card-body{
			padding-right:10px;
		}
		.searchRst{
			color:#66C0F4;
			position:relative;
			top:110%;
			left:60%;
		}
	</style>
</head>
<body style="background-color: #333333;">
	<c:if test="${param.page > 1}">
		<div class="move-page left" id="moveLastPage" onclick="location.href='gameList?page=${param.page - 1}'">
			<span class="left-page-move">≪</span>
		</div>
	</c:if>
	<c:if test="${!empty isNext}">
		<div class="move-page right" id="moveNextPage" onclick="location.href='gameList?page=${param.page + 1}'">
			<span class="right-page-move">≫</span>
		</div>
	</c:if>
	<div class="container">
		<c:forEach items="${gList}" var="gList">
			<c:choose>
				<c:when test="${!empty gList.point}">
					<c:set var="searchRst" value="평점 : ${gList.point}"/>
				</c:when>
				<c:when test="${!empty gList.opendate}">
					<c:set var="searchRst" value="게시일 : ${gList.opendate}"/>
				</c:when>
			</c:choose>
			<div class="gamelist" onclick="location.href='gameBoard?gameid=${gList.gameid}'" style="height:21vh;">
				<%-- ${gList.gameid}_maintitle --%>
				<div class="gamereference">
					<div class="card text-white bg-primary mb-3" style= "max-width: 18vw; max-height: 16vh;">
						<img src="resources/img/game/${gList.gameid}_maintitle.jpg" class="list_thumbnail"
								onerror="javascript:this.src='./resources/img/game/NoImage.png'"
								style="width:100%; height:100%;">
					</div>
					<div class="gamereference">
						<span class="searchRst">${searchRst}</span>
						<div class="card-header" style="font-size: 18px;">${gList.gamename}</div>
						<div class="card-body">
							<h5 class="card-title maker-name">${gList.nick}</h5>
							<p class="card-text" style="color: white;">${gList.gamecontent}</p>
						</div>
					</div>
				</div>
			</div>
		</c:forEach>
		<c:if test="${empty gList}">
			<div class="none-list">
				<img src="./resources/img/game/IsNotResult.png" style="width:40%;margin-top:2vw;">
				<div style="margin-top:20px;">결과를 찾을 수 없습니다</div>
			</div>
		</c:if>
	</div>
</body>
</html>