function efeitoDeInvocacao(jogador, line, slot){
	var heroi = retornaCarta(jogador, line, slot);
	
	switch(heroi.carta.id){
		case 1:
			puxarCarta(jogador);
			setTimeout(function(){puxarCarta(jogador)},200);
		break;
		case 45:
			console.log("Adicione uma espada do deck pra mão");
			buscarNoDeck("ARMA", "ESPADA");
		break;
	}
}

function efeitoAoEquipar(jogador, line, slot){
	var arma_buff = {forca : 0, poder : 0, defesa : 0, resistencia : 0, critico : 0, esquiva : 0};
	var heroi = retornaCarta(jogador, line, slot);
	var arma = heroi.arma;
	
	switch(arma.carta.id){
		case 54:
			arma_buff.forca += 2 + checaPericia(heroi);
			arma_buff.poder += 2 + checaPericia(heroi);
			arma_buff.resistencia += 1 + checaPericia(heroi);
			arma_buff.esquiva += 1 + checaPericia(heroi);
		break;
	}
	
	heroi.arma_buff = arma_buff;
}

function checaPericia(heroi){
	var arma = heroi.arma;
	if(heroi.carta.pericia == arma.carta.tipo_arma){
		return heroi.carta.ganho_pericia;
	}
	return 0;
}

function buscaFieldAlter(carta, atributo){
	var valor = 0;
	
	return valor;
}

