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
			text-align:right;
		}
</style>
</head>
<body>
<!-- https://getbootstrap.com/docs/4.1/components/card/ -->
	<c:forEach items="${gList}" var="gList">
		<div class="col-md-3 col-sm-4 col-xs-6">
			<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
				<div class="card-header">${gList.gamename}</div>
				<div class="card-body">
					<p class="card-text">
						<img class="card-img img-thumbnail" src="./resources/img/game/${gList.gameprofile }">
					</p>
					<h5 class="card-title maker-name">gList.</h5>
				</div>
			</div>
		</div>
	</c:forEach>
</body>
</html>