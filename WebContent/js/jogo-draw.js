//**************************************** PRÉ-JOGO *************************************************************
function carregaTelaInicial(isVsIA){
	var delay = 0;
	
	document.getElementById('container-choose-game').style.width = "0px";
	document.getElementById('container-choose-game').style.height = "580px";
	
	var createdDiv1= document.createElement("div");
	createdDiv1.setAttribute("class", "player-info");
	createdDiv1.setAttribute("id", "info1");
	createdDiv1.innerHTML = "<img src='img/icons/" + jogo.jogador1.jogador.icone + ".jpg' class='player-icon' id='icon1'>" +
	jogo.jogador1.jogador.usuario + "<br>" +
	"Lvl " + jogo.jogador1.jogador.nivel;
	document.getElementById('game-container').appendChild(createdDiv1);
	
	var createdDiv2= document.createElement("div");
	createdDiv2.setAttribute("class", "player-info");
	createdDiv2.setAttribute("id", "info2");
	if(jogo.tipo == 0){
		var txtBuscaIcon = "icons/" + jogo.jogador2.icone;
		if(jogo.jogador2.jogador.usuario == null || jogo.jogador2.jogador.usuario == undefined){ //pega o icone da pasta de oponente
			txtBuscaIcon = "oponentes/oponente" + jogo.jogador2.jogador.id;
		}
		createdDiv2.innerHTML = "<img src='img/" + txtBuscaIcon + ".jpg' class='player-icon' id='icon2'>" +
		jogo.jogador2.jogador.nome + "<br>" +
		"Lvl " + jogo.jogador2.jogador.nivel;
	}
	document.getElementById('game-container').appendChild(createdDiv2);
	
	delay += 700;
	setTimeout(function(){
		document.getElementById('container-choose-game').style.display = "none";
		document.getElementById('game-container').style.opacity = "1";
		document.getElementById('game-container').style.width = "1200px";		
	},delay);
	
	delay += 800;
	setTimeout(function(){
		var createdImgVs= document.createElement("div");
		createdImgVs.setAttribute("id", "game-vs");
		document.getElementById('game-container').appendChild(createdImgVs);
	}, delay);
	
	delay += 2000;
	setTimeout(function(){
		$('.player-info').css({'opacity':'0'});
		document.getElementById('game-vs').style.top = "-170px";
	}, delay);
	
	delay += 500;
	setTimeout(function(){
		$('.player-info').css({'display':'none'});
		document.getElementById('game-vs').style.display = "none";
		mostraJogo();
	}, delay);
	
	delay += 200;
	setTimeout(function(){
		startGame(isVsIA);
	}, delay);
}

function mostraJogo(){
	document.addEventListener("keydown", function(){
		if(event.key === "Escape"){
			escondeVeil();
			if(jogo.estado == gameStatus.ESCOLHENDO){
				cancelarEscolha();
			}
		}
	});
	desenhaLateralDireita();
	desenhaCampo();
}

