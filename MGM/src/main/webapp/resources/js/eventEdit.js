$(function(){
	$('#div_event_ctx').hide();
	
	console.log(eventX + ", " + eventY);
	
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
    	opener.getReturnValue(event);
    	window.close();
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
    	} else if (selected === '분기점') {
    		$('#div_explanation, #div_talk').hide();
    		$('#div_if, #div_script').show();
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
    
    /* 돌아가기 버튼 */
    $('#btn_return').click(function() {
    	$("#div_event_ctx").hide();
    	$("#btn_set_char, #btn_change_map, #btn_add_script").show();
    });
    
    
})

