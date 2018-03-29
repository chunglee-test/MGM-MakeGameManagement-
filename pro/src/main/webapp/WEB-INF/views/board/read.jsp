<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE HTML>
<html>
<head>
<title>게시판 글읽기</title>

<link rel="stylesheet" type="text/css" href="../resources/css/default.css" />
	<link rel="stylesheet" href="../resources/cssmenu/styles.css">
<style type="text/css">
body{
	font-family:Arial, Helvetica, sans-serif;
	margin:0 auto;
}
a:link {
	color: #666;
	font-weight: bold;
	text-decoration:none;
}
a:visited {
	color: #666;
	font-weight:bold;
	text-decoration:none;
}
a:active,
a:hover {
	color: #bd5a35;
	text-decoration:underline;
}


table a:link {
	color: #666;
	font-weight: bold;
	text-decoration:none;
}
table a:visited {
	color: #999999;
	font-weight:bold;
	text-decoration:none;
}
table a:active,
table a:hover {
	color: #bd5a35;
	text-decoration:underline;
}
table {
	font-family:Arial, Helvetica, sans-serif;
	color:#666;
	font-size:12px;
	text-shadow: 1px 1px 0px #fff;
	background:#eaebec;
	margin:20px;
	border:#ccc 1px solid;

	-moz-border-radius:3px;
	-webkit-border-radius:3px;
	border-radius:3px;

	-moz-box-shadow: 0 1px 2px #d1d1d1;
	-webkit-box-shadow: 0 1px 2px #d1d1d1;
	box-shadow: 0 1px 2px #d1d1d1;
}
table th {
	padding:15px;
	border-top:1px solid #fafafa;
	border-bottom:1px solid #e0e0e0;

	background: #ededed;
	background: -webkit-gradient(linear, left top, left bottom, from(#ededed), to(#ebebeb));
	background: -moz-linear-gradient(top,  #ededed,  #ebebeb);
}
table th:first-child{
	text-align: left;
	padding-left:20px;
}
table tr:first-child th:first-child{
	-moz-border-radius-topleft:3px;
	-webkit-border-top-left-radius:3px;
	border-top-left-radius:3px;
}
table tr:first-child th:last-child{
	-moz-border-radius-topright:3px;
	-webkit-border-top-right-radius:3px;
	border-top-right-radius:3px;
}
table tr{
	text-align: center;
	padding-left:20px;
}
table tr td:first-child{
	text-align: left;
	padding-left:20px;
	border-left: 0;
}
table tr td {
	padding:12px;
	border-top: 1px solid #ffffff;
	border-bottom:1px solid #e0e0e0;
	border-left: 1px solid #e0e0e0;
	
	background: #fafafa;
	background: -webkit-gradient(linear, left top, left bottom, from(#fbfbfb), to(#fafafa));
	background: -moz-linear-gradient(top,  #fbfbfb,  #fafafa);
}
table tr.even td{
	background: #f6f6f6;
	background: -webkit-gradient(linear, left top, left bottom, from(#f8f8f8), to(#f6f6f6));
	background: -moz-linear-gradient(top,  #f8f8f8,  #f6f6f6);
}
table tr:last-child td{
	border-bottom:0;
}
table tr:last-child td:first-child{
	-moz-border-radius-bottomleft:3px;
	-webkit-border-bottom-left-radius:3px;
	border-bottom-left-radius:3px;
}
table tr:last-child td:last-child{
	-moz-border-radius-bottomright:3px;
	-webkit-border-bottom-right-radius:3px;
	border-bottom-right-radius:3px;
}
table tr:hover td{
	background: #f2f2f2;
	background: -webkit-gradient(linear, left top, left bottom, from(#f2f2f2), to(#f0f0f0));
	background: -moz-linear-gradient(top,  #f2f2f2,  #f0f0f0);	
}

</style>
<script type="text/javascript">
//글삭제시 확인 스크립트
function deleteCheck(boardnum){
	if(confirm("정말 삭제하시겠습니까?")){
		location.href = 'delete?boardnum=' + boardnum;
	}
}
function replyFormCheck() {
	var retext = document.getElementById('retext');
	if (retext.value.length < 5) {
		alert('리플 내용을 입력하세요.');
		retext.focus();
		retext.select();
		return false;
	}
	return true;			
}

//리플 수정
function replyEditForm(replynum, boardnum, retext) {
	//해당 리플번호를 붙여 생성한 <div>태그에 접근
	var div = document.getElementById("div"+replynum);
	
	var str = '<form name="editForm' + replynum + '" action="replyEdit" method="post">';
	str += '<input type="hidden" name="replynum" value="'+replynum+'">';
	str += '<input type="hidden" name="boardnum" value="'+boardnum+'">';
	str += '&nbsp;';
	str += '<input type="text" name="text" value="' + retext + '" style="width:530px;">';
	str += '&nbsp;';
	str += '<a href="javascript:replyEdit(document.editForm' + replynum + ')">[저장]</a>';
	str += '&nbsp;';
	str += '<a href="javascript:replyEditCancle(document.getElementById(\'div' + replynum + '\'))">[취소]</a>';
	str += '</form>';
	div.innerHTML = str;
}

//리플 수정 취소
function replyEditCancle(div) {
	div.innerHTML = '';
}

//리플 수정 정보 저장
function replyEdit(form) {
	if (confirm('수정된 내용을 저장하시겠습니까?')) {
		form.submit();
	}
}

//리플 삭제
function replyDelete(replynum, boardnum) {
	if (confirm('리플을 삭제하시겠습니까?')) {
		location.href='replyDelete?replynum=' + replynum + '&boardnum=' + boardnum;
	}
}

</script>
	
</head>
<body>
<%@ include file="../board/common2.jsp" %>
<div class="centerdiv">

<h2 align="center">[ 게시판 글읽기 ]</h2>
<div align="center">
<table>
<tr>
<th style="width:100px;">작성자 </th>
<td style="width:600px;">${board.id}</td>
</tr>
<tr>
<th>작성일 </th>
<td>${board.inputdate }</td>
</tr>
<tr>
<th>조회수 </th>
<td>${board.hits}</td>
</tr>
<tr>
<th>제목 </th>
<td>${board.title}</td>
</tr>
<tr>
<th>내용 </th> 
<td><pre>${board.content}</pre></td>
</tr>
<tr>
<th>파일첨부 </th> 
<td>
<!-- 첨부된 파일이 있는 경우, 해당 파일을 다운로드 할 수 있는 링크 제공 -->
<c:if test="${board.originalfile != null}">
	<a href="download?boardnum=${board.boardnum}">
		${board.originalfile}
	</a>
</c:if>
</td>
</tr>
</table>

<div id="navigator">
<!-- 본인 글인 경우에만 보이기 -->
<c:if test="${loginId == board.id}">
	<!-- 현재글 삭제하기-->
	<a href="javascript:deleteCheck(${board.boardnum})">삭제</a>
	<!-- 현재글 수정하기-->
	<a href="edit?boardnum=${board.boardnum}">수정</a>
</c:if>

<!-- 목록보기-->
<a href="list">목록보기</a>
</div>
<br>

<!-- 리플 작성 폼 시작 -->
<form id="replyform" action="replyWrite" method="post" onSubmit="return replyFormCheck();">
리플내용
	<input type="hidden" name="boardnum" value="${board.boardnum}" />
	<input type="text" name="text" id="retext" style="width:500px;" />
	<input type="submit" value="확인" />
</form>
<!-- /리플 작성 폼 끝 -->
<br>

<!-- 리플 목록 출력 시작 -->
<table class="reply">
<c:forEach var="reply" items="${replylist}">
	<tr>
		<td class="replyid">
			<b>${reply.id}</b>
		</td>
		<td class="replytext">
			${reply.text}
		</td>
		<td class="replybutton">
			<c:if test="${loginId == reply.id}">
				[<a href="javascript:replyEditForm(${reply.replynum}, ${reply.boardnum}, '${reply.text}')">수정</a>]
			</c:if>
		</td>
		<td class="replybutton">
			<c:if test="${loginId == reply.id}">
				[<a href="javascript:replyDelete(${reply.replynum}, ${reply.boardnum })">삭제</a>]
			</c:if>
		</td>
	</tr>	
	<tr>
		<!-- 리플 수정 폼이 나타날 위치 -->
		<td class="white" colspan="4"><div id="div${reply.replynum}"></div></td>
	</tr>
		 
</c:forEach>
</table>
</div>
<br><br><br>
</div>
</body>
</html>