function efeitoAtaque(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot){
	var atacante = retornaCarta(atacante_jogador, atacante_line, atacante_slot);
	var alvo = retornaCarta(alvo_jogador, alvo_line, alvo_slot);	
	
	var danoF = buscaAtributo(atacante_jogador, atacante_line, atacante_slot, "FOR");
	var foiCritico = critar(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
	var foiDesviado = desviar(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
	
	switch(atacante.carta.id){
	
	}
	
	switch(alvo.carta.id){
	
	}
	
	if(!foiDesviado){
		if(foiCritico){ //efeitos de crítico
			danoF = danoF * 2;
			escreveLog("O ataque foi um acerto crítico!", "a");
			switch(atacante.carta.id){
				case 5:
					puxarCarta(atacante_jogador);
					puxarCarta(atacante_jogador);
				break;
				case 42:
					//Broadcast
					var prot = 2;
					for(var i = 0; i < 3; i++){
						(function(j){
							if(atacante_jogador.campo.front[j] != null){
								buffar(prot, "PROT", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "front", j);
							}
						}(i));
					}
					for(var i = 0; i < 3; i++){
						(function(j){
							if(atacante_jogador.campo.back[j] != null){
								buffar(prot, "PROT", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "back", j);
							}
						}(i));
					}
				break;
			}
		}
		causarDanoFisico(danoF, atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);		
	} else {
		escreveLog("O ataque foi esquivado!", "a");
	}
	
}

function desviar(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot){
	var atacante = retornaCarta(atacante_jogador, atacante_line, atacante_slot);
	var alvo = retornaCarta(alvo_jogador, alvo_line, alvo_slot);
	
	if(alvo_jogador.efeitos[17] == true){ //gravidade zero
		return false;
	} else 
	if(atacante.carta.id == 28 && atacante.efeitos[54] != true){ //yarne
		return false;
	}
	
	var desv_index = Math.floor(Math.random() * 20) + 1;
	if(desv_index <= buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "ESQ")){
		return true;
	} else {
		return false;
	}
}

function critar(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot){
	var atacante = retornaCarta(atacante_jogador, atacante_line, atacante_slot);
	var alvo = retornaCarta(alvo_jogador, alvo_line, alvo_slot);
	
	var crit_index = Math.floor(Math.random() * 20) + 1;
	if(crit_index <= buscaAtributo(atacante_jogador, atacante_line, atacante_slot, "CRIT")){
		return true;
	} else {
		return false;
	}
}

function efeitoMagia(magia, usuario_jogador, usuario_line, usuario_slot){
	var usuario = retornaCarta(usuario_jogador, usuario_line, usuario_slot);	
	
	if(usuario.efeitos[18] == true){
		escreveLog('Herói silenciado!', 'e');
		limparEscolha();
		return;
	}
	
	switch(magia.carta.id){
		case 12: //Bola de fogo
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var danoM = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");						
						pagarMana(magia, usuario);
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
													
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
			
		case 13: //rajada de vento
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						if(alvo.arma != null){
							var arma = JSON.parse(JSON.stringify(alvo.arma));
							document.getElementById(arma.id_div).remove();
							alvo.arma = null;
							drawBuff(1, alvo, "ARMA", false);
							selecionando.alvo.jogador.mao.push(arma);
							drawPuxarCarta(usuario_jogador, arma);
						}
						pagarMana(magia, usuario);													
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
			
		case 14: //fluxo de energia
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			var cura = 2;
			var restauracao = 1;
			for(var i = 0; i < 3; i++){
				(function(j){
					if(usuario_jogador.campo.front[j] != null){
						buffar(cura, "HP", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "front", j);
						setTimeout(function(){
							buffar(restauracao, "MANA", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "front", j);
						},500);
					}
				}(i));
			}
			for(var i = 0; i < 3; i++){
				(function(j){
					if(usuario_jogador.campo.back[j] != null){
						buffar(cura, "HP", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "back", j);
						setTimeout(function(){
							buffar(restauracao, "MANA", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "back", j);
						},500);
					}
				}(i));
			}
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
			
		case 15: //luz revigoradora
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var cura = 3;						
						pagarMana(magia, usuario);
						buffar(cura, "HP", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
													
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
			
		case 16: //Portal de um mundo paralelo
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			drawBuff(1, usuario, "CARTA", true);
			puxarCarta(usuario_jogador);
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
			
		case 17: //Gravidade zero
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			drawBuff(10, usuario, "GRAVIDADE", false);
			jogo.jogador2.efeitos[17] = true;
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
			
		case 18: //círculo de silêncio
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						alvo.efeitos[18] = true;
						drawBuff(1, alvo, "SILÊNCIO", false);
						pagarMana(magia, usuario);					
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;	
			
		case 19: //Barreira arcana
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			buffar(usuario.carta.poder, "PROT", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot);
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
			
		case 30: //prisão de vinhas
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						alvo.efeitos[30] = true;	
						drawBuff(1, alvo, "ATAQUE", false);
						pagarMana(magia, usuario);					
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
		
		case 31: //erupção cristalina
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var danoM = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");						
						pagarMana(magia, usuario);
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);			
						buffar(-1, "ESQ", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);				
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
			break;
	}
}

function pagarMana(magia, usuario){
	usuario.carta.mana_gasta += magia.carta.custo;
	drawManaPay(magia.carta.custo, usuario);
}

function causarDanoFisico(dano, usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot){
	if(usuario_line == "front"){
		var usuario = usuario_jogador.campo.front[usuario_slot];
	} else {
		var usuario = usuario_jogador.campo.back[usuario_slot];
	}
	
	if(alvo_line == "front"){
		var alvo = alvo_jogador.campo.front[alvo_slot];
	} else {
		var alvo = alvo_jogador.campo.back[alvo_slot];
	}
	
	if(alvo.carta.protecao > 0){
		var aux = JSON.parse(JSON.stringify(alvo.carta.protecao));
		alvo.carta.protecao -= dano;
		if(alvo.carta.protecao <= 0){
			alvo.carta.protecao = 0;
			drawDamageProtTaken(aux, alvo);
		} else {
			drawDamageProtTaken(dano, alvo);
		}		
		dano -= aux;
	}
	
	dano_em_si = dano - buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "DEF");
	if(dano_em_si <= 0){
		dano_em_si = 0;
	}
	alvo.carta.dano_recebido += dano_em_si;
	escreveLog(alvo.carta.nome + " recebeu dano físico = " + dano_em_si, "a");
	drawPhysicalDamage(dano_em_si, usuario, alvo);
	
	if(buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "HP") <= 0){
		setTimeout(function(){
			destruirHeroi(alvo_jogador, alvo_line, alvo_slot);
		}, 1277);		
	}
	
	if(dano_em_si > 0){
		return true;
	} else {
		return false;
	}	
}

