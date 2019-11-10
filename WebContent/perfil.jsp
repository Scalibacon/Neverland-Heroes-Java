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
	
	<div id="background-veil" onclick="fechaTelaIcones()">		
	</div>
	<div id="container-icons">
		<img src="img/x.png" id="close-icons" onclick="fechaTelaIcones()">
	</div>
	
	<div id="perfil-container">
		<div id="perfil-info-container">
			<div id="perfil-icone">
				<div id="change-icon-background"><div id="change-icon-btn" onclick="abreTelaIcones()">Trocar</div></div>
			</div>
			<span class="perfil-info-text" id="perfil-usuario">???</span>
			<div id="perfil-level-bar">
				<span id="perfil-level-text">lvl ???</span>
				<div id="perfil-xp-bar"></div>
			</div>
			<span class="perfil-info-text" id="perfil-info-grana">$???</span>
			
			<div id="perfil-partidas-container">
				<div class="partidas-texto" id="partida-total">Partidas: ???</div>
				<div class="partidas-texto" id="partida-vitoria">Vitórias: ???</div>
				<div class="partidas-texto" id="partida-derrota">Derrotas: ???</div>
			</div>
			
			<div id="perfil-rank-container">
				<img class="perfil-rank">
			</div>
		</div>
		
		<div id="perfil-line"></div>
		
		<div id="conquistas-box">
			<div id="conquistas-container-titulo">Conquistas</div>
			
			<div id="conquista-container">
				<!-- preenchida por js -->				
			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="js/perfil-scripts.js" charset="utf-8"></script>
</body>
</html>