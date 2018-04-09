<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="wrapper">
	<aside class="side-bar">
		<ul>
			<li class="menu-head">
				<a href="#" class="push-menu"><span class="glyphicon glyphicon-align-justify pull-right"></span></a>
				Logo
			</li>
			<li class="menu-head">
				<c:choose>
					<c:when test="${userid == null }">
						<c:set var="profile" value="not_profile.jpg" />
						

						<button onclick="document.getElementById('login-container').style.display='block'"
							style="width: auto;">Login</button>
						<%@ include file="loginPage.jsp" %>
					</c:when>
					<c:when test="${userid != null}">
						<c:set var="profile" value="not_profile.jpg" />						
					</c:when>
				</c:choose>
				
				<%-- <img id="profile-img" class="profile-img" src="./img/${profile}"> --%>
				

			</li>
			<div class="menu">
				<li>
					<a href="#">
						Dashboard 
						<span class="glyphicon glyphicon-dashboard pull-right"></span>
					</a>
				</li>
				<li>
					<a href="#" class="active">
						Love snippet
						<span class="glyphicon glyphicon-heart pull-right"></span>
					</a>
				</li>
				<li>
					<a href="#">
						Like it? 
						<span class="glyphicon glyphicon-star pull-right"></span>
					</a>
				</li>
				<li>
					<a href="#">
						Settings 
						<span class="glyphicon glyphicon-cog pull-right"></span>
					</a>
				</li>
			</div>                    
		</ul>
	</aside>
</div>