function causarDanoMagico(dano, usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot){
	if(usuario_line == "front"){
		var usuario = usuario_jogador.campo.front[usuario_slot];
	} else {
		var usuario = usuario_jogador.campo.back[usuario_slot];
	}
	
	if(alvo_line == "front"){
		var alvo = alvo_jogador.campo.front[alvo_slot];
	} else {
		var alvo = alvo_jogador.campo.back[alvo_slot];
	}
	
	if(alvo.carta.protecao > 0){
		var aux = JSON.parse(JSON.stringify(alvo.carta.protecao));
		alvo.carta.protecao -= dano;
		if(alvo.carta.protecao <= 0){
			alvo.carta.protecao = 0;
			drawDamageProtTaken(aux, alvo);
		} else {
			drawDamageProtTaken(dano, alvo);
		}		
		dano -= aux;
	}
	
	dano_em_si = dano - buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "RES");
	if(dano_em_si <= 0){
		dano_em_si = 0;
	}
	alvo.carta.dano_recebido += dano_em_si;
	escreveLog(alvo.carta.nome + " recebeu dano mágico = " + dano_em_si, "a");
	drawMagicDamage(dano_em_si, usuario, alvo);
	
	if(buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "HP") <= 0){
		setTimeout(function(){
			destruirHeroi(alvo_jogador, alvo_line, alvo_slot);
		}, 1277);	
	}
	
	if(dano_em_si > 0){
		return true;
	} else {
		return false;
	}	
}

function causarDanoVerdadeiro(dano, usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot){
	if(usuario_line == "front"){
		var usuario = usuario_jogador.campo.front[usuario_slot];
	} else {
		var usuario = usuario_jogador.campo.back[usuario_slot];
	}
	
	if(alvo_line == "front"){
		var alvo = alvo_jogador.campo.front[alvo_slot];
	} else {
		var alvo = alvo_jogador.campo.back[alvo_slot];
	}
	
	if(alvo.carta.protecao > 0){
		var aux = JSON.parse(JSON.stringify(alvo.carta.protecao));
		alvo.carta.protecao -= dano;
		if(alvo.carta.protecao <= 0){
			alvo.carta.protecao = 0;
			drawDamageProtTaken(aux, alvo);
		} else {
			drawDamageProtTaken(dano, alvo);
		}		
		dano -= aux;
	}
	
	dano_em_si = dano;
	if(dano_em_si <= 0){
		dano_em_si = 0;
	}
	alvo.carta.dano_recebido += dano_em_si;
	escreveLog(alvo.carta.nome + " recebeu dano verdadeiro = " + dano_em_si, "a");
	drawTrueDamage(dano_em_si, usuario, alvo);
	
	if(buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "HP") <= 0){
		setTimeout(function(){			
			destruirHeroi(alvo_jogador, alvo_line, alvo_slot);			
		}, 1277);	
	}
	
	if(dano_em_si > 0){
		return true;
	} else {
		return false;
	}	
}

function buffar(quantidade, atributo, usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot){
	if(usuario_line == "front"){
		var usuario = usuario_jogador.campo.front[usuario_slot];
	} else {
		var usuario = usuario_jogador.campo.back[usuario_slot];
	}
	
	if(alvo_line == "front"){
		var alvo = alvo_jogador.campo.front[alvo_slot];
	} else {
		var alvo = alvo_jogador.campo.back[alvo_slot];
	}
	
	var valor;
	switch(atributo){
		case "HP":			
			aux = JSON.parse(JSON.stringify(alvo.carta.dano_recebido));
			alvo.carta.dano_recebido -= quantidade;
			if(alvo.carta.dano_recebido < 0){
				alvo.carta.dano_recebido = 0;
				quantidade = aux;
			}
			break;
		case "MANA":			
			aux = JSON.parse(JSON.stringify(alvo.carta.mana_gasta));
			alvo.carta.mana_gasta -= quantidade;
			if(alvo.carta.mana_gasta < 0){
				alvo.carta.mana_gasta = 0;
				quantidade = aux;
			}
			break;
		case "PROT":
			alvo.carta.protecao += quantidade;
			break;
		case "FOR":
			alvo.carta.forca += quantidade;
			break;
		case "POD":
			alvo.carta.poder += quantidade;
			break;
		case "DEF":
			alvo.carta.defesa += quantidade;
			break;
		case "RES":
			alvo.carta.resistencia += quantidade;
			break;
		case "CRIT":
			alvo.carta.critico += quantidade;
			break;
		case "ESQ":
			alvo.carta.esquiva += quantidade;
			break;
	}
	
	if(quantidade >= 0){
		drawBuff(quantidade, alvo, atributo, true);
	} else {
		drawBuff(quantidade, alvo, atributo, false);
	}
}