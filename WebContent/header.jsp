<script type="text/javascript" src="js/header-scripts.js"></script>
<link rel="stylesheet" type="text/css" href="css/fixos-style.css">

<jsp:include page="session_validator.jsp" />

<div id="header">
	<img src="img/logo2.png" id="header-logo">
	<span id="header-btnjogar">Jogar</span>
	<span class="header-menu-item">Ajuda</span>
	<a href="colecao.jsp"><span class="header-menu-item">Cole��o</span></a>
	<a href="loja.jsp"><span class="header-menu-item">Loja</span></a>
	<span class="header-menu-item" id="header-perfil-container">
		<a href="perfil.jsp"><span id="perfil-drop">Perfil</span></a>
		<span class="perfil-drop-content">
			<a href="perfil.jsp">Informa��es</a>
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