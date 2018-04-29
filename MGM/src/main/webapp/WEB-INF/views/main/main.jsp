<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>Make Game Manager</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="./resources/css/mainStyle.css">
	
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	
	<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<!-- 합쳐지고 최소화된 최신 CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">	
	<!-- 부가적인 테마 -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
	<!-- Carousel -->
	<script src="resources/js/carouseller.min.js"></script>
	<script type="text/javascript">
		$(function() {
			carouseller = new carousel('.carouseller');
		});
	</script>
</head>
<body class="mainpage_body">
	<div class="main_bottom_div">
		<header><h1 style="color: white;">인기</h1></header>
		<div class="wrapper">
			<div class="gallery">
				<ul id="portfolio">
					<li><img src="resources/img/Dummy/Aion.jpg" alt="image"></li>
					<li><img src="resources/img/Dummy/Aion.jpg" alt="image"></li>
					<li><img src="resources/img/Dummy/Aion.jpg" alt="image"></li>
					<li><img src="resources/img/Dummy/Aion.jpg" alt="image"></li>
				</ul>
				<div class="inner_gamename">
					<label class="gamename_1">게임 이름</label>
					<label class="gamename_2">게임 이름</label>
					<label class="gamename_3">게임 이름</label>
					<label class="gamename_4">게임 이름</label>
				</div>
			</div>
		</div>
		<a class="prev" onclick="plusSlides(-1)" id="left1" >&#10094;</a>
		<a class="next" onclick="plusSlides(1)" style="margin-right: 95px;" id="right1">&#10095;</a>
	</div>
	<div class="main_bottom_div2">
		<header><h1 style="color: white;">최근 등록</h1></header>
		<div class="wrapper">
			<div class="gallery">
				<ul>
					<li><img src="resources/img/Dummy/Aion.jpg" alt="image"></li>
					<li><img src="resources/img/Dummy/Aion.jpg" alt="image"></li>
					<li><img src="resources/img/Dummy/Aion.jpg" alt="image"></li>
					<li><img src="resources/img/Dummy/Aion.jpg" alt="image"></li>
				</ul>
				<div class="inner_gamename">
					<label class="gamename_1">게임 이름</label>
					<label class="gamename_2">게임 이름</label>
					<label class="gamename_3">게임 이름</label>
					<label class="gamename_4">게임 이름</label>
				</div>
			</div>
		</div>
		<a class="prev2" onclick="plusSlides(-1)">&#10094;</a>
		<a class="next2" onclick="plusSlides(1)" style="margin-right: 95px;">&#10095;</a>
	</div>
	<!-- <a href="mapEdit"> Go to Map Editor Page </a>
	<a href="playGame"> Go to Game Play Page </a> -->
<body>
	<article class="container">
		<div class="content">
		    <div class="col-md-12">
		        <div class="panel panel-default">
		            <div class="panel-heading">Panel heading without title</div>
		            <div class="panel-body">
		                Panel content
		            </div>
		        </div>
		    </div>
		</div>	
	</article>
	<a href="produceScene?gameid=2"> Go to Node Editor Page</a>
	/
	<a href="loadGame?gameid=2"> Go to Game Play Page</a>
	/
	<a href="mapEdit"> Go to Map Editor Page </a>
	/
	<a href="playGame"> Go to Game Play Page </a>

</body>    