function desenhaLateralDireita(){
	var createdChatContainer = document.createElement("div");
	createdChatContainer.setAttribute("id", "game-chat-container");
	
	//div com o profile de baixo
	var createdPerfil1 = document.createElement("div");
	createdPerfil1.setAttribute("class", "ingame-profile");
	createdPerfil1.setAttribute("id", "ingame-profile1");
	var createdIcon1 = document.createElement("img");
	createdIcon1.setAttribute("class", "ingame-profile-icon");
	createdIcon1.setAttribute("src", "img/icons/" + jogo.jogador1.jogador.icone + ".jpg");
	createdPerfil1.innerHTML += jogo.jogador1.jogador.usuario;
	
	createdPerfil1.appendChild(createdIcon1);
	createdChatContainer.appendChild(createdPerfil1);
	
	//div com o profile de cima
	var createdPerfil2 = document.createElement("div");
	createdPerfil2.setAttribute("class", "ingame-profile");
	createdPerfil2.setAttribute("id", "ingame-profile2");
	var createdIcon2 = document.createElement("img");
	createdIcon2.setAttribute("class", "ingame-profile-icon");	
	if(jogo.jogador2.jogador.usuario == null || jogo.jogador2.jogador.usuario == undefined){
		createdIcon2.setAttribute("src", "img/oponentes/oponente" + jogo.jogador2.jogador.id + ".jpg");
		createdPerfil2.innerHTML += jogo.jogador2.jogador.nome;
	} else {
		createdIcon2.setAttribute("src", "img/icons/" + jogo.jogador2.jogador.icone + ".jpg");
		createdPerfil2.innerHTML += jogo.jogador2.jogador.usuario;
	}
	
	createdPerfil2.appendChild(createdIcon2);
	createdChatContainer.appendChild(createdPerfil2);
	
	//textfield
	var createdTextField = document.createElement("input");
	createdTextField.setAttribute("id", "ingame-textfield");
	createdTextField.setAttribute("placeholder", "Digite sua mensagem...");
	createdChatContainer.appendChild(createdTextField);
	
	//chat
	var createdChat = document.createElement("div");
	createdChat.setAttribute("id", "ingame-chat");
	createdChatContainer.appendChild(createdChat);
	
	document.getElementById('game-container').appendChild(createdChatContainer);
	
	//botoes 
	var createdBtnPassar = document.createElement("div");
	createdBtnPassar.setAttribute("class", "ingame-btn");
	createdBtnPassar.setAttribute("id", "btn-passar");
	createdBtnPassar.addEventListener("click", function(){ passarTurno(); });
	createdBtnPassar.innerHTML = "Passar";
	document.getElementById('game-container').appendChild(createdBtnPassar);
	
	var createdBtnDesistir = document.createElement("div");
	createdBtnDesistir.setAttribute("class", "ingame-btn");
	createdBtnDesistir.setAttribute("id", "btn-desistir");
	createdBtnDesistir.addEventListener("click", function(){ desistir(); });
	createdBtnDesistir.innerHTML = "Desistir";
	document.getElementById('game-container').appendChild(createdBtnDesistir);
}

