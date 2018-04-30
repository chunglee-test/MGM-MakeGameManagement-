<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Make Game Manager</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="./resources/css/mainStyle.css">

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<!-- 부가적인 테마 -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<script type="text/javascript">
	var Gallery = (function() {
		var colors = [ "#34495E", "#2E4053",

		"#283747", "#212F3C", "#1B2631", "#2C3E50", "#273746" ];
		var scrollTimeId;
		var posLeft = 0;
		function Gallery(config) {
			this.list = $(config.list);
			this.items = this.list.find("li");
			this.itemWidth = this.items.outerWidth();
		}

		Gallery.prototype = {
			constructor : Gallery,

			init : function() {
				this.setGalleryWidth();
				this.setItemsColor();
				this.eventManager();

				return this;
			},

			eventManager : function() {
				var _this = this;

				$(document).on(
						"mousewheel DOMMouseScroll",
						function(event) {
							clearTimeout(scrollTimeId);
							scrollTimeId = setTimeout(onScrollEventHandler
									.bind(this, event, _this.itemWidth), 0);
						});

				$("#nav-left").on("click", function(event) {
					onClickEventHandler(event, "left", _this.itemWidth);
				});
				$("#nav-right").on("click", function(event) {
					onClickEventHandler(event, "right", _this.itemWidth);
				});
			},

			getRandomColor : function() {
				return colors[Math.floor(Math.random() * colors.length)];
			},

			setItemsColor : function() {
				var _this = this;

				$.each(this.items, function(index, item) {
					item.style.backgroundColor = _this.getRandomColor();
				});
			},

			setGalleryWidth : function() {
				this.list.css("width", this.getGalleryWidth());
			},

			getGalleryWidth : function() {
				var width = 0;

				this.items.each(function(index, item) {
					width += $(this).outerWidth();
				});

				return width;
			}
		};

		function onScrollEventHandler(event, width) {
			// Firefox, please, stop it
			if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
				if (event.originalEvent.detail > 0) {
					posLeft += width / 2;
					$("html").scrollLeft(posLeft);
				} else {
					posLeft -= width / 2;
					$("html").scrollLeft(posLeft);
				}
			} else {
				if (event.originalEvent.wheelDelta > 0) {
					this.body.scrollLeft -= width / 8;
				} else {
					this.body.scrollLeft += width / 8;
				}
			}
			event.preventDefault();
		}

		function onClickEventHandler(event, direction, width) {
			if (direction === "left") {
				document.body.scrollLeft -= width;
			} else {
				document.body.scrollLeft += width;
			}

			event.preventDefault();
		}

		return Gallery;
	})();

	$(document).ready(function() {
		window.lastX;
		var gallery = new Gallery({
			list : ".gallery"
		}).init();

	});

	var supportsTouch = "ontouchstart" in window
			|| window.navigator.msPointerEnabled;
	if (supportsTouch) {
		document.querySelector(".container").style.overflowX = "scroll";
		document.querySelector("#nav-right").style.display = "none";
		document.querySelector("#nav-left").style.display = "none";
	}
</script>
</head>
<body class="mainpage_body">
	<div class="container">
		<header><h2 style="color: white;">인기있는 게임</h2></header>
		<ul class="gallery">
			<li>
				<div class="flip">
					<div class="front-side"></div>
					<div class="back-side">
						<a href="#">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>LINA</h3>
									<p></p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</li>
			<li>
				<div class="flip">
					<div class="front-side"></div>
					<div class="back-side">
						<a href="#">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>CRYSTAL MAIDEN</h3>
									<p></p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</li>
			<li>
				<div class="flip">
					<div class="front-side"></div>
					<div class="back-side">
						<a href="#">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>DROW RANGER</h3>
									<p></p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</li>
			<li>
				<div class="flip">
					<div class="front-side"></div>
					<div class="back-side">
						<a href="#">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>WINDRANGER</h3>
									<p></p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</li>
		</ul>
		<header><h2 style="color: white;">최신등록 게임</h2></header>
		<ul class="gallery">
			<li>
				<div class="flip">
					<div class="front-side"></div>
					<div class="back-side">
						<a href="#">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>LINA</h3>
									<p></p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</li>
			<li>
				<div class="flip">
					<div class="front-side"></div>
					<div class="back-side">
						<a href="#">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>CRYSTAL MAIDEN</h3>
									<p></p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</li>
			<li>
				<div class="flip">
					<div class="front-side"></div>
					<div class="back-side">
						<a href="#">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>DROW RANGER</h3>
									<p></p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</li>
			<li>
				<div class="flip">
					<div class="front-side"></div>
					<div class="back-side">
						<a href="#">
							<div class="content">
								<div class="loader"></div>
								<div class="text">
									<h3>WINDRANGER</h3>
									<p></p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</li>
		</ul>
	</div>	
	<article class="container">
		<div class="content">
			<div class="col-md-12">
				<div class="panel panel-default">
					<div class="panel-heading">Panel heading without title</div>
					<div class="panel-body">Panel content</div>
				</div>
			</div>
		</div>
	</article>
	<a href="produceScene?gameid=2"> Go to Node Editor Page</a> /
	<a href="loadGame?gameid=2"> Go to Game Play Page</a> /
	<a href="mapEdit"> Go to Map Editor Page </a> /
	<a href="playGame"> Go to Game Play Page </a>

</body>