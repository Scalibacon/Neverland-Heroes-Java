function startVsIa(){
	$.ajax({
		url : 'buscaBaralhoServlet',
		type : 'post',
		success : function(data) {
			var jogador = JSON.parse(data);			
			jogo.jogador1.jogador = jogador.jogador;
			jogo.jogador1.efeitos = [];
			jogo.jogador1.estado = null;
			jogo.jogador1.baralho = {campeao : atribuiValores(jogador.campeao), cartas : shuffle(separaCartas(jogador.cartas))};
			jogo.jogador1.divs = {mao : null, front : null, back : null, recarga : null, descarte : null, deck : null};
			
			jogo.jogador2.jogador = oponente;
			jogo.jogador2.efeitos = [];
			jogo.jogador2.estado = null;
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
	jogo.jogador1.estado = game_status.ESPERANDO;
	jogo.jogador2.estado = game_status.ESPERANDO;
	
	var delay = 500;	
	
	escolhePrimeiroJogador(isVsIA);
	
	puxarCartasIniciais(jogo.jogador1);
	puxarCartasIniciais(jogo.jogador2);
	
	setTimeout(function(){
		iniciaTurno(jogo.iniciante);		
	}, 1000 + 200);	
	
	if(jogo.iniciante == jogo.jogador1.jogador.id){
		jogo.jogador1.estado = game_status.JOGANDO;
	} else {
		jogo.jogador1.estado = game_status.OBSERVANDO;	
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
	if(jogador == jogo.jogador1){
		jogo.jogador1.estado = game_status.JOGANDO;	
		jogo.jogador2.estado = game_status.OBSERVANDO;	
	} else {
		jogo.jogador1.estado = game_status.OBSERVANDO;
		jogo.jogador2.estado = game_status.JOGANDO;	
	}
	
	if(jogo.turno == 0){
		chamarCampeao(jogador);
	} else 
	if(jogo.iniciante == jogador){
			jogo.turno++;
	}
	
	//reseta efeitos no começo do turno
	for(var i = 0; i < 3; i++){
		if(jogador.campo.front[i] != null){
			var heroi = jogador.campo.front[i];
			heroi.usouMagia = false;
			heroi.ataques_disponiveis = 1;
			heroi.foiAtacado = 0;
			heroi.usouMagia = 0;
			recarregaMovimento(heroi);
		}
		if(jogador.campo.back[i] != null){
			
		}
	}
	
	//reduz a recarga em 1
	for(var i = 0; i < jogador.recarga.length; i++){
		reduzirRecarga(jogador, jogador.recarga[i]);
	}
}

function reduzirRecarga(jogador, carta){
	carta.recarga--;
	if(recarga <= 0){
		//tira da recarga e retorna pra mão
	}
}

function desarmarHeroi(heroi){
	heroi.arma = null;
	heroi.arma_buff = {forca : 0, poder : 0, defesa : 0, resistencia : 0, critico : 0, esquiva : 0};
}

function finalizaTurno(jogador){
	//reseta efeitos no final do turno
	for(var i = 0; i < 3; i++){
		if(jogador.campo.front[i] != null){
			var heroi = jogador.campo.front[i];
			heroi.efeitos[18] = null;
			heroi.efeitos[30] = null;
			heroi.efeitos[58] = null;
			
			switch (heroi.carta.id){
				case 45:
					if(heroi.arma != null && heroi.arma.carta.tipo_arma == "ESPADA"){
						console.log("Cura geral");
					}
				break;
				
			}
			
		}
		if(jogador.campo.back[i] != null){
			
		}
	}
	jogador.estado == game_status.OBSERVANDO;
}

function foiDerrotado(usuario, alvo){
	
}

function passarTurno(){
	if(jogo.jogador1.estado = game_status.JOGANDO){
		//alert('passou o turno');
		finalizaTurno(jogo.jogador1);
	}
}

function desistir(){
	if(jogo.jogador1.estado = game_status.JOGANDO){
		alert("desistiu!");
	}
}

function destruirHeroi(jogador, line, slot){
	
}

function atacar(jogador, line, slot){
	if(line == "front"){
		var atacante = jogador.campo.front[slot];
	} else {
		var atacante = jogador.campo.back[slot];
	}
	jogo.jogador1.estado = game_status.ESCOLHENDO;	
	escreveLog('Selecione o alvo do ataque...', 'a');
	selecionando.alvo = false;
	interval_selecionando = setInterval(function(){
		if(selecionando.alvo){
			if(selecionando.alvo.line == "front"){
				var alvo = selecionando.alvo.jogador.campo.front[selecionando.alvo.slot];
			} else {
				var alvo = selecionando.alvo.jogador.campo.back[selecionando.alvo.slot];
			}
			
			//Validar ataque
			var podeAtacar = true;
			if(line == "front"){
				//validar efeitos depois
				if(selecionando.alvo.line == "back"){
					console.log(atacante);
					if(atacante.arma == null || atacante.arma.carta.tipo_arma != "ARCO"){
						escreveLog('O alvo está muito distante!', 'e');
						podeAtacar = false;
					}
				}
			} else {
				if(selecionando.alvo.line == "front"){
					if(atacante.arma == null || atacante.arma.carta.tipo_arma != "ARCO"){
						escreveLog('O alvo está muito distante!', 'e');
						podeAtacar = false;
					}
				} else {
					escreveLog('O alvo está muito distante!', 'e');
					podeAtacar = false;
				}
			}
			
			if(podeAtacar){
				escreveLog(alvo.carta.nome + " foi atacado por ", + alvo.carta.nome + 'a');
				efeitoAtaque(jogador, line, slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
				atacante.ataques_disponiveis--;
			}
			limparEscolha();
		}
	},100);	
}

function usarMagia(magia, usuario_jogador, usuario_line, usuario_slot){
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


