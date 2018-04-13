<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html >
<html lang=''>
<head>
<title>Welcome - chef hat</title>
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
#cssmenu li.join {float: right;}
#cssmenu li.login {float: right;}
#cssmenu li.logout {float: right;}
#cssmenu li.edit {float: right;}

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
<script>
function ( $ ) {
$( document ).ready(function() {
	$('#cssmenu').prepend('<div id="indicatorContainer"><div id="pIndicator"><div id="cIndicator"></div></div></div>');
	    var activeElement = $('#cssmenu>ul>li:first');

	    $('#cssmenu>ul>li').each(function() {
	        if ($(this).hasClass('active')) {
	            activeElement = $(this);
	        }
	    });


		var posLeft = activeElement.position().left;
		var elementWidth = activeElement.width();
		posLeft = posLeft + elementWidth/2 -6;
		if (activeElement.hasClass('has-sub')) {
			posLeft -= 6;
		}

		$('#cssmenu #pIndicator').css('left', posLeft);
		var element, leftPos, indicator = $('#cssmenu pIndicator');
		
		$("#cssmenu>ul>li").hover(function() {
	        element = $(this);
	        var w = element.width();
	        if ($(this).hasClass('has-sub'))
	        {
	        	leftPos = element.position().left + w/2 - 12;
	        }
	        else {
	        	leftPos = element.position().left + w/2 - 6;
	        }

	        $('#cssmenu #pIndicator').css('left', leftPos);
	    }
	    , function() {
	    	$('#cssmenu #pIndicator').css('left', posLeft);
	    });

		$('#cssmenu>ul').prepend('<li id="menu-button"><a>Menu</a></li>');
		$( "#menu-button" ).click(function(){
	    		if ($(this).parent().hasClass('open')) {
	    			$(this).parent().removeClass('open');
	    		}
	    		else {
	    			$(this).parent().addClass('open');
	    		}
	    	});
	});
} 
</script>
<script type="text/javascript">
function gohome() {
	location.href = "home"
}
function gologinform() {
	location.href = "customer/loginForm";
}
function gojoinform() {
	location.href = "customer/joinForm";
}
function gologoutform() {
	location.href = "customer/logout";
}
function goupdateform() {
	location.href = "customer/updateForm";
}
function goabout() {
	location.href = "board/about";
}
</script>

</head>
<body>

<div id='cssmenu'>
<ul>
   <li><a href='../'><span>Home</span></a></li>
   <li class='active has-sub'><a href='#'><span>Products</span></a>
      <ul>
         <li class='has-sub'><a href='../board/cuisineBoard'><span>Subscription</span></a>
         </li>
         <li class='has-sub'><a href='../board/list'><span>Board</span></a>
         </li>
      </ul>
   </li>
   <li><a href='../board/about'><span>About</span></a></li>
<c:if test="${loginId == null }">
   <li class="login"><a href='../customer/loginForm' ><span >login</span></a></li>
   <li class="join"><a href='../customer/joinForm'><span >join</span></a></li>
	</c:if>
	<c:if test="${loginId != null }">
   <li class='last'><a href='../board/orderform'><span>Order</span></a></li>
	<li class="logout"><a href='../customer/logout'><span >logout</span></a></li>
   <li class="edit"><a href='../customer/updateForm'><span >edit</span></a></li>
	</c:if>

</ul>
</div>
<p align="center"><img  src="../resources/img/logo.png"></p>


</body>
<html>
