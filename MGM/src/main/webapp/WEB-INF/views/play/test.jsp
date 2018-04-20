<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html>
	<%
		// Create an ArrayList with test data
		ArrayList<Object> historyList = new ArrayList<>();
		
		Map<String, Object> history1 = new HashMap<>();
		history1.put("year", 2014);
		history1.put("activity", "The 1st activity in 2014");
		historyList.add(history1);
		
		Map<String, Object> history2 = new HashMap<>();
		history2.put("year", 2014);
		history2.put("activity", "The 2nd activity in 2014");
		historyList.add(history2);
		
		Map<String, Object> history3 = new HashMap<>();
		history3.put("year", 2017);
		history3.put("activity", "The 1st activity in 2017");
		historyList.add(history3);
		
		Map<String, Object> history4 = new HashMap<>();
		history4.put("year", 2018);
		history4.put("activity", "The 1st activity in 2018");
		historyList.add(history4);
		
		Map<String, Object> history5 = new HashMap<>();
		history5.put("year", 2018);
		history5.put("activity", "The 2nd activity in 2018");
		historyList.add(history5);
		
		pageContext.setAttribute("histories", historyList);
	%>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
	</head>
	
	<body>
		<table>
			<tr>
				<th>Year</th>
				<th>History</th>
			</tr>
			
			<c:forEach items="${histories}" var="history" varStatus="loopStat">
				<c:set var="prevYear" value="${histories[loopStat.index-1].year}"/>
				<c:set var="nextYear" value="${histories[loopStat.index].year}"/>

				<tr>
					<td>
						<c:if test="${prevYear != nextYear}">
							<c:out value="${histories[loopStat.index].year}" />
						</c:if>
					</td>
					<td><c:out value="${histories[loopStat.index].activity}" /><td>
				</tr>
			</c:forEach>
	    </table>
	</body>
</html>