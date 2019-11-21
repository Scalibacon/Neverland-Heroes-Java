function efeitoDeInvocacao(heroi){
	switch(heroi.carta.id){
		case 45:
			console.log("Adicione uma espada do deck pra mão");
			buscarNoDeck("ARMA", "ESPADA");
	}
}

function efeitoAoEquipar(heroi){
	var arma_buff = {forca : 0, poder : 0, defesa : 0, resistencia : 0, critico : 0, esquiva : 0};
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
	if(atacante_line == "front"){
		var atacante = atacante_jogador.campo.front[atacante_slot];
	} else {
		var atacante = atacante_jogador.campo.back[atacante_slot];
	}
	
	if(alvo_line == "front"){
		var alvo = alvo_jogador.campo.front[alvo_slot];
	} else {
		var alvo = alvo_jogador.campo.back[alvo_slot];
	}
	
	var danoF = buscaAtributo(atacante_jogador, atacante_line, atacante_slot, "FOR");
	
	switch(atacante.carta.id){
	
	}
	
	switch(alvo.carta.id){
	
	}
	
	causarDanoFisico(danoF, atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
	
}

function efeitoMagia(magia, usuario_jogador, usuario_line, usuario_slot){
	if(usuario_line == "front"){
		var usuario = usuario_jogador.campo.front[usuario_slot];
	} else {
		var usuario = usuario_jogador.campo.back[usuario_slot];
	}
	
	switch(magia.carta.id){
		case 12: //Bola de fogo
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						if(selecionando.alvo.line == "front"){
							var alvo = selecionando.alvo.jogador.campo.front[selecionando.alvo.slot];
						} else {
							var alvo = selecionando.alvo.jogador.campo.back[selecionando.alvo.slot];
						}
						
						var danoM = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");
						
						pagarMana(magia, usuario);
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
													
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
			break;
			
		case 15: //luz revigoradora
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						if(selecionando.alvo.line == "front"){
							var alvo = selecionando.alvo.jogador.campo.front[selecionando.alvo.slot];
						} else {
							var alvo = selecionando.alvo.jogador.campo.back[selecionando.alvo.slot];
						}
						
						var cura = 3;
						
						pagarMana(magia, usuario);
						curar(cura, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
													
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
			break;
			
		case 16: //Portal de um mundo paralelo
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			puxarCarta(usuario_jogador);
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
			break;
			
		case 19: //Barreira arcana
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			buffar(usuario.carta.poder, "PROT", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot);
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
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

function curar(cura, usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot){
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
	
	aux = JSON.parse(JSON.stringify(alvo.carta.dano_recebido));
	alvo.carta.dano_recebido -= cura;
	if(alvo.carta.dano_recebido < 0){
		alvo.carta.dano_recebido = 0;
		cura = aux;
	}
	
	//efeitos de cura
	
	drawBuff(cura, alvo, "HP", true);	
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