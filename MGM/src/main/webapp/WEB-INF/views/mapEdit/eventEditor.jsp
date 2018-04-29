<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="./resources/css/eventEditor.css">
<style type="text/css">
	@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
	* {
		font-family: 'Nanum Gothic', sans-serif;
	}
   
	body{
		background-color: #333333;
	}
	#btn_set_char {
		background-color: darkgray !important;
	}
	#div_event_ctx, #div_character{
		margin: 20px;
	}
	#table_scripts{
		font: white;
	}
</style>
		
<div id="eventpopup" class="modal">
	<div class="modal-content animate container">	
		<span onclick="closeEventPopup()" class="close" title="Close Modal">
			&times;
		</span>
		<ul class="nav nav-tabs">
			<li class="active"><a href="#div_character" data-toggle="tab">
				<span class="glyphicon glyphicon-picture"></span>  캐릭터/맵  </a></li>
   			<li><a href="#div_event_ctx" data-toggle="tab">
   			 	<span class="glyphicon glyphicon-comment"></span>  대화  </a></li>
		</ul>
		
		<div class="tab-content">
		    <div id="div_character" class="tab-pane fade in active">
		    	<img id="img" name="img" height="100" width="100" />
				<select id="select_char" onchange="previewImg(value)">
					<option value="./resources/img/character/character1.png">NPC1</option>
					<option value="./resources/img/character/character2.png">NPC2</option>
				</select>
				<button id="btn_submit_char" class="btn">캐릭터 초기 위치 완료</button>
				
				<div id="div_map_change">
					<span>맵 선택</span>
					<select id="options_map"></select>
					<button id="btn_submit_map" class="btn">맵 이동 완료</button>
				</div>
		    </div>

		    <div id="div_event_ctx" class="tab-pane fade">
		      	<ul class="nav nav-tabs">
		        	<li class="active"><a data-toggle="tab" href="#div_explanation">설명</a></li>
		        	<li><a data-toggle="tab" href="#div_basictalk">기본대화</a></li>
		        	<li><a data-toggle="tab" href="#div_selecttalk">분기점</a></li>
		      	</ul>

		      	<div class="tab-content">
		      		<div id="div_explanation" class="tab-pane fade in active">
						<h3>설명 입력</h3>
						<textarea id="txt_explanation" rows="5"></textarea>
						<button id="btn_submit_explain" class="btn">입력 완료</button>
					</div>

					<div id="div_basictalk" class="tab-pane fade">
						<h3>기본 대화 입력</h3>
						<span>캐릭터 선택</span>
						<select id="select_talker">
							<option>NPC1</option>
							<option>NPC2</option>
							<option>NPC3</option>
						</select>
						
						<br>

						<textarea id="txt_basictalk" rows="5"></textarea><br>
						<button id="btn_basictalk_cont" class="btn">대화 추가</button>

						<h3>입력한 대본</h3>
						<table id="table_basictalk" class="table table-striped"></table>
						<br>
						<button id="btn_submit_basictalk" class="btn">입력 완료</button>
					</div>

					<div id="div_selecttalk" class="tab-pane fade">
						<h3>기본 대화 입력</h3>
						<span>캐릭터 선택</span>
						<select id="select_talker2">
							<option>NPC1</option>
							<option>NPC2</option>
							<option>NPC3</option>
						</select>
						
						<br>

						<textarea id="txt_selecttalk" rows="5"></textarea><br>
						<button id="btn_seltalk_cont" class="btn">대화 추가</button>

						<h3>선택지 추가</h3>
						<span>선택지1: </span>
						<input id="txt_if1" type="text"/>
						<span>맵 이동</span><select id="nextScene1"></select>
						<br>
						<span>선택지2: </span>
						<input id="txt_if2" type="text"/>
						<span>맵 이동</span><select id="nextScene2"></select>
						
						<button id="btn_add_if" class="btn">선택지 추가 완료</button>
						
						<h3>입력한 대본</h3>
						<table id="table_selecttalk" class="table table-striped"></table>
						<br>
						<button id="btn_submit_selecttalk" class="btn">입력 완료</button>
					</div>
					
					<!-- <div>
						<button id="btn_add" class="btn">모든 대화 추가 완료</button>
					</div> -->
		      	</div>
		    </div>
  		</div>

	</div> <!-- end of modal-content -->
</div> <!-- end of modal -->
