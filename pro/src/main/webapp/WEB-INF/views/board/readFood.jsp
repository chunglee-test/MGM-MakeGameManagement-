<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
   <link rel="stylesheet" href="../resources/cssmenu/styles.css">

<script src="${pageContext.request.contextPath}/resources/js/jquery-3.2.1.min.js"></script>
<style type="text/css">
   @import url(//fonts.googleapis.com/css?family=Ubuntu);
*{
	font-family: 'Ubuntu';
}
 
.img {
	position:relative;
	float: center; padding: 45px;
}
.featurette-divider {
  margin: 80px 0; /* Space out the Bootstrap <hr> more */
}
     body {
  padding-bottom: 40px;
  color: #5a5a5a;
	}
.lists {
	position:absolute;
	top: 300px;
  left: 200px;
  width: 500px;
  height: 300px;
}
     body {
  padding-bottom: 40px;
  color: #5a5a5a;
	}
h1 {
	position:absolute;
	top: 300px;
  left: 900px;
  width: 500px;
  height: 300px;
}

h3 {
	position:absolute;
	top: 700px;
  left: 200px;
  width: 1200px;
  height: 300px;
}
h4 {
	position:absolute;
	top: 900px;
  left: 200px;
  width: 1200px;
  height: 300px;
}
.listlist{
	position:absolute;
	top: 1200px;

}
.button {
	position:absolute;
	top: 500px;
	left: 830px;
	
}
h2{
	position:absolute;
	top: 400px;
	left: 950px;

}
.line{
	position:absolute;
	top: 650px;
	left: 180px;
}
.line2{
	position:absolute;
	top: 850px;
	left: 180px;
}
</style>
<script type="text/javascript">
$(document).ready(function() {
	

	var num=$('#num').val();
	var src='../resources/food/f'+num+'.jpg';
	
	$('.lists').attr('src', src);
	
	
});

</script>
</head>
<body>
<%@ include file="../board/common2.jsp" %>
	<input type="hidden" value="${cuisine.cscode }" id="num">
	
	<img class="lists" src="">
	<h1>${cuisine.csName }</h1>
	<h2>9.99/month</h2>
	<a href="orderform" value="${cuisine.cscode }"><img class="button" src="../resources/food/joinnow.png" width="400px"></a>
	
	<img class="line" src="../resources/food/line2.jpg" height="100px" width="500px">
	<h3>ingredient<br><br>${cuisine.ingredient}</h3>
	<img class="line2" src="../resources/food/line2.jpg" height="100px" width="500px">
	<h4>receipe <br><br>${cuisine.receipe }</h4>

	<p class="listlist" align="center"><a href="../">목록으로</a></p>
	


</body>
</html>