<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <link rel="stylesheet" href="../resources/cssmenu/styles.css">
   <script src="${pageContext.request.contextPath}/resources/js/jquery-3.2.1.min.js"></script>
<title>Insert title here</title>
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
.plan1{
	position:absolute;
	top: 350px;
  left: 280px;

}
.one{
	position:absolute;
	top: 450px;
  	left: 250px;
  	width: 300px;
  	height: 250px;
}
.p1 {
	position:absolute;
	top: 400px;
  	left: 270px;

}
.plan2{
	position:absolute;
	top: 350px;
  left: 660px;

}
.two{
	position:absolute;
	top: 450px;
  	left: 630px;
  	width: 300px;
  	height: 250px;
}
.p2 {
	position:absolute;
	top: 400px;
  	left: 650px;

}
.plan3{
	position:absolute;
	top: 350px;
  left: 1010px;

}
.three{
	position:absolute;
	top: 450px;
  	left: 1000px;
  	width: 300px;
  	height: 250px;
}
.p3 {
	position:absolute;
	top: 400px;
  	left: 1020px;

}

</style>
<script type="text/javascript">

function goorder() {
	var num = $('#one').attr('num');

	location.href= "order?num="+num;
}
function goorder1() {
	var num = $('#two').attr('num');

	location.href= "order?num="+num;
}
function goorder2() {
	var num = $('#three').attr('num');

	location.href= "order?num="+num;
}
</script>
</head>
<body>
	<%@ include file="../board/common2.jsp" %>
	
<div id="oneplan" onclick="goorder()">
	<h1 class="plan1">FOR ONE PLAN</h1>
	<p class="p1">randomly we picked menus for you</p>
	<img class="one" id="one" num="1" src="../resources/food/cooking1.jpg">
</div>
<div id="twoperson" onclick="goorder1()">
	<h1 class="plan2">FOR TWO PLAN</h1>
	<p class="p2">randomly we picked menus for you</p>
	<img class="two" id="two" num="2" src="../resources/food/cooking2.jpg">
</div>
<div id="familyperson" onclick="goorder2()">
	<h1 class="plan3">FOR FAMILY PLAN</h1>
	<p class="p3">randomly we picked menus for you</p>
	<img class="three" id="three" num="3" src="../resources/food/cooking3.jpg">
</div>


<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

</body>
</html>