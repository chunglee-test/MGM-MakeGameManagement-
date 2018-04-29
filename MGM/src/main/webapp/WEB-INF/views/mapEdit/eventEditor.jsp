<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>MGM - Event Editor</title>
	<style type="text/css">
        @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
        * {
            font-family: 'Nanum Gothic', sans-serif;
        }
    </style>
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
		<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
		<!-- 합쳐지고 최소화된 최신 CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">	
		<!-- 부가적인 테마 -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
	
		<style>
		body{
		background-color: darkGray;
		}
		#btn_set_char {
		background-color: darkgray !important;
		}
		#div_event_ctx{
		margin: 20px;
		}
		#table_scripts{
		font: white;
		}
		</style>
		
		
	</head>
	<body>
		<div id="div_btns" align="right">
			<button id="btn_set_char" class="btn btn-primary">캐릭터 초기위치</button>
			<button id="btn_change_map" class="btn btn-primary">맵 이동</button>
			<button id="btn_add_script" class="btn btn-primary">대화 추가</button>
			<button id="btn_return" class="btn btn-primary">돌아가기</button>
		</div>

		<div id="div_selection">
				<h3>대화 타입 선택</h3>
				<select id="select_script" >
					<option>설명</option>
					<option>대화</option>
					<option>분기점</option>
				</select>
			</div>
			
			<div id= "div_script_input">
				<h3>대화 입력</h3>
				<div id="div_explanation">
					<textarea id="txt_explanation" rows="5" cols="70"></textarea>
				</div>
				
				<div id="div_talk">
					<span>캐릭터 선택</span>
					<select id="select_talker">
						<option>NPC1</option>
						<option>NPC2</option>
						<option>NPC3</option>
					</select>
					<br>
					<textarea id="txt_talk" rows="10" cols="70"></textarea><br>
					<button id="btn_talk_continue" class="btn">대화 추가</button>
				</div>
				
				<div id="div_if">
					<h3>선택지 추가</h3>
					<span>선택지1: </span>
					<input id="txt_if1" type="text"/>
					<select id="nextScene1">
						<option>11</option>
						<option>22</option>
					</select>
					
					<br>
					
					<span>선택지2: </span>
					<input id="txt_if2" type="text"/>
					<select id="nextScene2">
						<option>99</option>
						<option>88</option>
					</select>
					<br><br>
					<button id="btn_add_if" class="btn">선택지 추가 완료</button>
				</div>
			</div>
			
			<div id="div_script" >
				<h3>입력한 대본</h3>
				<table id="table_scripts">
					
				</table><br>			
			</div>
			<button id="btn_add" class="btn">완료</button>
		</div>	
		
		<div id="div_map_change">
			<span>맵 선택</span>
			<select id="ch_map">
				
			</select>
			<button id="btn_map_select" class="btn">선택</button>
		</div>
		<script type="text/javascript" src="resources/js/eventEdit.js"></script>
	</body>
</html>