<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>게시판</title>

<link rel="stylesheet" type="text/css" href="../resources/css/default.css" />
   <link rel="stylesheet" href="../resources/cssmenu/styles.css">
<!-- 페이지 이동 스크립트  -->
<script>
function pagingFormSubmit(currentPage) {
	var form = document.getElementById('pagingForm');
	var page = document.getElementById('page');
	page.value = currentPage;
	form.submit();
}
</script>
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
.featurette-divider {
  margin: 80px 0; /* Space out the Bootstrap <hr> more */
}
     body {
  padding-bottom: 40px;
  color: #5a5a5a;
	}
</style>
</head>

<body>
<%@ include file="../board/common2.jsp" %>
<div class="centerdiv">
<h2 align="center">[ Board ]</h2>

<br>
<div align="center">
<table>
<tr>
	<td class="white">
		전체 : ${navi.totalRecordsCount}
	</td>
	<td class="white" colspan="3"></td>
	<td class="white">
		<input type="button" value="글쓰기" onClick="location.href='writeform';">
	</td>
	
</tr>
<tr>
	<th>번호</th>
	<th style="width:220px">제목</th>
	<th>작성자</th>
	<th>조회수</th>
	<th>등록일</th>
</tr>

<!-- 반복 시작 -->
<c:forEach var="board" items="${boardlist}">
<tr>
	<td class="center">${board.boardnum}</td>
	<td>
		<a href="read?boardnum=${board.boardnum}">${board.title}</a>
	</td>
	<td class="center">${board.id}</td>
	<td class="center">${board.hits}</td>
	<td>${board.inputdate}</td>
</tr>

</c:forEach>        
<!-- 반복 끝 -->
</table>
<br/><br/>

<div id="navigator">
<!-- 페이지 이동 부분 -->                      
	<a href="javascript:pagingFormSubmit(${navi.currentPage - navi.pagePerGroup})">◁◁ </a> &nbsp;&nbsp;
	<a href="javascript:pagingFormSubmit(${navi.currentPage - 1})">◀</a> &nbsp;&nbsp;

	<c:forEach var="counter" begin="${navi.startPageGroup}" end="${navi.endPageGroup}"> 
		<c:if test="${counter == navi.currentPage}"><b></c:if>
			<a href="javascript:pagingFormSubmit(${counter})">${counter}</a>&nbsp;
		<c:if test="${counter == navi.currentPage}"></b></c:if>
	</c:forEach>
	&nbsp;&nbsp;
	<a href="javascript:pagingFormSubmit(${navi.currentPage + 1})">▶</a> &nbsp;&nbsp;
	<a href="javascript:pagingFormSubmit(${navi.currentPage + navi.pagePerGroup})">▷▷</a>

<!-- /페이지 이동 끝 -->                      

<br><br>


<!-- 검색폼 -->
<form id="pagingForm" method="get" action="list">
	<input type="hidden" name="page" id="page" />
	제목 : <input type="text"  name="searchText" value="${searchText}" />
	<input type="button" onclick="pagingFormSubmit(1)" value="검색">
</form>
<!-- /검색폼 --> 
</div>
</div>
</div>
<br><br><br>

      <footer>
        <p class="pull-right"><a href="#">▲TOP</a></p>
        <p>&copy; 2018 SR & The Cook, Inc. &middot;</p>
      </footer>
</body>
</html>