function desenhaCampo(){
	//**************************** Cartona e afins ***********************************
	var createdVeil = document.createElement("div");
	createdVeil.setAttribute("id", "ingame-veil");
	createdVeil.addEventListener("click", function(){ 
		if(selecionando.baralho == null){
			escondeVeil(); 
		}
	});
	var createdBigCard = document.createElement("div");
	createdBigCard.setAttribute("id", "ingame-big-card");
	createdVeil.appendChild(createdBigCard);
	var createdDeepInfo= document.createElement("div");
	createdDeepInfo.setAttribute("id", "ingame-deep-info");	
	createdVeil.appendChild(createdDeepInfo);
	var createdBusca = document.createElement("div");
	createdBusca.setAttribute("id", "busca-container");
	createdVeil.appendChild(createdBusca);
	document.getElementById('game-container').appendChild(createdVeil);
	
	//**************************** div atacar/mover ***********************************
	var createdContainerAtkMove = document.createElement("div");
	createdContainerAtkMove.setAttribute("id", "atk-move-container");
	
	var createdAtkMoveAtk = document.createElement("div");
	createdAtkMoveAtk.setAttribute("class", "atk-move-btn");
	createdAtkMoveAtk.setAttribute("id", "atk-btn");
	createdAtkMoveAtk.innerHTML = "Atacar";
	createdContainerAtkMove.appendChild(createdAtkMoveAtk);
	
	var createdAtkMoveMove = document.createElement("div");
	createdAtkMoveMove.setAttribute("class", "atk-move-btn");
	createdAtkMoveMove.setAttribute("id", "move-btn");
	createdAtkMoveMove.innerHTML = "Mover";
	createdContainerAtkMove.appendChild(createdAtkMoveMove);
	
	document.getElementById('game-container').appendChild(createdContainerAtkMove);
	
	//**************************** Espaço pras mãos **********************************
	var createdMao1 = document.createElement("div");
	createdMao1.setAttribute("class", "ingame-hand-container");
	createdMao1.setAttribute("id", "hand-jogador");
	var createdInsideMao = document.createElement("div");
	createdInsideMao.setAttribute("id", "inside-card-hand-jogador");
	jogo.jogador1.divs.mao = createdInsideMao;
	createdMao1.appendChild(createdInsideMao);
	document.getElementById('game-container').appendChild(createdMao1);
	
	var createdMao2 = document.createElement("div");
	createdMao2.setAttribute("class", "ingame-hand-container");
	createdMao2.setAttribute("id", "hand-oponente");
	var createdInsideMao2 = document.createElement("div");
	createdInsideMao2.setAttribute("id", "inside-card-hand-oponente");
	jogo.jogador2.divs.mao = createdInsideMao2;
	createdMao2.appendChild(createdInsideMao2);
	document.getElementById('game-container').appendChild(createdMao2);
	
	//**************************** Lines de heróis **********************************
	var createdBackLine1 = document.createElement("div");
	createdBackLine1.setAttribute("class", "ingame-line");
	createdBackLine1.setAttribute("id", "backline-jogador");
	createdBackLine1.addEventListener("click", function(){ selecionarLine("back") });
	createdBackLine1.addEventListener("mouseover", function(){ destacaLine(createdBackLine1); });
	createdBackLine1.addEventListener("mouseleave", function(){ removeDestaqueLine(createdBackLine1); });
	jogo.jogador1.divs.back = createdBackLine1;
	document.getElementById('game-container').appendChild(createdBackLine1);
	
	var createdFrontLine1 = document.createElement("div");
	createdFrontLine1.setAttribute("class", "ingame-line");
	createdFrontLine1.setAttribute("id", "frontline-jogador");
	createdFrontLine1.addEventListener("click", function(){ selecionarLine("front") });
	createdFrontLine1.addEventListener("mouseover", function(){ destacaLine(createdFrontLine1); });
	createdFrontLine1.addEventListener("mouseleave", function(){ removeDestaqueLine(createdFrontLine1); });
	jogo.jogador1.divs.front = createdFrontLine1;
	document.getElementById('game-container').appendChild(createdFrontLine1);
	
	var createdBackLine2 = document.createElement("div");
	createdBackLine2.setAttribute("class", "ingame-line");
	createdBackLine2.setAttribute("id", "backline-oponente");
	jogo.jogador2.divs.back = createdBackLine2;
	document.getElementById('game-container').appendChild(createdBackLine2);
	
	var createdFrontLine2 = document.createElement("div");
	createdFrontLine2.setAttribute("class", "ingame-line");
	createdFrontLine2.setAttribute("id", "frontline-oponente");
	jogo.jogador2.divs.front = createdFrontLine2;
	document.getElementById('game-container').appendChild(createdFrontLine2);
	
	//****************************** Slots de heróis ************************************
	for(var i = 0; i < 3; i++){
		var leftHero = 50 + (i * 237);
		var leftWeapon = 50 + 61 + 1 + (i * 237);
		
		var createdSlot1 = document.createElement("div");
		createdSlot1.setAttribute("class", "ingame-card-slot");
		createdSlot1.setAttribute("id", "card-slot-hero");	
		createdSlot1.style.left = leftHero + "px";
		createdFrontLine1.appendChild(createdSlot1.cloneNode());
		createdFrontLine2.appendChild(createdSlot1.cloneNode());
		createdBackLine1.appendChild(createdSlot1.cloneNode());
		createdBackLine2.appendChild(createdSlot1.cloneNode());
		
		var createdSlot2 = document.createElement("div");
		createdSlot2.setAttribute("class", "ingame-card-slot");
		createdSlot2.setAttribute("id", "card-slot-weapon");	
		createdSlot2.style.left = leftWeapon + "px";
		createdFrontLine1.appendChild(createdSlot2.cloneNode());
		createdFrontLine2.appendChild(createdSlot2.cloneNode());
		createdBackLine1.appendChild(createdSlot2.cloneNode());
		createdBackLine2.appendChild(createdSlot2.cloneNode());
	}
	
	//********************************** Deck *****************************************
	var createdDeck1 = document.createElement("div");
	createdDeck1.setAttribute("class", "ingame-deck");
	createdDeck1.setAttribute("id", "deck-jogador");
	createdDeck1.innerHTML = jogo.jogador1.baralho.cartas.length;
	jogo.jogador1.divs.deck = createdDeck1;
	document.getElementById('game-container').appendChild(createdDeck1);
	
	var createdDeck2 = document.createElement("div");
	createdDeck2.setAttribute("class", "ingame-deck");
	createdDeck2.setAttribute("id", "deck-oponente");
	createdDeck2.innerHTML = jogo.jogador2.baralho.cartas.length;
	jogo.jogador2.divs.deck = createdDeck2;
	document.getElementById('game-container').appendChild(createdDeck2);
	
	//****************************** Pilha de descarte ************************************
	var createdDescarte1 = document.createElement("div");
	createdDescarte1.setAttribute("class", "ingame-descarte");
	createdDescarte1.setAttribute("id", "descarte-jogador");
	jogo.jogador1.divs.descarte = createdDescarte1;
	document.getElementById('game-container').appendChild(createdDescarte1);
	
	var createdDescarte2 = document.createElement("div");
	createdDescarte2.setAttribute("class", "ingame-descarte");
	createdDescarte2.setAttribute("id", "descarte-oponente");
	jogo.jogador2.divs.descarte = createdDescarte2;
	document.getElementById('game-container').appendChild(createdDescarte2);
	
	//****************************** Pilha de recarga ************************************
	var createdRecarga1 = document.createElement("div");
	createdRecarga1.setAttribute("class", "ingame-recarga");
	createdRecarga1.setAttribute("id", "recarga-jogador");
	var recargaIcon = document.createElement("div");
	recargaIcon.setAttribute("class", "ingame-recarga-icon");
	createdRecarga1.appendChild(recargaIcon);
	jogo.jogador1.divs.recarga = createdRecarga1;
	createdRecarga1.addEventListener("click", function(){ mostraRecargas(jogo.jogador1); })
	document.getElementById('game-container').appendChild(createdRecarga1);
	
	var createdRecarga2 = document.createElement("div");
	createdRecarga2.setAttribute("class", "ingame-recarga");
	createdRecarga2.setAttribute("id", "recarga-oponente");
	var recargaIcon2 = document.createElement("div");
	recargaIcon2.setAttribute("class", "ingame-recarga-icon");
	createdRecarga2.appendChild(recargaIcon2);
	jogo.jogador2.divs.recarga = createdRecarga2;
	createdRecarga2.addEventListener("click", function(){ mostraRecargas(jogo.jogador2); })
	document.getElementById('game-container').appendChild(createdRecarga2);
}

