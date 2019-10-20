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
		<div id="container-inputs">
			<input type="text" placeholder="Buscar por nome..." id="buscar-nome">
			<select class="combobox">
				<option value="-1" selected>Busque por tipo...</option>
				<option value="0">Consumível</option>
				<option value="1">Arma</option>
				<option value="2">Postura</option>
				<option value="3">Magia</option>
				<option value="4">Herói</option>
			</select>
			<select class="combobox">
				<option value="-1" selected>Busque por afinidade...</option>
				<option value="0">Neutro</option>
				<option value="1">Luz</option>
				<option value="2">Trevas</option>
				<option value="3">Fogo</option>
				<option value="4">Água</option>
				<option value="5">Terra</option>
				<option value="6">Vento</option>
			</select>
			<select class="combobox">
				<option value="-1">Busque por arma...</option>
				<option value="0">Espada</option>
				<option value="1">Lança</option>
				<option value="2">Machado</option>
				<option value="3">Adaga</option>
				<option value="4">Arco</option>	
				<option value="5">Escudo</option>	
				<option value="6">Livro</option>
				<option value="7">Cajado</option>		
			</select>
			<select class="combobox" onchange="buscaCartas()">
				<option value="-1">Busque por rank...</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
		</div>
		
		<div id="colecao-container">
			<div class="container-titulo">SUA COLEÇÃO</div>
			<div class="cards-container" id="cards-colecao">
				<div class="mini-card" id='1'><span class="carta-qtde">x3</span></div>
			</div>
		</div>
		
		<div id="deck-container">
		</div>
	</div>	
<script type="text/javascript" src="js/colecao-scripts.js"></script>
</body>
</html>