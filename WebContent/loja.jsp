<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
<script type='text/javascript' src='js/jquery-3.4.1.min.js'></script>
<link rel="stylesheet" type="text/css" href="css/loja-style.css">
<title>Loja</title>
</head>
<body>
	<div id="pacote-info">Lorem<br>Impsum<br>ka ka ka</div>

	<jsp:include page="header.jsp" />

	<div id="background-veil" onclick="escondeNovasCartas()">		
	</div>
	<div id="new-cards-container">
		<img src="img/x.png" id="close-icons" onclick="escondeNovasCartas()">
		<img src="" class="new-card">
	</div>	
	
	<div id="big-loja-container">
		
		<div class="fissure-container" id="container1" onclick="tentaComprarPacote(1)" onmouseover="mostraPacoteInfo(74,20,5,1)" onmouseleave="escondePacoteInfo()">
			<img src="img/fissure1.jpg" class="fissure-img">
			<div class="fissure-price" id="price1">$300</div>
			<div class="fissure-name" id="name1">Fissura Comum</div>
		</div>
		
		<div class="fissure-container" id="container2" onclick="tentaComprarPacote(2)" onmouseover="mostraPacoteInfo(30,64,5,1)" onmouseleave="escondePacoteInfo()">
			<img src="img/fissure2.jpg" class="fissure-img">
			<div class="fissure-price" id="price2">$500</div>
			<div class="fissure-name" id="name2">Fissura Rara</div>
		</div>
		
		<div class="fissure-container" id="container3" onclick="tentaComprarPacote(3)" onmouseover="mostraPacoteInfo(10,20,65,5)" onmouseleave="escondePacoteInfo()">
			<img src="img/fissure3.jpg" class="fissure-img">
			<div class="fissure-price" id="price3">$1000</div>
			<div class="fissure-name" id="name3">Fissura Épica</div>
		</div>
		
		<div class="fissure-container" id="container4" onclick="tentaComprarPacote(4)" onmouseover="mostraPacoteInfo(5,15,30,50)" onmouseleave="escondePacoteInfo()">
			<img src="img/fissure4.jpg" class="fissure-img">
			<div class="fissure-price" id="price4">$2000</div>
			<div class="fissure-name" id="name4">Fissura Lendária</div>
		</div>
		
		<div id="money-container">Você possui: $7500</div>
		
		<img src="img/miniphisto.png" id="loja-miniphisto">
	</div>
	
	

	<script type="text/javascript" src="js/loja-scripts.js"></script>
</body>
</html>