function mostraRecargas(jogador){
	document.getElementById('ingame-veil').style.display = "block";	
	document.getElementById('ingame-big-card').style.display = "none";
	document.getElementById('ingame-deep-info').style.display = "none";
	document.getElementById('busca-container').style.display = "block";
	document.getElementById('busca-container').innerHTML = "";
	
	for(var i = 0; i < jogador.recarga.length; i++){
		var createdCard = document.createElement("div");
		createdCard.setAttribute("class", "ingame-card-select");
		createdCard.style.background = "url(img/cards/" + jogador.recarga[i].carta.id + ".jpg) no-repeat";
		createdCard.style.backgroundSize = "100%";
		document.getElementById('busca-container').appendChild(createdCard);
		
		var createdTime = document.createElement("div");
		createdTime.setAttribute("class", "ingame-time-container");
		createdTime.innerHTML = jogador.recarga[i].recarga;
		document.getElementById('busca-container').appendChild(createdTime);
	}
}

function selecionarLine(line){
	if(jogo.estado == gameStatus.ESCOLHENDO && selecionando.line == false){
		selecionando.line = line;		
	}
}
function destacaLine(line){
	if(jogo.estado == gameStatus.ESCOLHENDO && selecionando.line == false){
		line.style.cursor = "pointer";
		line.style.boxShadow = "0px 0px 5px 3px orange";
	} else {
		removeDestaqueLine(line);
	}
}
function removeDestaqueLine(line){
	line.style.boxShadow = "0px 0px 5px 3px transparent";
	line.style.cursor = "default";
}

