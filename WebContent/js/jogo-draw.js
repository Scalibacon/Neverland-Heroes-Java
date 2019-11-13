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
	createdVeil.addEventListener("click", function(){ escondeCartona(); });
	var createdBigCard = document.createElement("div");
	createdBigCard.setAttribute("id", "ingame-big-card");
	createdVeil.appendChild(createdBigCard);
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
	createdMao1.appendChild(createdInsideMao);
	document.getElementById('game-container').appendChild(createdMao1);
	
	var createdMao2 = document.createElement("div");
	createdMao2.setAttribute("class", "ingame-hand-container");
	createdMao2.setAttribute("id", "hand-oponente");
	var createdInsideMao2 = document.createElement("div");
	createdInsideMao2.setAttribute("id", "inside-card-hand-oponente");
	createdMao2.appendChild(createdInsideMao2);
	document.getElementById('game-container').appendChild(createdMao2);
	
	//**************************** Lines de heróis **********************************
	var createdBackLine1 = document.createElement("div");
	createdBackLine1.setAttribute("class", "ingame-line");
	createdBackLine1.setAttribute("id", "backline-jogador");
	createdBackLine1.addEventListener("click", function(){ selecionarLine("back") });
	createdBackLine1.addEventListener("mouseover", function(){ destacaLine(createdBackLine1); });
	createdBackLine1.addEventListener("mouseleave", function(){ removeDestaqueLine(createdBackLine1); });
	document.getElementById('game-container').appendChild(createdBackLine1);
	
	var createdFrontLine1 = document.createElement("div");
	createdFrontLine1.setAttribute("class", "ingame-line");
	createdFrontLine1.setAttribute("id", "frontline-jogador");
	createdFrontLine1.addEventListener("click", function(){ selecionarLine("front") });
	createdFrontLine1.addEventListener("mouseover", function(){ destacaLine(createdFrontLine1); });
	createdFrontLine1.addEventListener("mouseleave", function(){ removeDestaqueLine(createdFrontLine1); });
	document.getElementById('game-container').appendChild(createdFrontLine1);
	
	var createdBackLine2 = document.createElement("div");
	createdBackLine2.setAttribute("class", "ingame-line");
	createdBackLine2.setAttribute("id", "backline-oponente");
	document.getElementById('game-container').appendChild(createdBackLine2);
	
	var createdFrontLine2 = document.createElement("div");
	createdFrontLine2.setAttribute("class", "ingame-line");
	createdFrontLine2.setAttribute("id", "frontline-oponente");
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
	document.getElementById('game-container').appendChild(createdDeck1);
	
	var createdDeck2 = document.createElement("div");
	createdDeck2.setAttribute("class", "ingame-deck");
	createdDeck2.setAttribute("id", "deck-oponente");
	createdDeck2.innerHTML = jogo.jogador2.baralho.cartas.length;
	document.getElementById('game-container').appendChild(createdDeck2);
	
	//****************************** Pilha de descarte ************************************
	var createdDescarte1 = document.createElement("div");
	createdDescarte1.setAttribute("class", "ingame-descarte");
	createdDescarte1.setAttribute("id", "descarte-jogador");
	document.getElementById('game-container').appendChild(createdDescarte1);
	
	var createdDescarte2 = document.createElement("div");
	createdDescarte2.setAttribute("class", "ingame-descarte");
	createdDescarte2.setAttribute("id", "descarte-oponente");
	document.getElementById('game-container').appendChild(createdDescarte2);
	
	//****************************** Pilha de recarga ************************************
	var createdRecarga1 = document.createElement("div");
	createdRecarga1.setAttribute("class", "ingame-recarga");
	createdRecarga1.setAttribute("id", "recarga-jogador");
	document.getElementById('game-container').appendChild(createdRecarga1);
	
	var createdRecarga2 = document.createElement("div");
	createdRecarga2.setAttribute("class", "ingame-recarga");
	createdRecarga2.setAttribute("id", "recarga-oponente");
	document.getElementById('game-container').appendChild(createdRecarga2);
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

