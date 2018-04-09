<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
			
	<script>
		$(document).ready(function(){
			$("#loginForm").css("visibility", "hidden");
			
		    $(".push-menu").click(function(){
		         $(".wrapper").toggleClass("active");
		    });
		    
		    $("#loginBtn").click(function(){
		        loginChk();
		    });
		});
		
		function loginPage(){
			$("#login-container").css("display", "block");
		}
	</script> 
</head>
<body>	
	<!-- NavBar -->
	<%-- <%@ include file="main/mainNavbar.jsp"%> --%>
	
	<!-- SideBar -->
	<%@ include file="main/mainSidebar.jsp"%>	
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
	<a href="mapEdit"> Go to Map Editor Page </a>
	<a href="playGame"> Go to Game Play Page </a>
</body>
</html>