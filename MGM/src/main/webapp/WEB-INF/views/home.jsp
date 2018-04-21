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
			//$("#loginForm").css("display", "none");
			
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
		
		function logout(){
			location.href="logout";
		}
		
		function gotoPage(page){
			$("#mainFrame").attr("src", page);
		}
	</script> 
</head>
<body>	
	<!-- NavBar -->
	<%-- <%@ include file="main/mainNavbar.jsp"%> --%>
	
	<!-- SideBar -->
	<%@ include file="main/mainSidebar.jsp"%>
	<%-- <%@ include file="main/main.jsp" %> --%>
	<iframe src="main" class="mainframe" id="mainFrame">
		현재 브라우저는 이 사이트 형식을 지원하지 않습니다.
	</iframe>
</body>
</html>