function escondeVeil(){
	document.getElementById('ingame-veil').style.display = "none";
}
function mostraCartona(carta){
	document.getElementById('busca-container').style.display = "none";
	document.getElementById('ingame-veil').style.display = "block";	
	document.getElementById('ingame-big-card').style.display = "block";
	document.getElementById('ingame-big-card').style.background = "url(img/cards/" + carta.carta.id + ".jpg) no-repeat";
	if(carta.carta.tipo_carta == "HEROI"){
		document.getElementById('ingame-deep-info').style.display = "block";
		document.getElementById('ingame-deep-info').innerHTML = 
			"HP: " + buscaAtributo(carta, "HP") + 
			"<br>MANA: " + buscaAtributo(carta, "MANA") +
			"<br>PROT: " + buscaAtributo(carta, "PROT") + 
			"<br>FOR: " + buscaAtributo(carta, "FOR") + 
			"<br>POD: " + buscaAtributo(carta, "POD") + 
			"<br>DEF: " + buscaAtributo(carta, "DEF") + 
			"<br>RES: " + buscaAtributo(carta, "RES") + 
			"<br>CRIT: " + buscaAtributo(carta, "CRIT") +
			"<br>ESQ: " + buscaAtributo(carta, "ESQ");
	} else {
		document.getElementById('ingame-deep-info').style.display = "none";
	}
	document.getElementById('ingame-big-card').style.backgroundSize = "100%";
}

function buscarNoDeck(tipo, spec){
	jogo.estado = gameStatus.ESCOLHENDO;
	selecionando.baralho = false;
	document.getElementById('ingame-veil').style.display = "block";	
	document.getElementById('ingame-big-card').style.display = "none";
	document.getElementById('ingame-deep-info').style.display = "none";
	document.getElementById('busca-container').style.display = "block";
	document.getElementById('busca-container').innerHTML = "";
	
	for(var i = 0; i < jogo.jogador1.baralho.cartas.length; i++){
		(function(){
			if(jogo.jogador1.baralho.cartas[i].carta.tipo_carta == tipo){
				if(tipo == "ARMA"){
					if(jogo.jogador1.baralho.cartas[i].carta.tipo_arma == spec){
						var carta = jogo.jogador1.baralho.cartas[i];
						var createdCartinha = document.createElement("div");
						createdCartinha.setAttribute("class", "ingame-card-select");
						createdCartinha.setAttribute("id", carta.id_div + "search");
						createdCartinha.style.background = "url(img/cards/" + jogo.jogador1.baralho.cartas[i].carta.id + ".jpg) no-repeat";
						createdCartinha.style.backgroundSize = "100%";		
						createdCartinha.addEventListener("click", function(){ adicionaDeckMao(jogo.jogador1, carta, i) });
						document.getElementById('busca-container').appendChild(createdCartinha);
					}
				}
			}
		}());
	}
}

function adicionaDeckMao(jogador, carta,i){
	for(var i = 0; i < jogador.baralho.cartas.length; i++){
		if(jogador.baralho.cartas[i] == carta){
			jogador.baralho.cartas.splice(i, 1);
			atualizaQtdeDeck(jogador);
			jogador.mao.push(carta);
			limparEscolha();
			drawPuxarCarta(jogador, carta);
			break;
		}
	}
}

function mostraAtkMove(line, slot){
	var container = document.getElementById("game-container");
	var oldAtkMove = document.getElementById("atk-move-container");
	container.removeChild(oldAtkMove);
	
	var createdContainerAtkMove = document.createElement("div");
	createdContainerAtkMove.setAttribute("id", "atk-move-container");
	
	var createdAtkMoveAtk = document.createElement("div");
	createdAtkMoveAtk.setAttribute("class", "atk-move-btn");
	createdAtkMoveAtk.setAttribute("id", "atk-btn");
	createdAtkMoveAtk.innerHTML = "Atacar";
	createdContainerAtkMove.appendChild(createdAtkMoveAtk);
	
	var createdAtkMoveMove = document.createElement("div");
	createdAtkMoveMove.setAttribute("class", "atk-move-btn");
	createdAtkMoveMove.setAttribute("id", "move-btn");
	createdAtkMoveMove.innerHTML = "Mover";
	createdContainerAtkMove.appendChild(createdAtkMoveMove);
	
	container.appendChild(createdContainerAtkMove);
	
	escreveLog('Escolha o que fazer com o herói selecionado...', 'a');
	if(line == "front"){
		var y = card_positions.jogador_frontline[slot].y + 16;
	} else {
		var y = card_positions.jogador_backline[slot].y + 16;
	}
	var atk_move = document.getElementById('atk-move-container');
	atk_move.style.bottom = y + "px";
	atk_move.style.left = (card_positions.jogador_frontline[slot].x + 135 - 80 - 8) + "px";
	atk_move.style.display = "block";
}

