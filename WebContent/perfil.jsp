<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
<script type='text/javascript' src='js/jquery-3.4.1.min.js'></script>
<link rel="stylesheet" type="text/css" href="css/perfil-style.css">
<title>Seu Perfil</title>
</head>
<body>
	<jsp:include page="header.jsp" />
	
	<div id="perfil-container">
		<div id="perfil-info-container">
			<div id="perfil-icone"></div>
			<span class="perfil-info-text">Scalibacon</span>
			<div id="perfil-level-bar">
				<div id="perfil-xp-bar"></div>
			</div>
		</div>
	</div>
</body>
</html>