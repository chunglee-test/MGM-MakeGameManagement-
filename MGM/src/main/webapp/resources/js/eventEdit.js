import {getContextPath} from './util.js';


$(document).ready(function(){
	
	let eventX = opener.eventPosX;
	let eventY = opener.eventPosY;	
	$('#div_event_ctx').hide();
	$('#div_map_change').hide();
	
	/* 캐릭터 초기 위치 추가 */
    $('#btn_set_char').on('click', function(){
    	let event = {
    		type: 'posCharacter',
    		x : eventX,
    		y : eventY
    	};
    	//opener.getReturnValue(JSON.stringify(event));
    	opener.getReturnValue(event);
    	window.close();
    });
    
    /* 맵 이동 이벤트 추가 */
    $('#btn_change_map').on('click', function(){
    	let event = {
    		type: 'changeMap',
    		x : eventX,
    		y : eventY
    	};
    	
    	// 멥 리스트를 보여주기 위한 배열을 생성함.
    	$("#div_map_change").show();
    	
    	var maplist = new Array(); 
    	//maplist.push("resources/tilemaps/autoTilemapJSON2.json");
    	$.ajax({
    		url: "getMap",
    		type: "GET",
    	 success : function(data) {

             // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.

             // TODO

       },

       complete : function(data) {

             // 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.

             // TODO

       },

       error : function(xhr, status, error) {

             alert("에러발생");

       }


    	});
    	var mapoptions, i;
    	for(i=0; i<maplist.length;i++) {
    		mapoptions += "<option>" + maplist[i] + "</option>";
    	};
    	$('#ch_map').html(mapoptions);
    	$('#btn_map_select').on('click', function(){
    		console.log($('#ch_map').val());
    	});
    	opener.getReturnValue(event);
    	//  window.close();
    });
    
    /* 대화 추가 이벤트 추가 */
    $('#btn_add_script').on('click', function(){
    	// 모든 버튼 들이 사라지고 대화 이벤트 타입을 지정할 수 있도록 한다
    	$("#btn_set_char, #btn_change_map, #btn_add_script").hide();
    	$("#div_event_ctx").show();
    	$("#div_talk, #div_if, #div_script").hide();
    });
    
    /* 대화 타입 선택시 입력 폼 변환 */
    $('#select_script').on('change', function() {
    	let selected = $('#select_script').val();
    	
    	if (selected === '설명') {
    		$('#div_talk, #div_if, #div_script').hide();
    		$('#div_explanation').show();
    	} else if (selected === '대화') {
    		$('#div_explanation, #div_if').hide();
    		$('#div_talk, #div_script').show();
    		$('#btn_if_continue').remove();
    	} else if (selected === '분기점') {
    		$('#div_explanation').hide();
    		$('#div_talk, #div_script').show();
    		$('#div_talk').append('<button id="btn_if_continue">선택지 추가</button>');
    		
    		$('#btn_if_continue').on('click', function() {
    			$('#div_if').show();
    		});
    	}
    });
    
    /* 대화 이벤트 입력 완료 */
    $('#btn_add').on('click', function() {
    	let event = new Object();

    	let selected = $('#select_script').val();
    	if (selected === '설명') {
    		/* 설명 입력 완료 */
    		let explanation = $('#txt_explanation').val();
        	
        	event = {
        		type: 'playScript',
        		x : eventX,
        		y : eventY,
        		scripttype: 'explanation'
        	};
        	event.script = new Object();
        	event.script.text = explanation;
        	
    	} else if (selected === '대화') {
    		/* 대화 입력 완료 */
    		event = {
	    		type: 'playScript',
	    		x : eventX,
	    		y : eventY,
	    		scripttype: 'talk',
	    		script : scripts
	    	};
    		
    	} else if (selected === '분기점') {
    		/* 대화 입력 완료 */
    		event = {
	    		type: 'playScript',
	    		x : eventX,
	    		y : eventY,
	    		scripttype: 'if',
	    		script : scripts
	    	};
    	}
    	
    	opener.getReturnValue(event);
    	window.close();
    });
    
    /* 대화 계속 추가하기 */
    var scripts = new Array();
    $('#btn_talk_continue').on('click', function() {
    	let charName = $('#select_talker').val();
    	let text = $('#txt_talk').val();
    	
    	let script = {
    			charname : charName,
    			text : text
    	};
    	
    	scripts.push(script);
    	
    	$('#txt_talk').val('');
    	
    	let row = "<tr>";
    	row += "<th>" + charName + "</th>";
    	row += "<td>" + text + "</td>";
    	row += "<tr>";
    	$('#table_scripts').append(row);
    });
    
    /* 선택지 추가하기 */
    $('#btn_add_if').on('click', function() {
    	let selection1 = {
    			text : $('#txt_if1').val(),
    			nextScene : $('#nextScene1').val()
    	};
    	
    	let selection2 = {
    			text : $('#txt_if2').val(),
    			nextScene : $('#nextScene2').val()
    	};
    	
    	scripts.push(selection1);
    	scripts.push(selection2);
    	
    	let row = "<tr>";
    	row += "<td>" + "\t1. " + selection1.text;
    	row += "/ 2. "+ selection2.text + "</td>";
    	row += "<tr>";
    	$('#table_scripts').append(row);
    });
    
    /* 돌아가기 버튼 */
    $('#btn_return').click(function() {
    	$("#div_event_ctx").hide();
    	$("#btn_set_char, #btn_change_map, #btn_add_script").show();
    });
    
    
})

