function efeitoAtaque(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot){
	var atacante = retornaCarta(atacante_jogador, atacante_line, atacante_slot);
	var alvo = retornaCarta(alvo_jogador, alvo_line, alvo_slot);	
	
	var danoF = buscaAtributo(atacante_jogador, atacante_line, atacante_slot, "FOR");
	var foiCritico = critar(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
	var foiDesviado = desviar(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
	
	if(atacante.carta.id == "?"){
	
	}
	
	if(alvo.carta.id == "?"){
		
	}
	
	if(!foiDesviado){
		if(alvo.efeitos[96] == true){ //magma
			causarDanoVerdadeiro(1, alvo_jogador, alvo_line, alvo_slot, atacante_jogador, atacante_line, atacante_slot);
		}
		if(alvo.carta.id == 27 && alvo.efeitos[54] != true){ //soleil
			puxarCarta(alvo_jogador);
		} else 
		if(alvo.carta.id == 35 && alvo.efeitos[54] != true && atacante.arma != null && atacante.arma.carta.tipo_arma == "ARCO"){ //henry
			danoF = 0;
		}
		
		if(atacante.carta.id == 23 && alvo.arma == null && atacante.efeitos[54] != true){ //flora
			danoF += 2;
		} else 
		if(atacante.carta.id == 33 && atacante.efeitos[54] != true){ //laslow
			if(buscaAtributo(atacante_jogador, atacante_line, atacante_slot, "FOR") < buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "FOR")){
				danoF += 1;
			}
		} else 
		if(atacante.carta.id == 36 && atacante.efeitos[54] != true && atacante.carta.rank < alvo.carta.rank){ //ayra
			danoF += 2;
		} else 
		if(atacante.carta.id == 37 && atacante.efeitos[54] != true && alvo.carta.afinidade == "TREVAS"){ //abel
			danoF += 2;
		}
		
		if(foiCritico){ //efeitos de crítico
			danoF = danoF * 2;
			escreveLog("O ataque foi um acerto crítico!", "a");
			
			if(atacante.carta.id == 5 && atacante.efeitos[54] != true){ //rebecca
				puxarCarta(atacante_jogador);
				puxarCarta(atacante_jogador);
			} else 
			if(atacante.carta.id == 42 && atacante.efeitos[54] != true){ //jeorge
				var prot = 2;
				for(var i = 0; i < 3; i++){
					(function(j){
						if(atacante_jogador.campo.front[j] != null){
							buffar(prot, "PROT", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "front", j);
						}
					}(i));
					(function(j){
						if(atacante_jogador.campo.back[j] != null){
							buffar(prot, "PROT", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "back", j);
						}
					}(i));
				}
			} else 
			if(atacante.carta.id == 21 && atacante.efeitos[54] != true){ //gordin
				for(var i = 0; i < 3; i++){
					(function(j){
						if(atacante_jogador.campo.front[j] != null){
							buffar(3, "HP", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "front", j);
							buffar(1, "CRIT", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "front", j);
						}
					}(i));
					(function(j){
						if(atacante_jogador.campo.back[j] != null){
							buffar(3, "HP", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "back", j);
							buffar(1, "CRIT", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "back", j);
						}
					}(i));
				}
			}	
		}		
		
		var alvo_hp_before = buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "HP");
		var dano_causado = causarDanoFisico(danoF, atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
		
		if(atacante.carta.id == 2 && atacante.efeitos[54] != true){ //donnel
			if(retornaCarta(alvo_jogador, alvo_line, alvo_slot) == null){
				puxarCarta(atacante_jogador); 
				setTimeout(function(){puxarCarta(atacante_jogador);},400);
			}
		} else 
		if(atacante.carta.id == 29 && atacante.efeitos[54] != true){ //ryoma
			if(retornaCarta(alvo_jogador, alvo_line, alvo_slot) == null){
				atacante.ataques_disponiveis += 1;
			}
		} else 
		if(atacante.carta.id == 38 && atacante.efeitos[54] != true && retornaCarta(alvo_jogador, alvo_line, alvo_slot) != null){ //beruka
			buffar(-2, "DEF", atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
		} else
		if(atacante.carta.id == 41 && atacante.efeitos[54] != true && retornaCarta(alvo_jogador, alvo_line, alvo_slot) != null){ //camilla
			if(alvo_hp_before < (alvo.carta.hp/2)){
				drawBuff(-999, alvo, "VIDA", false);
				destruirHeroi(alvo_jogador, alvo_line, alvo_slot);
			}
		} else 
		if(atacante.carta.id == 43 && atacante.efeitos[54] != true){ //charlotte
			buffar(dano_causado, "HP", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, atacante_line, atacante_slot);
		}
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