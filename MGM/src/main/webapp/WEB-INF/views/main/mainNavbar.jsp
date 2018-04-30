<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<nav class="navbar navbar-inverse" style="margin: 0px; padding-bottom: 10px;">
	<div class="container-fluid">
		<div class="navbar-header" style="width: 300px;">
			<a class="navbar-brand" href="./">WebSiteName</a>
		</div>
		<form class="navbar-form navbar-left" action="/action_page.php" style="width: 940px">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Search"
					name="search" style="width: 650px; height: 30px;">
			</div>
			<button type="submit" class="btn btn-default" style="width: 100px; height:30px; margin-bottom: 4px">Submit</button>
		</form>
		<c:choose>
			<c:when test="${userid == null }">		
				<button onclick="loginPage();" class="btn btn-primary" style="width:5%; margin-left: 70px; margin-top: 35px">Login</button>
				<%@ include file="loginPage.jsp" %>
			</c:when>
			<c:when test="${userid != null}">		
				<%@ include file="userPage.jsp" %>
			</c:when>
		</c:choose>
	</div>
	<div class="nav_list_main">
		<div class="nav_list_list">
			<span class="nav_list_span" id="popular_list">Popular</span>
		</div>
		<div class="nav_list_list">
			<span class="nav_list_span" id="recently_list">Recently</span>
		</div>
		<div class="nav_list_list">
			<span class="nav_list_span" id="played_list">Played</span>
		</div>
		<div class="nav_list_list">
			<span class="nav_list_span" id="made_list">Made</span>
		</div>
	</div>
</nav>