<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <link rel="stylesheet" href="../resources/cssmenu/styles.css">

<title>Insert title here</title>
<script src="${pageContext.request.contextPath}/resources/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript">

</script>
</head>
<body>
	<%@ include file="../board/common2.jsp" %>
<div align="center">
<form id="order" action="ordernow" method="post">
<table>
	<tr>
		<th>Id</th>
		<td><input type="text" readonly="readonly" name="odId" id="odId" placeholder="id" value="${loginId}" style="width:300px;" /></td>
	</tr>
	<tr>
		<th>Type</th>
		<td><input type="text" name="ordertype" id="ordertype" placeholder="type"  value="${num}" style="width:300px;" /></td>
	</tr>
</table>
<br>
<input type="submit" value="check" />
<a href="../"><input type="button" value="back"/></a>

</form>
</div>

</body>
</html>