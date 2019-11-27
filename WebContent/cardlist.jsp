<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
<script type='text/javascript' src='js/jquery-3.4.1.min.js'></script>
<link rel="stylesheet" type="text/css" href="css/ajuda-style.css">
<title>Cartas</title>
</head>
<body>
	<div id="fixed-background"></div>
	<jsp:include page="header.jsp" />
	
	<div id="background-veil" onclick="escondeCartona()">
	<div id="help-cartona"></div>		
	</div>	
	
	<div id="cards-container">
		<div id="cards-title">Lista de Cartas</div>
		
		<div id="cardlist-container"></div>
	</div>
	
	<script type="text/javascript" src="js/ajuda-scripts.js" charset="utf-8"></script>
</body>
</html>