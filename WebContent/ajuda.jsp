<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
<script type='text/javascript' src='js/jquery-3.4.1.min.js'></script>
<script type="text/javascript" src="js/ajuda-scripts.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="css/ajuda-style.css">
<title>Tutorial de levs</title>
</head>
<body>
	<div id="fixed-background"></div>
	<jsp:include page="header.jsp" />
	
	<div id="ajuda-grandona">
		<div id="ajuda-titulo">Ajuda</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(1)">Sobre o jogo</div>
		<div class="ajuda-dentro" id="ajuda1">
			<div class="texto-ajuda">
			<p>Neverland Heroes é um jogo de cartas de ação criado por um aluno da Fatec Zona Leste, do curso de Análise e Desenvolvimento de Sistemas, como projeto a ser apresentado para a disciplina de Laboratório de Engenharia de Software.<p>
			<p>As imagens do jogo foram tiradas de conteúdos já existentes de franquias conhecidas, como do jogo Fire Emblem Heroes (Nintendo) e do jogo Yu-Gi-Oh (Konami). Eu não possuo direito sobre nenhuma dessas imagens, e caso alguém deseje ser creditado adequadamente ou ter a imagem removida, por favor entre em contato comigo.<p>
			<p>No nosso universo está ocorrendo um evento que conecta outras realidades com a nossa por meio de fissuras espaço-temporais. Essas fissuras trazem heróis, armas e magias de outras realidades para a nossa, e você é um escolhido para usar essas forças de outro mundo e descobrir a melhor maneira de gerenciá-las. Monte seu baralho e prove que você é o melhor!</p>
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(2)">Regras</div>
		<div class="ajuda-dentro" id="ajuda2">
			<div class="texto-ajuda">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(3)">Heróis</div>
		<div class="ajuda-dentro" id="ajuda3">
			<div class="texto-ajuda">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(4)">Armas</div>
		<div class="ajuda-dentro" id="ajuda4">
			<div class="texto-ajuda">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(5)">Magias/Posturas</div>
		<div class="ajuda-dentro" id="ajuda5">
			<div class="texto-ajuda">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(6)">Consumíveis</div>
		<div class="ajuda-dentro" id="ajuda6">
			<div class="texto-ajuda">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(7)">Partidas</div>
		<div class="ajuda-dentro" id="ajuda7">
			<div class="texto-ajuda">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
		</div>
	</div>
	
</body>
</html>