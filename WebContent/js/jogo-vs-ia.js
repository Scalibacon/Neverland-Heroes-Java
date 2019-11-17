function startVsIa(){
	$.ajax({
		url : 'buscaBaralhoServlet',
		type : 'post',
		success : function(data) {
			var jogador = JSON.parse(data);			
			jogo.jogador1.jogador = jogador.jogador;			
			jogo.jogador1.baralho = {campeao : atribuiValores(jogador.campeao), cartas : shuffle(separaCartas(jogador.cartas))};
			jogo.jogador1.divs = {mao : null, front : null, back : null, recarga : null, descarte : null, deck : null};
			
			jogo.jogador2.jogador = oponente;
			jogo.jogador2.baralho = {campeao : atribuiValores(oponente.baralho.campeao), cartas : shuffle(separaCartas(oponente.baralho.cartas))};
			jogo.jogador2.divs = {mao : null, front : null, back : null, recarga : null, descarte : null, deck : null};
			
			jogo.tipo = 0;
			jogo.iniciante = jogador.jogador.id;
			carregaTelaInicial(true);
		},
		error : function() {
			alert('Erro ao pegar as suas cartas');
		}
	});	
}

function shuffle(cartas) {
	var indexAtual = cartas.length, aux, indexAleatorio;
	
	while (indexAtual !== 0) {
	    indexAleatorio = Math.floor(Math.random() * indexAtual);
	    indexAtual -= 1;
	    
	    aux = cartas[indexAtual];
	    cartas[indexAtual] = cartas[indexAleatorio];
	    cartas[indexAleatorio] = aux;
	}
	return cartas;
}

//*************** pseudo interfaces *************

function startGame(isVsIA){	
	jogo.estado = gameStatus.ESPERANDO;
	
	var delay = 500;	
	
	escolhePrimeiroJogador(isVsIA);
	
	puxarCartasIniciais(jogo.jogador1);
	puxarCartasIniciais(jogo.jogador2);
	
	setTimeout(function(){
		iniciaTurno(jogo.iniciante);		
	}, 1000 + 200);	
	
	if(jogo.iniciante == jogo.jogador1.jogador.id){
		jogo.estado = gameStatus.JOGANDO;
	} else {
		jogo.estado = gameStatus.OBSERVANDO;	
}

function iniciaTurno(jogador){
	if(jogador == jogo.jogador1){
		jogo.estado = gameStatus.JOGANDO;		
	} else {
		jogo.estado = gameStatus.OBSERVANDO;
	}
	
	if(jogo.turno == 0){
		chamarCampeao(jogador);
	}
}
	
function escolhePrimeiroJogador(isVsIA){
	if(isVsIA){
		if(jogo.jogador1.baralho.campeao.carta.rank > jogo.jogador2.baralho.campeao.carta.rank){
			jogo.iniciante = jogo.jogador1;
		} else 
		if(jogo.jogador2.baralho.campeao.carta.rank > jogo.jogador1.baralho.campeao.carta.rank){
			jogo.iniciante = jogo.jogador2;
		} else 
		if(jogo.jogador1.jogador.nivel < jogo.jogador2.jogador.nivel){
			jogo.iniciante = jogo.jogador1;
		} else {
			jogo.iniciante = jogo.jogador2;
		}
	} else {
		alert('contra jogador :(');
	}
}

function puxarCartasIniciais(jogador){
	for(var i = 0; i < 5; i++){
		setTimeout(function(){
			delay = puxarCarta(jogador);
		}, i * 200);
	}};
	return 800;
}

function puxarCarta(jogador){
	if(jogador.baralho.cartas.length > 0){
		var delay;
		var aux;	
		
		aux = jogador.baralho.cartas[0];
		jogador.mao.push(aux);
		jogador.baralho.cartas.splice(0,1);
		
		delay = drawPuxarCarta(jogador, aux);
		return delay;
	}
	return 0;
}

function chamarCampeao(jogador){	
	chamarHeroi(jogador, jogador.baralho.campeao, "front", true);
}

function chamarHeroi(jogador, heroi, line, isTheChampion){
	var slot = setarHeroiNoSlot(jogador, heroi, line);
	if(slot > -1){
		drawPosicionarHeroi(jogador, heroi, line, slot);
		if(!isTheChampion){
			removerCartaDaMao(jogador, heroi);
		}
		efeitoDeInvocacao(heroi);
		return true;
	}
	return false;		
}

