$(document).ready(function(){
	
	let eventX = opener.eventPosX;
	let eventY = opener.eventPosY;	
	let childList = opener.childList;
	
	$('#div_event_ctx').hide();
	$('#div_map_change').hide();
	
	/* 캐릭터 초기 위치 추가 */
    $('#btn_set_char').on('click', function(){
    	let event = {
    		type: 'posCharacter',
    		x : eventX,
    		y : eventY
    	};
    	opener.getReturnValue(event);
    	window.close();
    });
    
    /* 맵 이동 이벤트 추가 */
    $('#btn_change_map').on('click', function(){
    	
    	// 멥 리스트를 보여주기 위한 배열을 생성함.
    	$("#div_map_change").show();
    	
    	let mapOptions = "";
    	for (let i = 0; i < childList.length; i++) {
    		mapOptions += "<option value='" + childList[i].nodeid + "'>" + childList[i].nodename + "</option>";
    	}
    	$('#ch_map').html(mapOptions);
    	
    	$('#btn_map_select').on('click', function(){

    		let nextScene = $('#ch_map option:selected').val();
            alert("val: " + nextScene);
    		let event = {
	    		type: 'changeMap',
	    		x : eventX,
	    		y : eventY,
	    		nextScene: nextScene
	    	};
    		
        	opener.getReturnValue(event);
        	window.close();
    	});
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
    			let mapOptions = "";
    	    	for (let i = 0; i < childList.length; i++) {
    	    		mapOptions += "<option value='" + childList[i].nodeid + "'>" + childList[i].nodename + "</option>";
    	    	}
    	    	$('#nextScene1').html(mapOptions);
    	    	$('#nextScene2').html(mapOptions);
    	    	
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

