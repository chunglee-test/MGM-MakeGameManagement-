<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../resources/cssmenu/styles.css">
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
.featurette-divider {
  margin: 80px 0; /* Space out the Bootstrap <hr> more */
}
     body {
  padding-bottom: 40px;
  color: #5a5a5a;
	}
</style>
   <script src="${pageContext.request.contextPath}/resources/js/jquery-3.2.1.min.js"></script>
<title>Insert title here</title>
<script type="text/javascript">
function gocheckorder(page) {
	//location.href="goboardlist?page=" + page;
	var form = document.createElement("form");
	form.action="checkorder";
	form.method = "post";
	
	var hiddenpage = document.createElement("input");
	hiddenpage.name ="page";
	hiddenpage.value = page;
	hiddenpage.type = "hidden";
	
	form.appendChild(hiddenpage);
	document.body.appendChild(form);
	form.submit();
}
</script>
</head>
<body>
	<%@ include file="../board/common2.jsp" %>
<div align="center">
<form action="gotomypage">
<table>
	<tr>
		<th>orderNum</th>
		<th>planType</th>
		<th>ID</th>
		<th>OrderDate</th>
		<th>Delivery</th>
	</tr>
	<c:forEach items="${olist }" var="o">
	<tr>
		<c:if test="${loginId == o.odId }">
		<td>${o.orderNum }</td>
		<td>${o.ordertype }</td>
		<td>${o.odId }</td>
		<td>${o.indate }</td>
		<td>${o.deliveredDate }</td>
		</c:if>
	</tr>

	</c:forEach>
<tr>
				<td colspan="1">
					<input type="button" value="prev" onclick="gocheckorder('${startPage-1}')">
				</td>
				<td colspan="3">
					<c:forEach begin="1" end="${boardcount }" step="10" varStatus="s">
						<c:if test="${startPage == s.count }">
						<a href="#" onclick="gocheckorder('${s.count}')"><b>[${s.count }]</b></a>
						</c:if>
						<c:if test="${startPage != s.count }">
							<a href="#" onclick = "gocheckorder('${s.count}')">${s.count } </a>
						</c:if>
					</c:forEach>
				</td>
				<td colspan="1">
					<input type="button" value="next" onclick="gocheckorder('${startPage+1}')">
				</td>
			</tr>	
</table>
<input type="button" value="back" onclick="location='../'">
<input type="submit" value="submit">

</form>


</div>

</body>
</html>