function escreveLog(texto, tipo){
	switch(tipo){
		case "i":
			document.getElementById('ingame-chat').innerHTML += "<p class='msg-info'>" + texto + "</p>";
			break;
		case "e":
			document.getElementById('ingame-chat').innerHTML += "<p class='msg-error'>" + texto + "</p>";
			break;
		case "a":
			document.getElementById('ingame-chat').innerHTML += "<p class='msg-advice'>" + texto + "</p>";
			break;
		default:
			document.getElementById('ingame-chat').innerHTML += "<p class='msg-info'>" + texto + "</p>";
			break;
	}
}

//****************************************************************************************************************

//*********************************************** JOGO ***********************************************************
function drawPuxarCarta(jogador, carta){
	var num_cartas = jogador.mao.length; 
	var createdCard = document.createElement("div");
	createdCard.setAttribute("id", carta.id_div);		
	
	if(jogador == jogo.jogador1){		
		createdCard.setAttribute("class", "ingame-card-hand");
		createdCard.style.background = "url(img/cards/" + carta.carta.id + ".jpg) no-repeat";
		createdCard.style.backgroundSize = "100%";		
		createdCard.addEventListener("click", function(){ selecionarCartaNaMao(carta) });
		createdCard.addEventListener("contextmenu", function(){ mostraCartona(carta); event.preventDefault(); });		
	} else {
		createdCard.setAttribute("class", "ingame-card-hand-oponente");			
	}	
	
	jogador.divs.mao.style.width = (num_cartas * 67) + "px";
	jogador.divs.mao.appendChild(createdCard);
	
	atualizaQtdeDeck(jogador);
	return 200;
}

function atualizaQtdeDeck(jogador){
		jogador.divs.deck.innerHTML = jogador.baralho.cartas.length;
}

function drawPosicionarHeroi(jogador, heroi, line, slot){
	if(jogador == jogo.jogador1){
		if(line == "front"){
			var container = jogador.divs.front;
			var x = card_positions.jogador_frontline[slot].x;
		} else {
			var container = jogador.divs.back;
			var x = card_positions.jogador_backline[slot].x;
		}
	} else {
		if(line == "front"){
			var container = jogador.divs.front;
			var x = card_positions.oponente_frontline[slot].x;
		} else {
			var container = jogador.divs.back;
			var x = card_positions.oponente_backline[slot].x;
		}
	}	
	
	var createdHeroi = document.createElement("div");
	createdHeroi.setAttribute("id", heroi.id_div);	
	createdHeroi.setAttribute("class", "ingame-carta");		
	
	createdHeroi.style.background = "url(img/cards/" + heroi.carta.id + ".jpg) no-repeat";		
	createdHeroi.style.backgroundSize = "100%";	
	createdHeroi.style.left = x + "px";
	createdHeroi.style.top = "1px";
	createdHeroi.addEventListener("contextmenu", function(){ mostraCartona(heroi); event.preventDefault(); });
	createdHeroi.addEventListener("click", function(){ selecionaHeroiEmCampo(jogador, line, slot); });	
	container.appendChild(createdHeroi);	
	
	if(heroi.arma != null){		
		var div_old_arma = document.getElementById(heroi.arma.id_div);
		div_old_arma.remove();
		drawArma(jogador, line, slot);
	}
}

