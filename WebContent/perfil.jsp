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
		<div id="container-icons">
			<img src="img/x.png" id="close-icons" onclick="fechaTelaIcones()">
		</div>
	</div>
	
	<div id="perfil-container">
		<div id="perfil-info-container">
			<div id="perfil-icone">
				<div id="change-icon-background"><div id="change-icon-btn" onclick="abreTelaIcones()">Trocar</div></div>
			</div>
			<span class="perfil-info-text">Scalibacon</span>
			<div id="perfil-level-bar">
				<span id="perfil-level-text">lvl 27</span>
				<div id="perfil-xp-bar"></div>
			</div>
			<span class="perfil-info-text" id="perfil-info-grana">$500</span>
			
			<div id="perfil-partidas-container">
				<div class="partidas-texto" id="partida-total">Partidas: 48</div>
				<div class="partidas-texto" id="partida-vitoria">Vitórias: 30</div>
				<div class="partidas-texto" id="partida-derrota">Derrotas: 18</div>
			</div>
			
			<div id="perfil-rank-container">
				<img src="img/rank.png" class="perfil-rank">
			</div>
		</div>
		
		<div id="perfil-line"></div>
		
		<div id="conquistas-box">
			<div id="conquistas-container-titulo">Conquistas</div>
			
			<div id="conquista-container">
				<div class="conquista" id="conquista1">
					<img src="img/conquista1.png" class="conquista-img">
					<div class="conquista-titulo">Toneladas de dano</div>
					<div class="conquista-texto">Cause 50 de dano em uma única partida</div>
				</div>
				
				<div class="conquista">
					<img src="img/conquista2.png" class="conquista-img">
					<div class="conquista-titulo">Precaução nunca é demais</div>
					<div class="conquista-texto">Cure 40 de HP de seus heróis em uma única partida</div>
				</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="js/perfil-scripts.js"></script>
</body>
</html>