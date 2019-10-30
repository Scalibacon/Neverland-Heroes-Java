<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
<script type='text/javascript' src='js/jquery-3.4.1.min.js'></script>
<link rel="stylesheet" type="text/css" href="css/colecao-style.css">
<title>Sua coleção</title>
</head>
<body>
	<jsp:include page="header.jsp" />
	
	<div id="carta-grandona"></div>
	
	<div id="big-container">
			<div id="colecao-container">
			<div class="container-titulo">SUA COLEÇÃO</div>
			<div class="cards-container" id="cards-colecao">
			</div>
		</div>
		
		<div id="deck-container">
			<div class="container-titulo">
				<div class='deck-btn' id="btn-ordenar" onclick="sortDeck()">Ordenar</div>
				<div class='deck-btn' id="btn-salvar" onclick="saveDeck()">Salvar</div>
				SEU DECK				
			</div>			
			<div class="cards-container" id="cards-deck">
				<div class="champion-card"></div>			
			</div>	
			<div id="container-deck-info">	
				<img src="img/rank.png" class="deck-icon"><span class="deck-info-text" id="info-rank">?</span>
				<img src="img/hero.png" class="deck-icon"><span class="deck-info-text" id="info-herois">?</span>
				<img src="img/espada.png" class="deck-icon"><span class="deck-info-text" id="info-forca">?</span>
				<img src="img/magia.png" class="deck-icon"><span class="deck-info-text" id="info-poder">?</span>
				<img src="img/back.png" class="deck-icon"><span class="deck-info-text" id="info-qtde">?</span>
			</div>
		</div>
	</div>	
<script type="text/javascript" src="js/colecao-scripts.js"></script>
</body>
</html>