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
		
		<div class="ajuda-topico" onclick="alternaTopico(1, 305)">Sobre o jogo</div>
		<div class="ajuda-dentro" id="ajuda1">
			<div class="texto-ajuda">
			<p>Neverland Heroes é um jogo de cartas de ação criado por um aluno da Fatec Zona Leste, do curso de Análise e Desenvolvimento de Sistemas, como projeto a ser apresentado para a disciplina de Laboratório de Engenharia de Software.<p>
			<p>As imagens do jogo foram tiradas de conteúdos já existentes de franquias conhecidas, como do jogo Fire Emblem Heroes (Nintendo) e do jogo Yu-Gi-Oh (Konami). Eu não possuo direito sobre nenhuma dessas imagens, e caso alguém deseje ser creditado adequadamente ou ter a imagem removida, por favor entre em contato comigo.<p>
			<p>No nosso universo está ocorrendo um evento que conecta outras realidades com a nossa por meio de fissuras espaço-temporais. Essas fissuras trazem heróis, armas e magias de outras realidades para a nossa, e você é um escolhido para usar essas forças de outro mundo e descobrir a melhor maneira de gerenciá-las. Monte seu baralho e prove que você é o melhor!</p>
			<p>Novas cartas são adquiridas na loja por meio de pacotes, ou fissuras. Cada pacote tem uma chance de ter cartas de certa raridade, que pode ser visualizado ao passar o cursor por cima dele. Cada pacote tem um preço, e o dinheiro pode ser adquirido jogando, completando conquistas e, futuramente, vendendo suas cartas.
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(2, 514)">Regras</div>
		<div class="ajuda-dentro" id="ajuda2">
			<div class="texto-ajuda">
				<ul>
					<li>O baralho deve ter entre 20 e 60 cartas.</li>
					<li>Todo baralho deve possuir um campeão, que é um herói chamado ao campo no início da partida</li>
					<li>O baralho pode ter, no máximo, 10 heróis.</li>
					<li>A soma do rank dos heróis do baralho deve ser. no máximo, 20.</li>
					<li>Cada jogador possui em seu campo uma linha de frente e uma linha de trás, cada uma com três espaços para heróis</li>
					<li>Cada herói em campo pode atacar apenas uma vez por turno.</li>
					<li>Cada herói em campo pode ser movido para uma linha diferente apenas uma vez por turno.</li>
					<li>Um herói só pode ser movido para uma linha se ela possuir um espaço para herói disponível.</li>
					<li>Heróis na linha de trás podem apenas ser atacados se não houver heróis aliados na linha de frente (a menos que o atacante esteja equipado com um arco).</li>
					<li>Heróis na linha de trás podem apenas atacar se não houver heróis aliados na linha de frente (a menos que esteja equipado com um arco).</li>
					<li>Heróis na linha de trás equipados com arco podem atacar heróis na linha de frente do oponente.</li>
					<li>Heróis na linha de frente equipados com arco podem atacar heróis na linha de trás do oponente (mesmo se ele possuir heróis na linha de frente).</li>
					<li>Quando um herói for abatido ele irá para a pilha de descarte, assim como a arma equipada a ele.</li>
					<li>Quando uma magia/postura for usada, ela irá para  pilha de recarga.</li>
					<li>Quando um consumível for usado ele irá para a pilha de descarte.</li>
					<li>Quando um herói ataca, há a chance de causar acerto crítico com o dobro do dano. A chance é calculada gerando um número aleatório entre 1 e 20, e caso esse número seja menor ou igual à chance crítica do herói, o ataque causará dano crítico.</li>
					<li>Quando um herói é atacado, há a chance de ele desviar do ataque sem sofrer dano. A chance é calculada gerando um número aleatório entre 1 e 20, e caso esse número seja menor ou igual à chance de esquiva do herói, o ataque será desviado.</li>
					<li>Vence o jogador que deixar o oponente sem nenhum herói em campo.</li>					
				</ul>
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(3, 1151)">Heróis</div>
		<div class="ajuda-dentro" id="ajuda3">
			<div class="texto-ajuda">
				<p>Heróis são as cartas principais do jogo, sendo necessárias para se usar magias/posturas, consumíveis e para equipar armas. Quando não há mais heróis no campo, o jogador perde. Abaixo segue uma imagem mostrando algumas características desse tipo de carta:</p>
				<img src="img/help-hero.png" class="card-help">
				<ul>
					<li><b>Nome:</b> o nome do herói.</li>
					<li><b>Afinidade:</b> o elemento que esse herói tem afinidade.</li>
					<li><b>Perícia:</b> a arma que esse herói tem perícia e o bônus que ele ganha ao estar equipado com uma arma desse tipo.</li>
					<li><b>Raridade:</b> a raridade da carta.</li>
					<li><b>HP:</b> quantidade de HP base do herói (um herói é derrotado quando seu HP chega à 0).</li>
					<li><b>Mana:</b> quantidade de MANA base do herói, que é consumida ao usar magias/posturas.</li>
					<li><b>Força:</b> pontos de força (FOR) base do herói, que são usados ao calcular o dano de ataques desse herói.</li>
					<li><b>Poder:</b> pontos de poder (POD) base do herói, que geralmente são usados em efeitos de magias.</li>
					<li><b>Defesa:</b> pontos de defesa (DEF) base do herói, que são usados para reduzir danos físicos.</li>
					<li><b>Resistência:</b> pontos de resistência (RES) base do herói, que são usados para reduzir danos mágicos.</li>
					<li><b>Rank:</b> a quantidade de estrelas indica o rank da carta, usada para validar o baralho (geralmente quanto maior o rank mais poderosa é a carta).</li>
					<li><b>Efeito:</b> o texto que fala qual efeito a carta possui, que pode variar bastante.</li>	
				</ul>	
				<br>
				<p>Além desses atributos registrados nos heróis, há ainda outros atributos que são usados dentro de uma partida, que são:</p>
				<ul>
					<li><b>Proteção:</b> quantidade de proteção (PROT) do herói, usado para levar dano antes do HP, porém sem calcular defesa e resistência.</li>
					<li><b>Crítico:</b> representa a chance crítica (CRIT) dos ataques do herói; começa com 1 e pode ir até 20.</li>
					<li><b>Esquiva:</b> representa a chance de esquiva (ESQ) quando um herói recebe um ataque; começa com 1 e pode ir até 20.</li>	
				</ul>
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(4, 828)">Armas</div>
		<div class="ajuda-dentro" id="ajuda4">
			<div class="texto-ajuda">
				<p>Armas são cartas que podem ser equipadas aos heróis para fortalecê-los. Um herói pode ser equipado com qualquer tipo de arma, mas um herói pode estar equipado com apenas uma arma por vez, e uma arma pode estar equipada a apenas um herói por vez.</p>
				<img src="img/help-weapon.png" class="card-help">
				<ul>
					<li><b>Nome:</b> o nome da arma.</li>
					<li><b>Tipo da arma:</b> o grupo ao qual essa arma pertence, dando bônus de perícia aos herói com perícia com esse tipo e permitindo que posturas desse tipo possam ser usadas pelo portador. Os tipos são divididos em: espadas, lanças, machados, adagas, arcos, escudos, livros e cajados.</li>
					<li><b>Raridade:</b> a raridade da carta.</li>
					<li><b>Efeito:</b> o texto que fala qual efeito a carta possui, que pode variar bastante.</li>
					<li><b>Boost:</b> o bônus que a arma dá aos atributos do seu portador; o boost SEMPRE é considerado como parte do efeito da arma.</li>
				</ul>
			</div>
		</div>
		
		<div class="ajuda-topico" onclick="alternaTopico(5, 857)">Magias/Posturas</div>
		<div class="ajuda-dentro" id="ajuda5">
			<div class="texto-ajuda">
				<p>Magias e Posturas são cartas com efeitos especiais diversos que são usadas pelos heróis</p>
				<img src="img/help-spell.png" class="card-help">
				<ul>
					<li><b>Nome:</b> o nome da magia/postura.</li>
					<li><b>Custo:</b> a quantidade de mana necessária para que o herói possa usá-la.</li>
					<li><b>Afinidade/Arma:</b> Magias possuem afinidade, sendo necessário o herói usuário possuir a mesma afinidade (no caso de magias neutras qualquer herói pode usá-las); posturas possuem o tipo de arma que deve estar equipada ao herói usuário para que ela possa ser usada.</li>
					<li><b>Recarga:</b> a quantidade de turnos que a carta irá ficar na pilha de recarga após ser usada.</li>
					<li><b>Raridade:</b> a raridade da carta.</li>
					<li><b>Efeito:</b> o texto que fala qual efeito a carta possui, que pode variar bastante.</li>					
				</ul>
			</div>
		</div>
		
		<!-- <div class="ajuda-topico" onclick="alternaTopico(6, 685)">Consumíveis</div>
		<div class="ajuda-dentro" id="ajuda6">
			<div class="texto-ajuda">
				<p>Consumíveis são itens usados por heróis que são descartados após o uso</p>
				<img src="img/help-consu.png" class="card-help">
				<ul>
					<li><b>Nome:</b> o nome do consumível.</li>
					<li><b>Raridade:</b> a raridade da carta.</li>
					<li><b>Efeito:</b> o texto que fala qual efeito a carta possui, que pode variar bastante.</li>					
				</ul>
			</div>
		</div> -->
		
		<div class="ajuda-topico" onclick="alternaTopico(7, 10)">Partidas</div>
		<div class="ajuda-dentro" id="ajuda7">
			<div class="texto-ajuda">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
		</div>
	</div>
	
</body>
</html>