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
	<jsp:include page="header.jsp" />

	<div id="background-veil" onclick="escondeNovasCartas()">		
	</div>
	<div id="new-cards-container">
		<img src="img/x.png" id="close-icons" onclick="escondeNovasCartas()">
		<img src="" class="new-card">
	</div>

	<div id="big-loja-container">
		<div class="fissure-container" id="container1" onclick="mostraNovasCartas()">
			<img src="img/fissure1.jpg" class="fissure-img">
			<div class="fissure-price" id="price1">$300</div>
			<div class="fissure-name" id="name1">Fissura Comum</div>
		</div>
		
		<div class="fissure-container" id="container2">
			<img src="img/fissure2.jpg" class="fissure-img">
			<div class="fissure-price" id="price2">$500</div>
			<div class="fissure-name" id="name2">Fissura Rara</div>
		</div>
		
		<div class="fissure-container" id="container3">
			<img src="img/fissure3.jpg" class="fissure-img">
			<div class="fissure-price" id="price3">$800</div>
			<div class="fissure-name" id="name3">Fissura Épica</div>
		</div>
		
		<div class="fissure-container" id="container4">
			<img src="img/fissure4.jpg" class="fissure-img">
			<div class="fissure-price" id="price4">$1000</div>
			<div class="fissure-name" id="name4">Fissura Lendária</div>
		</div>
		
		<img src="img/miniphisto.png" id="loja-miniphisto">
	</div>
	
	

	<script type="text/javascript" src="js/loja-scripts.js"></script>
</body>
</html>