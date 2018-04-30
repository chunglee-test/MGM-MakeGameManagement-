<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!-- <img src="resources/img/user/guest.jpg" class="user-profile" style="width:100%;"> -->
<div class="profile_div">
	<span class="profile_span">${nick}</span>
</div>
<div class="profile_picture_div">
	<img src="resources/img/user/${userid}.jpg" onerror="javascript:this.src='./resources/img/user/NoProfile.png'"
		class="profile_picture_img">
</div>
<button type="button" class="logout-button btn btn-primary" onclick="logout();">Logout</button>