function escondeCartona(){
	document.getElementById('ingame-veil').style.display = "none";
}
function mostraCartona(carta){
	document.getElementById('ingame-veil').style.display = "block";	
	if(carta.carta == null || carta.carta == undefined){
		document.getElementById('ingame-big-card').style.background = "url(img/cards/" + carta.id + ".jpg) no-repeat";
	} else {		
		document.getElementById('ingame-big-card').style.background = "url(img/cards/" + carta.carta.id + ".jpg) no-repeat";
	}
	document.getElementById('ingame-big-card').style.backgroundSize = "100%";
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
var ctrlDivId = 2;
function drawPuxarCarta(jogador, carta){
	var num_cartas = jogador.mao.length; 
	var createdCard = document.createElement("div");
	carta.id_div = "ingame-card" + carta.carta.id + "-" + ctrlDivId;
	createdCard.setAttribute("id", carta.id_div + "hand");
		
	
	if(jogador == jogo.jogador1){		
		createdCard.setAttribute("class", "ingame-card-hand");
		createdCard.style.background = "url(img/cards/" + carta.carta.id + ".jpg) no-repeat";
		createdCard.style.backgroundSize = "100%";		
		createdCard.addEventListener("click", function(){ selecionarCartaNaMao(carta) });
		createdCard.addEventListener("contextmenu", function(){ mostraCartona(carta); event.preventDefault(); });
		
		document.getElementById('inside-card-hand-jogador').style.width = (num_cartas * 67) + "px";
		document.getElementById('inside-card-hand-jogador').appendChild(createdCard);		
		
	} else {
		createdCard.setAttribute("class", "ingame-card-hand-oponente");		
		
		document.getElementById('inside-card-hand-oponente').style.width = (num_cartas * 67) + "px";
		document.getElementById('inside-card-hand-oponente').appendChild(createdCard);		
	}		
	
	atualizaQtdeDeck(jogador);
	ctrlDivId++;
	return 200;
}

function atualizaQtdeDeck(jogador){
	if(jogador == jogo.jogador1){
		document.getElementById("deck-jogador").innerHTML = jogo.jogador1.baralho.cartas.length;
	} else {
		document.getElementById("deck-oponente").innerHTML = jogo.jogador2.baralho.cartas.length;
	}
}

function drawPosicionarHeroi(jogador, heroi, line, slot){
	if(jogador == jogo.jogador1){
		if(line == "front"){
			var container = document.getElementById('frontline-jogador');
			var x = card_positions.jogador_frontline[slot].x;
			var y = card_positions.jogador_frontline[slot].y;
		} else {
			var container = document.getElementById('backline-jogador');
			var x = card_positions.jogador_backline[slot].x;
			var y = card_positions.jogador_backline[slot].y;
		}
	} else {
		if(line == "front"){
			var container = document.getElementById('frontline-oponente');
			var x = card_positions.oponente_frontline[slot].x;
			var y = card_positions.oponente_frontline[slot].y;
		} else {
			var container = document.getElementById('backline-oponente');
			var x = card_positions.oponente_backline[slot].x;
			var y = card_positions.oponente_backline[slot].y;
		}
	}
	
	if(heroi.arma != null){
		
	}
	
	var createdHeroi = document.createElement("div");
	createdHeroi.setAttribute("class", "ingame-carta");
	createdHeroi.setAttribute("id", heroi.id_div + "field");
	
	if(jogador == jogo.jogador1){
		createdHeroi.setAttribute("class", "ingame-carta");		
	} else {
		createdHeroi.setAttribute("class", "ingame-carta-oponente");
	}	
	
	createdHeroi.style.background = "url(img/cards/" + heroi.carta.id + ".jpg) no-repeat";	
	
	createdHeroi.style.backgroundSize = "100%";	
	createdHeroi.style.left = x + "px";
	createdHeroi.style.top = "1px";
	createdHeroi.addEventListener("contextmenu", function(){ mostraCartona(heroi); event.preventDefault(); });
	createdHeroi.addEventListener("click", function(){ selecionaHeroiEmCampo(jogador, line, slot); });	
	container.appendChild(createdHeroi);	
}

function selecionaHeroiEmCampo(jogador, line, slot){
	if(jogo.estado == gameStatus.ESCOLHENDO){
		alert('teste');
		//do choicing stuff usuario / alvo / portador
	} else {
		jogo.estado = gameStatus.ESCOLHENDO;
		selecionando.opcao = false;			
		mostraAtkMove(line, slot);
		
		document.getElementById('move-btn').addEventListener("click", function(){ moverHeroi(jogador, line, slot); });
		//document.getElementById('move-btn').removeEventListener("mousedown");		
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
		var div_selecionada = document.getElementById(carta.id_div + "hand");
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
				break;
			case "MAGIA":
				escreveLog('Selecione o usuário...', 'a');
				break;
			case "POSTURA":
				escreveLog('Selecione o usuário...', 'a');
				break;
			case "HEROI":
				escreveLog('Selecione o usuário...', 'a');
				break;
		}
	}
}


function selecionarLine(line){
	if(jogo.estado == gameStatus.ESCOLHENDO && selecionando.line == false){
		selecionando.line = line;		
	}
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
	
	escondeCartona();
	escondeAtkMove();
}
