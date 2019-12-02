function efeitoAtaque(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot){
	var atacante = retornaCarta(atacante_jogador, atacante_line, atacante_slot);
	var alvo = retornaCarta(alvo_jogador, alvo_line, alvo_slot);	
	
	if(alvo.carta.id == 52 && alvo.efeitos[54] != true && alvo.foiAtacado > 0){ //jakob
		escreveLog('Alvo inválido para atacar!', 'e');
		return false;
	}
	
	if(atacante.carta.id == 104 && atacante.efeitos[54] != true && atacante.usouMagia > 0){ //reyson
		var danoF = buscaAtributo(atacante_jogador, atacante_line, atacante_slot, "POD");
	} else {
		var danoF = buscaAtributo(atacante_jogador, atacante_line, atacante_slot, "FOR");
	}
	var foiCritico = critar(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
	var foiDesviado = desviar(atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
	
	if(atacante.carta.id == 72 && atacante.efeitos[54] != true){ //hawkeye
		atacante.carta.critico += 2;
	}
	
	if(atacante.arma != null && atacante.arma.carta.id == 50){ //petro
		buffar(1, "DEF", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, atacante_line, atacante_slot);
	} else 
	if(atacante.arma != null && atacante.arma.carta.id == 79){ //caliburn
		puxarCarta(atacante_jogador);
	} else 
	if(atacante.arma != null && atacante.arma.carta.id == 88){ //sapphir
		alvo.efeitos[18] = true;
		drawBuff(1, alvo, "SILÊNCIO", false);
	}
	
	escreveLog(alvo.carta.nome + " foi atacado por " + atacante.carta.nome, 'a');
	
	atacante.ataques_disponiveis--;
	
	if(!foiDesviado){
		alvo.foiAtacado++;
		
		//alvo magia
		if(alvo.efeitos[96] == true){ //magma
			causarDanoVerdadeiro(1, alvo_jogador, alvo_line, alvo_slot, atacante_jogador, atacante_line, atacante_slot);
		}
		
		//alvo atacado
		if(alvo.carta.id == 27 && alvo.efeitos[54] != true){ //soleil
			puxarCarta(alvo_jogador);
		} else 
		if(alvo.carta.id == 35 && alvo.efeitos[54] != true && atacante.arma != null && atacante.arma.carta.tipo_arma == "ARCO"){ //henry
			danoF = 0;
		}
		
		//atacante
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
		} else 
		if(atacante.carta.id == 53 && atacante.efeitos[54] != true){ //jaffar
			danoF += alvo.carta.rank;
		} else 
		if(atacante.carta.id == 61 && atacante.efeitos[54] != true){ //reinhardt
			if(alvo.arma != null && alvo.arma.carta.tipo_arma == "LANCA"){
				danoF += 2;
			}
		} else 
		if(atacante.carta.id == 66 && atacante.efeitos[54] != true && alvo.carta.afinidade == "LUZ"){ //corrin
			danoF += 2;
			for(var i = 0; i < 3; i++){
				(function(j){
					if(atacante_jogador.campo.front[j] != null){
						buffar(2, "HP", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "front", j);
					}
				}(i));
				(function(j){
					if(atacante_jogador.campo.back[j] != null){
						buffar(2, "HP", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, "back", j);
					}
				}(i));
			}
		}
		
		//arma atacante
		if(atacante.arma != null && atacante.arma.carta.id == 7 && alvo.carta.afinidade == "AGUA"){ //harpe
			danoF += 2;
		} else 
		if(atacante.arma != null && atacante.arma.carta.id == 9){ //cortius
			if(buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "HP") > buscaAtributo(atacante_jogador, atacante_line, atacante_slot, "HP")){
				danoF += 1;
			}				
		} else
		if(atacante.arma != null && atacante.arma.carta.id == 54){ //rule breaker
			alvo.efeitos[54] = true;
		} else 
		if(atacante.arma != null && atacante.arma.carta.id == 85){ //glacies
			alvo.efeitos[58] = true;
		} else 
		if(atacante.arma != null && atacante.arma.carta.id == 86){ //aura
			var dano_prot = buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "PROT");
			causarDanoVerdadeiro(dano_prot, atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
		}	
			
		
		//efeitos de crítico
		if(foiCritico){ 
			danoF = danoF * 2;
			escreveLog("O ataque foi um acerto crítico!", "a");
			
			if(atacante.arma != null && atacante.arma.carta.id == 8){ //harpe
				danoF += 2;
			}
			
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
			} else 
			if(atacante.carta.id == 60 && atacante.efeitos[54] != true){ //clarisse
				atacante.ataques_disponiveis += 1;
			}
		}		
		
		var alvo_hp_before = buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "HP");
		var alvo_def_before = buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "DEF");
		var alvo_res_before = buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "RES");
		
		if(atacante.carta.id == 59 && atacante.efeitos[54] != true && atacante.usouMagia > 0){ //alm archer
			var dano_causado = causarDanoMagico(danoF, atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot, "NEUTRO");
		} else {
			var dano_causado = causarDanoFisico(danoF, atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
		}
		
		//se o alvo morrer
		if(retornaCarta(alvo_jogador, alvo_line, alvo_slot) == null || buscaAtributo(alvo_jogador, alvo_line, alvo_slot, "HP") <= 0){
			if(atacante.carta.id == 2 && atacante.efeitos[54] != true){ //donnel			
				puxarCarta(atacante_jogador); 
				setTimeout(function(){puxarCarta(atacante_jogador);},400);			
			} else 
			if(atacante.carta.id == 29 && atacante.efeitos[54] != true){ //ryoma
				atacante.ataques_disponiveis += 1;			
			} else 
			if(atacante.carta.id == 64 && atacante.efeitos[54] != true){ //surtur
				buffar(alvo_def_before, "DEF", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, atacante_line, atacante_slot);
				buffar(alvo_res_before, "RES", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, atacante_line, atacante_slot);				
			}
			
			if(atacante.arma != null && atacante.arma.carta.id == 49){ //twirlix
				buffar(1, "FOR", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, atacante_line, atacante_slot);
			} else 
			if(atacante.arma != null && atacante.arma.carta.id == 84){ //gris
				buffar(3, "HP", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, atacante_line, atacante_slot);
			}
			
		//se o alvo não morrer
		} else { 
			if(atacante.carta.id == 38 && atacante.efeitos[54] != true){ //beruka
				buffar(-2, "DEF", atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
			} else
			if(atacante.carta.id == 41 && atacante.efeitos[54] != true){ //camilla
				if(alvo_hp_before < (alvo.carta.hp/2)){
					drawBuff(-999, alvo, "VIDA", false);
					destruirHeroi(alvo_jogador, alvo_line, alvo_slot);
				}
			} else 
			if(atacante.carta.id == 47 && atacante.efeitos[54] != true){ //fjorm
				buffar(-2, "DEF", atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
				buffar(-2, "RES", atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
			} else 
			if(atacante.carta.id == 65 && atacante.efeitos[54] != true){ //cordelia
				var debuff = -1;
				if(foiCritico){
					debuff = -2;
				}
				buffar(debuff, "FOR", atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
				buffar(debuff, "POD", atacante_jogador, atacante_line, atacante_slot, alvo_jogador, alvo_line, alvo_slot);
			} else 
			if(atacante.carta.id == 66 && atacante.efeitos[54] != true){ //corrin
				console.log('mudou pora luz');
				alvo.carta.afinidade = "LUZ";
			}
		}
		
		if(atacante.carta.id == 43 && atacante.efeitos[54] != true){ //charlotte
			buffar(dano_causado, "HP", atacante_jogador, atacante_line, atacante_slot, atacante_jogador, atacante_line, atacante_slot);
		} else 
		if(atacante.carta.id == 46 && atacante.efeitos[54] != true){ //berkut
			for(var i = 0; i < 3; i++){
				(function(j){
					if(alvo_jogador.campo.front[j] != null){
						causarDanoVerdadeiro(2, atacante_jogador, atacante_line, atacante_slot, alvo_jogador, "front", j);
					}
					if(alvo_jogador.campo.back[j] != null){
						causarDanoVerdadeiro(2, atacante_jogador, atacante_line, atacante_slot, alvo_jogador, "back", j);
					}				
				}(i));
			}
		} else 
		if(atacante.carta.id == 48 && atacante.efeitos[54] != true && atacante.arma == null){ //kagero
			setTimeout(function() { buscarNoDeck("ARMA", "ADAGA") },500);
		}
		
		if(atacante.arma != null && atacante.arma.carta.id == 90){ //ea
			for(var i = 0; i < 3; i++){
				(function(j){
					if(jogo.jogador2.campo.front[j] != null && jogo.jogador2.campo.front[j] != atacante){
						causarDanoVerdadeiro(2, atacante_jogador, atacante_line, atacante_slot, jogo.jogador2, "front", j);
					}
					if(jogo.jogador2.campo.back[j] != null && jogo.jogador2.campo.front[j] != atacante){
						causarDanoVerdadeiro(2, atacante_jogador, atacante_line, atacante_slot, jogo.jogador2, "back", j);
					}
					if(jogo.jogador1.campo.front[j] != null && jogo.jogador1.campo.front[j] != atacante){
						causarDanoVerdadeiro(2, atacante_jogador, atacante_line, atacante_slot, jogo.jogador1, "front", j);
					}
					if(jogo.jogador1.campo.back[j] != null && jogo.jogador1.campo.front[j] != atacante){
						causarDanoVerdadeiro(2, atacante_jogador, atacante_line, atacante_slot, jogo.jogador1, "back", j);
					}
				}(i));
			}
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