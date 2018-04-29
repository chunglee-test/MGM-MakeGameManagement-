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
	<div class="main_bottom_div2">
		<!--images from http://haryarti.deviantart.com/gallery/-->
		<div class="container">
			<div id="nav-left" class="arrow left"><</div>
			<div id="nav-right" class="arrow right">></div>
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
										<p>The sibling rivalries between Lina the Slayer, and her
											younger sister Rylai, the Crystal Maiden, were the stuff of
											legend in the temperate region where they spent their
											quarrelsome childhoods together. Lina always had the
											advantage, however, for while Crystal was guileless and
											naive, Lina's fiery ardor was tempered by cleverness and
											conniving. The exasperated parents of these incompatible
											offspring went through half a dozen homesteads.</p>
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
										<p>Born in a temperate realm, raised with her fiery older
											sister Lina, Rylai the Crystal Maiden soon found that her
											innate elemental affinity to ice created trouble for all
											those around her. Wellsprings and mountain rivers froze in
											moments if she stopped to rest nearby; ripening crops were
											bitten by frost, and fruiting orchards turned to mazes of ice
											and came crashing down, spoiled.</p>
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
										<p>Drow Ranger's given name is Traxex--a name well suited
											to the short, trollish, rather repulsive Drow people. But
											Traxex herself is not a Drow. Her parents were travelers in a
											caravan set upon by bandits, whose noisy slaughter of
											innocents roused the ire of the quiet Drow people. After the
											battle settled, the Drow discovered a small girl-child hiding
											in the ruined wagons, and agreed she could not be abandoned.</p>
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
										<p>The western forests guard their secrets well. One of
											these is Lyralei, master archer of the wood, and favored
											godchild of the wind. Known now as Windranger, Lyralei's
											family was killed in a storm on the night of her birth--their
											house blown down by the gale, contents scattered to the
											winds. Only the newborn survived among the debris field of
											death and destruction.</p>
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
										<h3>DEATH PROPHET</h3>
										<p>Krobelus was a Death Prophet--which is one way of
											saying she told fortunes for the wealthiest of those who
											wished to look beyond the veil. But after years of inquiring
											on behalf of others, she began to seek clues on her own fate.
											When death refused to yield its secrets, she tried to buy
											them with her life. But the ultimate price proved
											insufficient. Death disgorged her again and again, always
											holding back its deepest mysteries.</p>
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
										<h3>KATARINA</h3>
										<p>Driven by an intense killer instinct, Katarina uses her
											talents as an assassin for the glory of Noxus, and the
											continued elevation of her family. While her fervor drives
											her to ever-greater feats, it can sometimes lead her astray.</p>
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
										<h3>VENGEFUL SPIRIT</h3>
										<p>Even the most contented Skywrath is an ill-tempered
											creature, naturally inclined to seek revenge for the
											slightest insult. But Vengeful Spirit is the essence of
											vengeance. Once a proud and savage Skywrath scion,
											Shendelzare was first in succession for the Ghastly Eyrie
											until a sister's treachery robbed her of her birthright.</p>
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
										<h3>LINA</h3>
										<p>The sibling rivalries between Lina the Slayer, and her
											younger sister Rylai, the Crystal Maiden, were the stuff of
											legend in the temperate region where they spent their
											quarrelsome childhoods together. Lina always had the
											advantage, however, for while Crystal was guileless and
											naive, Lina's fiery ardor was tempered by cleverness and
											conniving.</p>
									</div>
								</div>
							</a>
						</div>
					</div>
				</li>
			</ul>
		</div>


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