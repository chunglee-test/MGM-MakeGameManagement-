<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>MGM - Event Editor</title>
		
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
	</head>
	<body>
		<div id="selection">
			이벤트 타입 선택
			<a href="scriptEdit">대사 추가</a>
			<button onClick="">대사 추가</button>
		</div>
		
		<div id="script">
			<table>
				<tr>
					<td>
						대화 1
					</td>
				</tr>
				
				<tr>
					<td>
						대화 2
					</td>
				</tr>
			</table>		
		</div>
		
		<script type="module" src="resources/js/eventEdit.js"></script>
	</body>
</html>