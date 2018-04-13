<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>REVIEW FOR OUR SERVICE</title>
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
<script>
//글쓰기폼 확인
function formCheck() {
	var title = document.getElementById('title');
	var content = document.getElementById('content');
	
	if (title.value.length < 5) {
		alert("Please enter more characters in title");
		title.focus();
		title.select();
		return false;
	}
	if (content.value.length < 5) {
		alert("Please enter more characters in content");
		title.focus();
		title.select();
		return false;
	}
	return true;
}
</script>	
</head>
<body>
<%@ include file="../board/common2.jsp" %>


<div class="centerdiv">
<h1 align="center">REVIEW</h1>
<!-- 바이너리 데이터 포함되는 폼. enctype 반드시 정확히 지정 -->
<form id="writeform" action="write" method="post" 
	enctype="multipart/form-data" onsubmit="return formCheck();">
	<div align="center">
<table>
<tr>
	<th>TITLE</th>
	<td>
		<input type="text" name="title" id="title" style="width:400px;">
	</td>
</tr>
<tr>
	<th>CONTENT</th> 
	<td>
		<textarea name="content" id="content" style="width:400px;height:200px;resize:none;"></textarea>
	</td>
</tr>
<tr>
	<th>ATTACHMENT</th> 
	<td>
		<input type="file" name="upload" size="30">
	</td>
</tr>
<tr>
	<td colspan="2" class="white center">
		<p align="center">Share your experiences with us! Being look forward to hearing your wonderful experience with us !<br><br>
		<input type="submit" value="submit" /></p>

	</td> 
	
</tr>
	</div>
</table>
</form>
</div>
</body>
</html>