function drawArma(jogador, line, slot){	
	if(line == "front"){
		var container = jogador.divs.front;
		var heroi = jogador.campo.front[slot];
		if(jogador == jogo.jogador1){
			var x = card_positions.jogador_frontline[slot].x + 62;
		} else {
			var x = card_positions.oponente_frontline[slot].x + 62;
		}
	} else {
		var container = jogador.divs.back;
		var heroi = jogador.campo.back[slot];
		if(jogador == jogo.jogador1){
			var x = card_positions.jogador_backline[slot].x + 62;
		} else {
			var x = card_positions.oponente_backline[slot].x + 62;
		}
	}	
	
	var arma = heroi.arma;
	
	var createdArma = document.createElement("div");
	createdArma.setAttribute("class", "ingame-carta");
	createdArma.setAttribute("id", arma.id_div);
	createdArma.style.background = "url(img/cards/" + arma.carta.id + ".jpg) no-repeat";		
	createdArma.style.backgroundSize = "100%";	
	createdArma.style.left = x + "px";
	createdArma.style.top = "1px";
	createdArma.addEventListener("contextmenu", function(){ mostraCartona(arma); event.preventDefault(); });
	container.appendChild(createdArma);
}

function selecionaHeroiEmCampo(jogador, line, slot){
	//do choicing stuff usuario / alvo / portador
	if(jogo.estado == gameStatus.ESCOLHENDO){
		if(selecionando.portador == false){
			selecionando.portador = {jogador: jogador, line : line, slot : slot};
		} else 
		if(selecionando.usuario == false){
			selecionando.usuario = {jogador: jogador, line : line, slot : slot};
		} else 
		if(selecionando.alvo == false){
			selecionando.alvo = {jogador: jogador, line : line, slot : slot};
		}
	} else {
		//possibilita mover/atacar
		jogo.estado = gameStatus.ESCOLHENDO;
		selecionando.opcao = false;			
		mostraAtkMove(line, slot);		
		if(line == "front"){
			var carta = jogador.campo.front[slot];
		} else {
			var carta = jogador.campo.back[slot];
		}
		
		if(carta.movimentos_disponiveis <= 0){
			document.getElementById('move-btn').disabled = "true";
			document.getElementById('move-btn').style.filter = "grayscale(100%)";
		} else {		
			document.getElementById('move-btn').addEventListener("click", function(){ moverHeroi(jogador, line, slot); });
			document.getElementById('move-btn').style.filter = "grayscale(0%)";
		}
	}
}

function escondeAtkMove(){
	var atk_move = document.getElementById('atk-move-container');
	atk_move.style.display = "none";
}

var interval_selecionando;
function selecionarCartaNaMao(carta){
	if(jogo.estado == gameStatus.JOGANDO){
		limparEscolha();
		jogo.estado = gameStatus.ESCOLHENDO;		
		var div_selecionada = document.getElementById(carta.id_div);
		switch(carta.carta.tipo_carta){
			case "HEROI":
				escreveLog('Selecione a line do herói...', 'a');
				selecionando.line = false;
				interval_selecionando = setInterval(function(){
					if(selecionando.line){
						if(!chamarHeroi(jogo.jogador1, carta, selecionando.line, false)){
							escreveLog('Line cheia!', 'e');
						}
						limparEscolha();
					}
				},100);
				break;
				
			case "ARMA":
				escreveLog('Selecione o portador...', 'a');
				selecionando.portador = false;
				interval_selecionando = setInterval(function(){
					if(selecionando.portador){
						var jogador = selecionando.portador.jogador;
						var line = selecionando.portador.line;
						var slot = selecionando.portador.slot;
						if(!equiparHeroi(carta, jogador, line, slot)){
							escreveLog('Herói já equipado!', 'e');
						}
						limparEscolha();
					}
				},100);
				break;
			case "MAGIA":
				escreveLog('Selecione o usuário...', 'a');
				selecionando.usuario = false;
				interval_selecionando = setInterval(function(){
					if(selecionando.usuario){
						var usuario_jogador = selecionando.usuario.jogador;
						var usuario_line = selecionando.usuario.line;
						var usuario_slot = selecionando.usuario.slot;
						clearInterval(interval_selecionando);
						usarMagia(carta, usuario_jogador, usuario_line, usuario_slot);
					}
				},100);
				break;
			case "POSTURA":
				escreveLog('Selecione o usuário...', 'a');
				break;
			case "CONSUMIVEL":
				escreveLog('Selecione o usuário...', 'a');
				break;
		}
	}
}

