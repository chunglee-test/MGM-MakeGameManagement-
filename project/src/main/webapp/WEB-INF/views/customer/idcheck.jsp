<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="org.test.ajax.vo.CHcustomer" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
function formCheck() {
	if (document.getElementById('searchId').value.length < 3) {
		alert('검색할 ID를 3자 이상 입력하세요.');
		return false;
	}
	return true;
}
function idSelect(id) {
	opener.document.getElementById('id').value = id;
	this.close();
}
</script>
</head>
<body>
<form action="idcheck" method="post" onsubmit="return formCheck();">
	<input type="text" name="searchId" id="searchId" value="${searchId}" placeholder="검색할 ID 입력">
	<input type="submit" value="검색">
</form>

<c:if test="${selectCustomer}">
	<!-- 검색된 결과가 없는 경우 -->
	<c:if test="${searchResult == null}">
		<p>${searchId} : 사용할 수 있는 ID입니다.</p>
		<p><input type="button" value="ID사용하기" onclick="idSelect('${searchId}')"></p>
	</c:if>
	<!-- 검색된 결과가 있는 경우 -->
	<c:if test="${searchResult != null}">
		<p>${searchId} : 이미 사용중인 ID입니다.</p>
	</c:if>
</c:if>

</body>
</html>