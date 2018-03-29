<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang=''>
<head>
<title>Welcome - CHEF HAT</title>

   <meta charset='utf-8'>
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="resources/bootstrap-3.3.2/css/bootstrap.min.css"
	rel="stylesheet">
   <link rel="stylesheet" href="resources/cssmenu/styles.css">
   <script src="resources/js/jquery-3.2.1.min.js" ></script>
   <script src="script.js"></script>
   <title></title>
   <style type="text/css">
   @import url(//fonts.googleapis.com/css?family=Ubuntu);
*{
	font-family: 'Ubuntu';
}
 
 body {
  padding-bottom: 40px;
  color: #5a5a5a; 
	}
	.featurette-divider {
  margin: 80px 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  letter-spacing: -1px;
}
   
   @media (min-width: 992px) {
  .featurette-heading {
    margin-top: 120px;
  }
}

.top1 {
	text-align: right;
	color : #5a5a5a;
}

.title {
	text-align: center;
}
img {
	text-align: center;
}
   </style>
<script type="text/javascript">
function goboard() {
	location.href = "board/list";
}
function gocuisine() {
	location.href = "board/cuisineBoard";
}
function goorder() {
	location.href="board/orderform";
}
</script>

</head>
<body>

<%@ include file="common.jsp" %>

<hr class="featurette-divider">

      <div class="row featurette" onclick="gocuisine()">
        <div class="col-md-7">
          <h2 class="featurette-heading"> <span class="text-muted" style="font-size: 45px">See what you can do with our services </span></h2>
          <!-- <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p> -->
        </div>
        <div class="col-md-5">
          <img class="featurette-image img-responsive center-block" src="resources/food/food.jpg" alt="Generic placeholder image">
        </div>
      </div>

      <hr class="featurette-divider">

      <div class="row featurette" onclick="goorder()">
        <div class="col-md-7 col-md-push-5">
          <h2 class="featurette-heading" align="right"> <span class="text-muted" style="font-size: 45px">You can feel how fast our service is</span></h2>
        </div>
        <div class="col-md-5 col-md-pull-7">
          <img class="featurette-image img-responsive center-block" src="resources/food/ingredients.jpg" alt="Generic placeholder image">
        </div>
      </div>

      <hr class="featurette-divider">

      <div class="row featurette" onclick="goboard()">
        <div class="col-md-7">
          <h2 class="featurette-heading"> <span class="text-muted" style="font-size: 45px">Share your unbelievable experience with others</span></h2>
        </div>
        <div class="col-md-5">
          <img class="featurette-image img-responsive center-block" src="resources/img/share.png" alt="Generic placeholder image">
        </div>
      </div>

      <hr class="featurette-divider">

      <!-- /END THE FEATURETTES -->


      <!-- FOOTER -->
      <footer>
        <p class="pull-right"><a href="#">▲TOP</a></p>
        <p>&copy; 2018 SR & The Cook, Inc. &middot;</p>
      </footer>


</body>
</html>