function enviarPraRecarga(jogador, carta){
	removerCartaDaMao(jogador, carta);
	carta.recarga = carta.carta.tempo_recarga;
	jogador.recarga.push(carta);
	
	var createdCard = document.createElement("div");
	createdCard.setAttribute("class", "ingame-carta");
	createdCard.setAttribute("id", carta.div_id);
	createdCard.style.background = "url(img/cards/" + carta.carta.id + ".jpg) no-repeat";		
	createdCard.style.backgroundSize = "100%";
	jogador.divs.recarga.appendChild(createdCard);
}

function cancelarEscolha(){
	escreveLog('Escolha cancelada!', 'e');
	limparEscolha();
}

function limparEscolha(){
	jogo.estado = gameStatus.JOGANDO;
	clearInterval(interval_selecionando);
	selecionando.portador = null;
	selecionando.usuario = null;
	selecionando.alvo = null;
	selecionando.line = null;	
	selecionando.opcao = null;	
	selecionando.baralho = null;
	
	escondeAtkMove();
}


// *************************** ANIMATIONS ******************
function drawMagicDamage(dano, alvo){
	var drawnEff = document.createElement("div");
	drawnEff.style.position = "absolute";
	drawnEff.style.width = "78px";
	drawnEff.style.height = "78px";
	drawnEff.style.zIndex = 75;
	
	var local = document.getElementById(alvo.id_div);
	var parent = local.parentElement;
	var x = local.offsetLeft + parent.offsetLeft + 31 - 39;
	var y = local.offsetTop + parent.offsetTop + 44 - 39;
	
	if(local.parentElement.id == "backline-oponente" || local.parentElement.id == "frontline-oponente"){
		x += (60);
	}
	
	drawnEff.style.left = x + "px";
	drawnEff.style.top = y + "px";
	
	console.log(local.parentElement.id);	
	
	document.getElementById('game-container').appendChild(drawnEff);
	drawDamageTaken(dano, x, y);
	
	for(var i = 0; i <= 8; i++){
		(function(j){
			setTimeout(function(){
				if(j < 8){
					drawnEff.style.background = "url(img/jogo/sprites/m-damage" + j + ".png) no-repeat";
					drawnEff.style.backgroundSize = "100%";
				} else {
					drawnEff.remove();
				}
			},j * 100);
		}(i));
	}
}

function drawPhysicalDamage(dano, alvo){
	var drawnEff = document.createElement("div");
	drawnEff.style.position = "absolute";
	drawnEff.style.width = "78px";
	drawnEff.style.height = "78px";
	drawnEff.style.zIndex = 75;
	
	var local = document.getElementById(alvo.id_div);
	var parent = local.parentElement;
	var x = local.offsetLeft + parent.offsetLeft + 31 - 39;
	var y = local.offsetTop + parent.offsetTop + 44 - 39;
	
	if(local.parentElement.id == "backline-oponente" || local.parentElement.id == "frontline-oponente"){
		x += (60);
	}
	
	drawnEff.style.left = x + "px";
	drawnEff.style.top = y + "px";
	
	document.getElementById('game-container').appendChild(drawnEff);
	drawDamageTaken(dano, x, y);
	
	for(var i = 0; i <= 6; i++){
		(function(j){
			setTimeout(function(){
				if(j < 6){
					drawnEff.style.background = "url(img/jogo/sprites/f-damage" + j + ".png) no-repeat";
					drawnEff.style.backgroundSize = "100%";
				} else {
					drawnEff.remove();
				}
			},j * 125);
		}(i));
	}
}

function drawDamageTaken(dano, x, y){
	var drawnDamageTxt = document.createElement("div");
	drawnDamageTxt.setAttribute("class", "ingame-damage-txt");
	drawnDamageTxt.innerHTML = "-" + dano;
	drawnDamageTxt.style.left = (x + 30) + "px";
	drawnDamageTxt.style.top = (y + 40)  + "px";
	
	document.getElementById('game-container').appendChild(drawnDamageTxt);
	
	setTimeout(function(){
		drawnDamageTxt.style.left = (x + 100) + "px";
		drawnDamageTxt.style.top = (y - 20)  + "px";
		setTimeout(function(){
			drawnDamageTxt.remove();
		},1100);
	}, 0);
	
}