function removerCartaDaMao(jogador, carta){
	for(var i = 0; i < jogador.mao.length; i++){
		if(jogador.mao[i] == carta){
			var remove = document.getElementById(carta.id_div);			
			jogador.mao.splice(i, 1);
			remove.remove();
			jogador.divs.mao.style.width = (jogador.mao.length * 67) + "px";
		}
	}
}

function setarHeroiNoSlot(jogador, heroi, line){
	var slot = -1;
	if(line == "front"){
		if(jogador.campo.front[1] == null || jogador.campo.front[1] == undefined){
			jogador.campo.front[1] = heroi;
			slot = 1;
		} else if(jogador.campo.front[2] == null || jogador.campo.front[2] == undefined){
			jogador.campo.front[2] = heroi;
			slot = 2;
		} else if(jogador.campo.front[0] == null || jogador.campo.front[0] == undefined){
			jogador.campo.front[0] = heroi;
			slot = 0;
		}
	} else {
		if(jogador.campo.back[1] == null || jogador.campo.back[1] == undefined){
			jogador.campo.back[1] = heroi;
			slot = 1;
		} else if(jogador.campo.back[2] == null || jogador.campo.back[2] == undefined){
			jogador.campo.back[2] = heroi;
			slot = 2;
		} else if(jogador.campo.back[0] == null || jogador.campo.back[0] == undefined){
			jogador.campo.back[0] = heroi;
			slot = 0;
		}
	}
			
	return slot;	
}

function moverHeroi(jogador, line, slot){
	if(line == "front"){				
		var carta = jogador.campo.front[slot];				
		var newLine = "back";
		var newSlot = setarHeroiNoSlot(jogador, carta, newLine);
		if(newSlot > -1){
			var card_div = document.getElementById(carta.id_div);
			jogador.campo.front[slot] = null;
			card_div.remove();				
			drawPosicionarHeroi(jogador, carta, newLine, newSlot);
			carta.movimentos_disponiveis--;
			limparEscolha();
		}
	} else {
		var carta = jogador.campo.back[slot];	
		var newLine = "front";
		var newSlot = setarHeroiNoSlot(jogador, carta, newLine);
		if(newSlot > -1){
			var card_div = document.getElementById(carta.id_div);
			jogador.campo.back[slot] = null;
			card_div.remove();				
			drawPosicionarHeroi(jogador, carta, newLine, newSlot);
			carta.movimentos_disponiveis--;
			limparEscolha();
		}
	}	
	
}

function equiparHeroi(arma, jogador, line, slot){
	if(line == "front"){
		var heroi = jogador.campo.front[slot];
	} else {
		var heroi = jogador.campo.back[slot];
	}
	if(heroi.arma == null){
		heroi.arma = arma;
		efeitoAoEquipar(heroi);
		removerCartaDaMao(jogador, arma);
		drawArma(jogador, line, slot);
		return true;
	} else {
		return false;
	}	
}

function iniciaTurno(jogador){
	for(var i = 0; i < jogador.campo.front.length; i++){
		jogador.campo.front[i].usouMagia = false;
		jogador.campo.front[i].ataques_disponiveis = 1;
		recarregaMovimento(jogador.campo.front[i]);
		//reseta efeitos
	}
}

function foiDerrotado(usuario, alvo){
	
}

function passarTurno(){
	if(jogo.estado = gameStatus.JOGANDO){
		alert('passou o turno');
	}
}

function desistir(){
	if(jogo.estado = gameStatus.JOGANDO){
		alert("desistiu!");
	}
}

function destruirHeroi(){
	
}

function usarMagia(magia, usuario_jogador, usuario_line, usuario_slot){
	console.log(usuario_jogador);
	if(usuario_line == "front"){
		var usuario = usuario_jogador.campo.front[usuario_slot];
	} else {
		var usuario = usuario_jogador.campo.back[usuario_slot];
	}
	
	if(buscaAtributo(usuario,"MANA") >= magia.carta.custo){
		if(usuario.carta.afinidade == magia.carta.afinidade || magia.carta.afinidade == "NEUTRO"){
			efeitoMagia(magia, usuario_jogador, usuario_line, usuario_slot);
		} else {
			escreveLog('Afinidades divergentes!', 'e');
			limparEscolha();
		}		
	} else {
		escreveLog('Mana Insuficiente!', 'e');
		limparEscolha();
	}
}

function alvoMagiaValido(magia, usuario, alvo){
	return true;
}

function usarPostura(){
	
}

function usarConsumivel(){
	
}

function atacar(){
	
}

function retornarPraMao(){
	
}


