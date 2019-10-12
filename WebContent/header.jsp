<script type="text/javascript" src="js/header-scripts.js"></script>
<link rel="stylesheet" type="text/css" href="css/fixos-style.css">

<jsp:include page="session_validator.jsp" />

<div id="header">
	<img src="img/logo2.png" id="header-logo">
	<span id="header-btnjogar">Jogar</span>
	<span class="header-menu-item">Ajuda</span>
	<span class="header-menu-item">Coleção</span>
	<span class="header-menu-item">Mercado</span>
	<span class="header-menu-item" id="header-perfil-container">
		<span id="perfil-drop">Perfil</span>
		<span class="perfil-drop-content">
			<a href="#">Informações</a>
			<a href="#">Amigos</a>
			<%
			int tipo = 0;
			if(request.isRequestedSessionIdValid()){
				tipo = (int) session.getAttribute("tipo");
			}
			if(tipo >= 2){
			%>
				<a href="criador-cartas.jsp" id="header-adm">+ Cartas</a>
				<a href="#" id="header-adm">+ Novidades</a>
			<%
			}
			%>
			<a href="#" id="perfil-logout" onclick="logout()">Sair</a>
		</span>
	</span>
	<a href="novidades.jsp"><span class="header-menu-item"> Novidades</span></a>
</div>