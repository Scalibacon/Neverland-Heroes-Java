<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type='text/javascript' src='js/jquery-3.4.1.min.js'></script>
<script type="text/javascript" src="js/index-scripts.js"></script>
<link rel="stylesheet" type="text/css" href="css/index-style.css">
<title>Bem-vindo ao CardGame</title>
</head>
<body>
	<%
	if (session.getAttribute("usuario") != null) {		
	%>
		<script>window.location = "novidades.jsp";</script>
	<%	
	}		
	%>
	<!-- Depois verificar se a sessão tá ativa -->
	<jsp:include page="index_alerts.jsp" />
	<div id="fundo1">
		
		<img src="img/ayra.png" id="hero-left"> 		
		<img src="img/robin.png" id="hero-right">

		<div id="centro">
			<img src="img/logo1.png" id="logo1">
			<div id="cont-form">
				<div id="form-top">
					<div class="form-top-aba" id="aba1" onclick='trocaForm("#aba1", "#form-page-login")'>Login</div>
					<div class="form-top-aba" id="aba2" onclick='trocaForm("#aba2", "#form-page-registro")'>Registrar</div>
					<div id="aba-index"></div>
				</div>
				<div id="cont-form-pages">
					<div class="form" id="form-page-registro">	
						<form action="registerServlet" method="post" id="form-registro">
							<div class="form-linha">
								<div class="form-belezinha"></div>
								Usuário
								<br><input type="text" class="form-input" id="usuario-registro" name="usuario" placeholder="Crie um nome de usuário..."/>								
							</div>
							<div class="form-linha">
								E-mail
								<br><input type="email" class="form-input" id="email-registro" name="email" placeholder="Digite um e-mail válido..."/>
							</div>
							<div class="form-linha">
								Senha
								<br><input type="password" class="form-input" id="senha-registro" name="senha" placeholder="Digite uma senha das boas..."/>
							</div>
							<div class="form-linha">
								<span id="form-termos"> <input type="checkbox" id="termos-registro" name="termos"> Li e concordo com os <a href="">Termos de Uso</a></span>
							</div>
							<div class="form-linha">
								<input class="form-button" type="button" onclick="registroSubmit()" value="Registrar"/>
							</div>
						</form>						
					</div>
					<div class="form" id="form-page-login">	
						<form action="loginServlet" method="post" id="form-login">
							<div class="form-linha">
								Usuário
								<br><input type="text" class="form-input" id="usuario-login" name="usuario" placeholder="Insira seu nome de usuário..."/>
							</div>
							<div class="form-linha">
								Senha <a href="" id="form-forgot-pass">Esqueceu sua senha?</a>
								<br><input type="password" class="form-input" id="senha-login" name="senha" placeholder="Insira sua senha..."/>								
							</div>
							<div class="form-linha">
								<input class="form-button" type="button" onclick="loginSubmit()" id="submit-login" value="Logar"/>
							</div>
						</form>		
					</div>					
				</div>
			</div>
		</div>
	</div>

</body>
</html>