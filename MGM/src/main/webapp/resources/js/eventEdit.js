$(document).ready(function(){
	let childList = childrenList;
	
    console.log(eventPosX);
    console.log(eventPosY);
    console.log(childList);

    // 맵 이동 가능한 선택지 동적으로 생성
    let mapOptions = "";
    for (let i = 0; i < childList.length; i++) {
        mapOptions += "<option value='" + childList[i].nodeid + "'>" + childList[i].nodename + "</option>";
    }
    $('#options_map').html(mapOptions);
    $('#nextScene1').html(mapOptions);
    $('#nextScene2').html(mapOptions);

    // 캐릭터 초기 위치 셋팅 완료 버튼 클릭시    
    $('#btn_submit_char').on('click', function() {
        let charType = $('#select_char option:selected').val();
        let event = {
            type: 'posCharacter',
            x : eventPosX,
            y : eventPosY,
            charType: charType
        };

        getReturnValue(event);
        closeEventPopup();
    });

    // 맵 이동 완료 버튼 클릭시
    $('#btn_submit_map').on('click', function() {
        let nextScene = $('#options_map option:selected').val();
        let event = {
            type: 'changeMap',
            x : eventPosX,
            y : eventPosY,
            nextScene: nextScene
        };
            
        getReturnValue(event);
        closeEventPopup();
    });
    
    // 대화 중 설명문 입력 완료 버튼 클릭시
    $('#btn_submit_explain').on('click', function() {
        let explain = $('#txt_explanation').val();
        let event = {
            type: 'playScript',
            x : eventPosX,
            y : eventPosY,
            scripttype: 'explanation',
            text: explain
        };
        event.script = new Object();
        event.script.text = explanation;
        
        getReturnValue(event);
        closeEventPopup();
    });
    
    // 기본 대화 추가하기 버튼 클릭시
    var basicScripts = new Array();
    $('#btn_basictalk_cont').on('click', function() {
        let charName = $('#select_talker').val();
        let text = $('#txt_basictalk').val();
        
        let script = {
                charname : charName,
                text : text
        };
        
        basicScripts.push(script);
        
        $('#txt_basictalk').val('');
        
        let row = "<tr>";
        row += "<th>" + charName + "</th>";
        row += "<td>" + text + "</td>";
        row += "<tr>";
        $('#table_basictalk').append(row);
    });

    // 대화 중 기본 대화 입력 완료 버튼 클릭시
    $('#btn_submit_basictalk').on('click', function() {
        let event = {
            type: 'playScript',
            x : eventPosX,
            y : eventPosY,
            scripttype: 'talk',
            script : basicScripts
        };
        getReturnValue(event);
        closeEventPopup();
    });

    // 분기 대화 추가하기 버튼 클릭시
    var selectScripts = new Array();
    $('#btn_seltalk_cont').on('click', function() {
        let charName = $('#select_talker2').val();
        let text = $('#txt_selecttalk').val();
        
        let script = {
                charname : charName,
                text : text
        };
        
        selectScripts.push(script);
        
        $('#txt_selecttalk').val('');
        
        let row = "<tr>";
        row += "<th>" + charName + "</th>";
        row += "<td>" + text + "</td>";
        row += "<tr>";
        $('#table_selecttalk').append(row);
    });

    // 대화 중 분기 대화 입력 완료 버튼 클릭시
    $('#btn_submit_selecttalk').on('click', function() {
        let event = {
            type: 'playScript',
            x : eventPosX,
            y : eventPosY,
            scripttype: 'if',
            script : selectScripts
        };
        getReturnValue(event);
        closeEventPopup();
    });

    // 분기 대화에서 선택지 추가 완료 버튼 클릭시
    $('#btn_add_if').on('click', function() {
    	let selection1 = {
    			text : $('#txt_if1').val(),
    			nextScene : $('#nextScene1').val()
    	};
    	
    	let selection2 = {
    			text : $('#txt_if2').val(),
    			nextScene : $('#nextScene2').val()
    	};
    	
    	selectScripts.push(selection1);
    	selectScripts.push(selection2);
    	
    	let row = "<tr>";
    	row += "<td>" + "\t1. " + selection1.text;
    	row += "/ 2. "+ selection2.text + "</td>";
    	row += "<tr>";
    	$('#table_scripts').append(row);
    });
    
})

/* 이미지 불러오기 */
function previewImg(value) {
	var preview = document.querySelector('#img');
	preview.src = value;
}

