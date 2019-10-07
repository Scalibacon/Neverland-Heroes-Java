<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="js/index-scripts.js"></script>
<link rel="stylesheet" type="text/css" href="css/index-style.css">
<title>Bem-vindo ao CardGame</title>
</head>
<body>

	<div id="fundo1">
		<img src="img/ayra.png" id="hero-left"> 
		<img src="img/robin.png" id="hero-right">

		<div id="centro">
			<div id="form-top">
				<div class="form-top-aba" id="aba1" onclick='trocaForm("#aba1", "#form-login")'>Login</div>
				<div class="form-top-aba" id="aba2" onclick='trocaForm("#aba2", "#form-registro")'>Registrar</div>
			</div>
			<div class="form" id="form-login">			
			</div>
			<div class="form" id="form-registro">			
			</div>
		</div>
	</div>

</body>
</html>