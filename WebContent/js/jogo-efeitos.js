document.write("<script type='text/javascript' src='js/ataque-efeitos.js'></script>");
document.write("<script type='text/javascript' src='js/magia-efeitos.js'></script>");
document.write("<script type='text/javascript' src='js/heroi-efeitos.js'></script>");

function efeitoDeInvocacao(jogador, line, slot){
	var heroi = retornaCarta(jogador, line, slot);
	
	if(heroi.carta.id == 1 && heroi.efeitos[54] != true){ //leanne
		puxarCarta(jogador);
		setTimeout(function(){puxarCarta(jogador)},200);
	} else
	if(heroi.carta.id == 39 && heroi.efeitos[54] != true){ //alm
		console.log("Adicione uma POSTURA do deck pra mão");
		buscarNoDeck("POSTURA", "ALL");
	} else 
	if(heroi.carta.id == 45 && heroi.efeitos[54] != true){ //arthur
		console.log("Adicione uma espada do deck pra mão");
		buscarNoDeck("ARMA", "ESPADA");
	} else
	if(heroi.carta.id == 46 && heroi.efeitos[54] != true){ //berkut
		console.log("Adicione uma lança do deck pra mão");
		buscarNoDeck("ARMA", "LANCA");
	} else
	if(heroi.carta.id == 64 && heroi.efeitos[54] != true){ ///surt
		console.log("Adicione um machado do deck pra mão");
		buscarNoDeck("ARMA", "MACHADO");
	}
}

function efeitoAoEquipar(jogador, line, slot){
	var arma_buff = {forca : 0, poder : 0, defesa : 0, resistencia : 0, critico : 0, esquiva : 0};
	var heroi = retornaCarta(jogador, line, slot);
	var arma = heroi.arma;
	
	switch(arma.carta.id){
		case 7:
			arma_buff.forca += 2 + checaPericia(heroi);
			arma_buff.defesa += 1 + checaPericia(heroi);
		break;
		
		case 8:
			arma_buff.forca += 1 + checaPericia(heroi);
			arma_buff.critico += 2 + checaPericia(heroi);
		break;
		
		case 9:
			arma_buff.forca += 2 + checaPericia(heroi);
			arma_buff.defesa += 1 + checaPericia(heroi);
		break;
		
		case 10:
			arma_buff.poder += 1 + checaPericia(heroi);
			arma_buff.defesa += 1 + checaPericia(heroi);
			arma_buff.resistencia += 1 + checaPericia(heroi);
		break;
		
		case 11:
			arma_buff.poder += 3 + checaPericia(heroi);
			arma_buff.resistencia += 1 + checaPericia(heroi);
		break;
		
		case 32:
			arma_buff.forca += 4 + checaPericia(heroi);
			arma_buff.defesa += 2 + checaPericia(heroi);
			arma_buff.resistencia += 1 + checaPericia(heroi);
		break;
		
		case 49:
			arma_buff.forca += 2 + checaPericia(heroi);
			arma_buff.esquiva += 2 + checaPericia(heroi);
		break;
		
		case 50:
			arma_buff.forca += 3 + checaPericia(heroi);
			arma_buff.esquiva += -1 + checaPericia(heroi);
		break;
		
		case 54:
			arma_buff.forca += 2 + checaPericia(heroi);
			arma_buff.poder += 2 + checaPericia(heroi);
			arma_buff.resistencia += 1 + checaPericia(heroi);
			arma_buff.esquiva += 1 + checaPericia(heroi);
		break;
		
		case 55:
			arma_buff.poder += 1 + checaPericia(heroi);
			arma_buff.defesa += 2 + checaPericia(heroi);
			arma_buff.resistencia += 3 + checaPericia(heroi);
		break;
		
		case 63:
			arma_buff.poder += 5 + checaPericia(heroi);
		break;
		
		case 74:
			arma_buff.forca += 3 + checaPericia(heroi);
			arma_buff.defesa += 1 + checaPericia(heroi);
		break;
		
		case 75:
			arma_buff.forca += 3 + checaPericia(heroi);
			arma_buff.defesa += 1 + checaPericia(heroi);
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
		var pod_alvo = buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "POD");
		destruirHeroi(alvo_jogador, alvo_line, alvo_slot);
		
		if(usuario.carta.id == 40 && usuario.efeitos[54] != true){ //aversa
			buffar(pod_alvo, "POD", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot);
		}
			
	}
	
	return dano_em_si;	
}

function causarDanoMagico(dano, usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot, afinidade){
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
	
	if(alvo.carta.id == 1 && alvo.efeitos[54] != true && afinidade == "TREVAS"){ //Leanne
		dano_em_si = 0;
	}
	
	alvo.carta.dano_recebido += dano_em_si;
	escreveLog(alvo.carta.nome + " recebeu dano mágico = " + dano_em_si, "a");
	drawMagicDamage(dano_em_si, usuario, alvo);
	
	if(buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "HP") <= 0){
		var pod_alvo = buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "POD");
		
		destruirHeroi(alvo_jogador, alvo_line, alvo_slot);
		
		if(usuario.carta.id == 4 && usuario.efeitos[54] != true){ //raigh
			puxarCarta(usuario_jogador); 
			setTimeout(function(){puxarCarta(usuario_jogador);},400);
		} else 
		if(usuario.carta.id == 40 && usuario.efeitos[54] != true){ //aversa
			buffar(pod_alvo, "POD", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot);
		}
	}
	
	return dano_em_si;	
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
		var pod_alvo = buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "POD");	
		destruirHeroi(alvo_jogador, alvo_line, alvo_slot);			
		
		if(usuario.carta.id == 40 && usuario.efeitos[54] != true){ //aversa
			buffar(pod_alvo, "POD", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot);
		}		
	}
	
	return dano_em_si;
}

function buffar(quantidade, atributo, usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot){
	var usuario = retornaCarta(usuario_jogador, usuario_line, usuario_slot);
	var alvo = retornaCarta(alvo_jogador, alvo_line, alvo_slot);
	
	var valor;
	switch(atributo){
		case "HP":			
			aux = JSON.parse(JSON.stringify(alvo.carta.dano_recebido));
			alvo.carta.dano_recebido -= quantidade;
			if(alvo.carta.dano_recebido < 0){
				alvo.carta.dano_recebido = 0;
				quantidade = aux;
			}
			
			if(usuario.carta.id == 1 && usuario.efeitos[54] != true){ //leanne
				var prot = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");
				buffar(prot, "PROT", usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot);
			} else 
			if(usuario.carta.id == 6 && usuario.efeitos[54] != true){ //clarine
				puxarCarta(usuario_jogador);
			} else 
			if(usuario.carta.id == 24 && usuario.efeitos[54] != true){ //genny
				buffar(1, "PROT", usuario_jogador, usuario_line, usuario_slot, alvo_jogador, alvo_line, alvo_slot);
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