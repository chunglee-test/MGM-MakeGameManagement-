<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<nav class="navbar navbar-inverse" style="margin: 0px; padding-bottom: 10px;">
	<div class="container-fluid">
		<div class="navbar-header" style="width: 300px;">
			<a class="navbar-brand" href="./">
				<img src="./resources/img/game/MGM_Logo.png">
			</a>
		</div>
		<div class="navbar-form navbar-left" style="width: 940px">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Search"
					name="search" style="width: 650px; height: 30px;" id="searchText">
			</div>
			<button type="button" class="btn btn-default" style="width: 100px; height:30px; margin-bottom: 4px" id="searchBtn">Search</button>
		</div>
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
	
	<div class="modal made-select" id="madeSelectDiv">
		<div class="modal-content animate made-select-content" id="madeSelectContent">
			<div class="made-select-container container" style="width:100%;height:30vh;">
				<div class="select-option" style="float:left;" id="viewMyList">
					<img src="./resources/img/game/myListView.png" class="new-game-icon-img">
					<div>리스트 확인</div>
				</div>
				<div class="select-option" style="float:right;" id="makeNewGame">
					<img src="./resources/img/game/myListPlus.png" class="new-game-icon-img">
					<div>새로 만들기</div>
				</div>
			</div>
		</div>
	</div>
</nav>