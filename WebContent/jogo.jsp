<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
<script type='text/javascript' src='js/jquery-3.4.1.min.js'></script>
<link rel="stylesheet" type="text/css" href="css/jogo-style.css">
<title>Jogar</title>
</head>
<body>
	<div id="fixed-background"></div>
	<jsp:include page="header.jsp"/>
	
	<div id="game-container">
	</div>
	
	<div id="container-choose-game">
		<div id="choose-game-top">
			<div class="choose-game-option" id="option-offline" onclick="trocaOption('inside-option-offline')">Offline</div>
			<div class="choose-game-option" id="option-online" onclick="trocaOption('inside-option-online')">Online</div>
			<div id="option-underline"></div>
		</div>
		
		<div id="choose-game-container">
			<div class="inside-option" id="inside-option-online"></div>
			<div class="inside-option" id="inside-option-offline">
				<div class="offline-separator" id="separator1">
					<div id="separator1-title">Escolha seu oponente</div>
					<div id="container-mini-oponentes">
					</div>
				</div>
				
				<div class="offline-separator" id="separator2">
					<div id="oponente-img"></div>
					<div id="oponente-nome"></div>
					<div class="oponente-info" id="oponente-nivel"></div>
					<div class="oponente-info" id="oponente-dificuldade"></div>
					<div class="oponente-info" id="oponente-recompensa"></div>
					
					<div id="btn-desafiar" onclick="iniciarContraOponente()">Desafiar</div>
				</div>
			</div>
		</div>
	</div>		
	
	<script type="text/javascript" src="js/jogo-scripts.js" charset="utf-8"></script>
	<script type="text/javascript" src="js/jogo-global.js" charset="utf-8"></script>
	<script type="text/javascript" src="js/jogo-draw.js" charset="utf-8"></script>
	<script type="text/javascript" src="js/jogo-vs-ia.js" charset="utf-8"></script>
	<script type="text/javascript" src="js/jogo-efeitos.js" charset="utf-8"></script>
</body>
</html>