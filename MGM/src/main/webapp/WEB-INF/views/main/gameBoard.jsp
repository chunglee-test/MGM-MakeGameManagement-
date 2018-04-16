<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Insert title here</title>
</head>
<body>
	제목 : ${game.gamename}
	<br>
	제작자 : ${game.nick}
	<br>
	<img class="card-img img-thumbnail" src="./resources/img/game/${game.gameprofile }">
	<br>
	게임 설명 : ${game.gamecontent}
	<br>
	공개일 : ${game.opendate}
	
	<br><br>
	댓글
	<br>
	
	<table>
		<tr>
			<td colspan="2">
				<input type="text" id="addComment">
			</td>
			<td>
				<select id="addPoint">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10<option>
				</select>
			</td>
			<td>
				<Button type="button">입력</Button>
			</td>
		</tr>
		${cList }
		<c:forEach items="${cList}" var="comment">
			<tr>
				<td>
					${comment.nick}
				</td>
				<td>
					${comment.gcomment}
				</td>
				<td>
					${comment.point}
				</td>
				<td>
					${comment.writedate}
				</td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>