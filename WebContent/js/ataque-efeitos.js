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
		if(alvo.efeitos[96] == true){
			causarDanoVerdadeiro(1, alvo_jogador, alvo_line, alvo_slot, atacante_jogador, atacante_line, atacante_slot);
		}
		
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