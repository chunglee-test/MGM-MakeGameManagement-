<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
   <meta charset='utf-8'>
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../resources/bootstrap-3.3.2/css/bootstrap.min.css"
	rel="stylesheet">
<style>
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
</style>
<script src="${pageContext.request.contextPath}/resources/js/jquery-3.2.1.min.js"></script>
   <link rel="stylesheet" href="../resources/cssmenu/styles.css">
   
	<script type="text/javascript">
		$(document).ready(function() {
			var ar = ['1','2', '3', '4', '5', '6', '7', '8', '9'];
	
			var str = '';
			$.each(ar, function(index,item){
	
			str += '<a href = "readFood?cscode='+item+'"><img class="img" src="../resources/food/f'+item+'.jpg" width=400px height =400px onclick="goimagef'+item+'()"></a>';
			});
			$('#div').html(str);

		});
</script>

<title>Cuisine Board</title>
</head>
<body>
<%@ include file="../board/common2.jsp" %>

	
	<h3 align="center">Entrée</h3>

	<div id="div" align="center">
	<!--<img id = "image" src="../resources/food/f1.jpg">  -->
	</div>


      <footer>
        <p class="pull-right"><a href="#">▲TOP</a></p>
        <p>&copy; 2018 SR & The Cook, Inc. &middot;</p>
      </footer>
</body>
</html>