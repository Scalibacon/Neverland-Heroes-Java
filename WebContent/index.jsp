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
			<img src="img/logo1.png" id="logo1">
			<div id="cont-form">
				<div id="form-top">
					<div class="form-top-aba" id="aba1" onclick='trocaForm("#aba1", "#form-login")'>Login</div>
					<div class="form-top-aba" id="aba2" onclick='trocaForm("#aba2", "#form-registro")'>Registrar</div>
					<div id="aba-index"></div>
				</div>
				<div id="cont-form-pages">
					<div class="form" id="form-registro">	
						<form action="" method="post">
							<div class="form-linha">
								Usuário
								<br><input type="text" class="form-input" name="usuario" placeholder="Crie um nome de usuário ..."/>
								<div class="form-belezinha"></div>
							</div>
						</form>						
					</div>
					<div class="form" id="form-login">	
						<form action="" method="post">
							<div class="form-linha">
								Usuário
								<br><input type="text" class="form-input" name="usuario" placeholder="Insira seu nome de usuário..."/>
							</div>
							<div class="form-linha">
								Senha <a href="" id="form-forgot-pass">Esqueceu sua senha?</a>
								<br><input type="password" class="form-input" name="senha" placeholder="Insira sua senha..."/>								
							</div>
							<div class="form-linha">
								<input class="form-button" type="submit" value="Logar"/>
							</div>
						</form>		
					</div>					
				</div>
			</div>
		</div>
	</div>

</body>
</html>