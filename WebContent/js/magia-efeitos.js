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
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot, "FOGO");
													
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
			var prot = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");
			buffar(prot, "PROT", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot);
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
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot, "ÁGUA");			
						buffar(-1, "ESQ", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);				
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
			break;
			
		case 57: //núcleo sombrio
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var danoM = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");						
						pagarMana(magia, usuario);
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot, "TREVAS");			
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
			break;
			
		case 58: //armadilha de chamas
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var danoM = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");						
						pagarMana(magia, usuario);
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot, "FOGO");
						alvo.efeitos[58] = true;													
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
		
		case 91: //chuva torrencial
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			var dano = 1;
			var debuff = -2;
			if(usuario_jogador == jogo.jogador1){
				var jogador_alvo = jogo.jogador2;
			}else{
				var jogador_alvo = jogo.jogador1;
			}
			for(var i = 0; i < 3; i++){
				(function(j){
					if(jogador_alvo.campo.front[j] != null){
						causarDanoVerdadeiro(dano, usuario_jogador, usuario_line, usuario_slot, jogador_alvo, "front", j);
						setTimeout(function(){
							buffar(debuff, "ESQ", usuario_jogador, usuario_line, usuario_slot, jogador_alvo, "front", j);	
						},500);
					}
				}(i));
			}
			for(var i = 0; i < 3; i++){
				(function(j){
					if(jogador_alvo.campo.back[j] != null){
						causarDanoVerdadeiro(dano, usuario_jogador, usuario_line, usuario_slot, jogador_alvo, "back", j);
						setTimeout(function(){
							buffar(debuff, "ESQ", usuario_jogador, usuario_line, usuario_slot, jogador_alvo, "back", j);	
						},500);
					}
				}(i));
			}
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
		
		case 92: //tornado focalizado
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var danoM = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");						
						pagarMana(magia, usuario);
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot, "VENTO");													
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
		
		case 93: //bênção da natureza
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			var forca = 1;
			var poder = 1;
			for(var i = 0; i < 3; i++){
				(function(j){
					if(usuario_jogador.campo.front[j] != null){
						buffar(forca, "FOR", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "front", j);
						setTimeout(function(){
							buffar(poder, "POD", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "front", j);
						},500);
					}
				}(i));
			}
			for(var i = 0; i < 3; i++){
				(function(j){
					if(usuario_jogador.campo.back[j] != null){
						buffar(forca, "FOR", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "back", j);
						setTimeout(function(){
							buffar(poder, "POD", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "back", j);
						},500);
					}
				}(i));
			}
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
		
		case 94: //liberação do desespero
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			var cura = usuario.carta.dano_recebido;
			var forca = 2;
			var poder = 2;
			buffar(cura, "HP", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot);
			setTimeout(function(){ buffar(forca, "FOR", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot); },400);
			setTimeout(function(){ buffar(poder, "POD", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot); },800);
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
		
		case 95: //luz do julgamento
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);	
						var dano_prot = buscaAtributo(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot, "PROT");	
						var danoV = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");						
						pagarMana(magia, usuario);
						causarDanoVerdadeiro(dano_prot, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
						causarDanoVerdadeiro(danoV, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);								
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
		
		case 96: //armadura de magma
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			var cura = usuario.carta.dano_recebido;
			var defesa = 3;
			var resistencia = 3;
			buffar(defesa, "DEF", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot);
			setTimeout(function(){ buffar(resistencia, "RES", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, usuario_line, usuario_slot); },400);
			usuario.efeitos[96] = true;
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
		
		case 97: //fusão convergente
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						pagarMana(magia, usuario);
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var danoM = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");								
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot, "FOGO");
						buffar(-2, "DEF", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
						buffar(-2, "RES", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
		
		case 98: //escuridão sufocante
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						usuario.usouMagia += 1;
						pagarMana(magia, usuario);
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);					
						buffar(-1, "FOR", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);				
						buffar(-1, "POD", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);	
						buffar(-1, "DEF", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);	
						buffar(-1, "RES", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);	
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
			break;
			
		case 99: //bênção da dama do lago
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			buscarNoDeck("ARMA", "ALL");
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
		
		case 100: //fúria rudimentar
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						pagarMana(magia, usuario);
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var danoF = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");								
						causarDanoFisico(danoF, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
						buffar(-1, "DEF", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
		
		case 101: //fótons do santuário
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						pagarMana(magia, usuario);
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);								
						buffar(2, "DEF", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
						buffar(2, "RES", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
						buffar(2, "PROT", usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
		
		case 102: //coração de gaia
			pagarMana(magia, usuario);
			usuario.usouMagia += 1;
			for(var i = 0; i < 3; i++){
				if(usuario_jogador.campo.front[i] != null){
					buffar(2, "FOR", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "front", i);
					buffar(2, "POD", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "front", i);
					buffar(2, "DEF", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "front", i);
					buffar(2, "RES", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "front", i);
				}
				if(usuario_jogador.campo.back[i] != null){
					buffar(2, "FOR", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "back", i);
					buffar(2, "POD", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "back", i);
					buffar(2, "DEF", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "back", i);
					buffar(2, "RES", usuario_jogador, usuario_line, usuario_slot, usuario_jogador, "back", i);
				}
			}
			usuario_jogador.efeitos[102] = true;
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
		break;
		
		case 103: //sopro de hélios
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){					
					if(alvoMagiaValido(magia, usuario, selecionando.alvo)){	
						pagarMana(magia, usuario);
						usuario.usouMagia += 1;
						var alvo = retornaCarta(selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot);						
						var danoM = buscaAtributo(usuario_jogador, usuario_line, usuario_slot, "POD");								
						causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, selecionando.alvo.jogador, selecionando.alvo.line, selecionando.alvo.slot, "VENTO");
						
						if(selecionando.alvo.jogador == jogo.jogador1){
							var jogador_alvo = jogo.jogador1;
						}else{
							var jogador_alvo = jogo.jogador2;
						}
						
						danoM = ((danoM/2) | 0);
						for(var i = 0; i < 3; i++){
							if(jogador_alvo.campo.front[i] != null){
								(function(j){ 
									setTimeout(function(){ causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, jogador_alvo, "front", j, "VENTO"); },1200); 
								}(i));
							}
							if(jogador_alvo.campo.back[i] != null){
								(function(j){ 
									setTimeout(function(){ causarDanoMagico(danoM, usuario_jogador, usuario_line, usuario_slot, jogador_alvo, "back", j, "VENTO"); },1200); 
								}(i));
							}
						}						
						enviarPraRecarga(usuario_jogador, magia);						
					}
					limparEscolha();
				}
			},100);			
		break;
		
		//falta a 56
	}
}

function pagarMana(magia, usuario){
	usuario.carta.mana_gasta += magia.carta.custo;
	drawManaPay(magia.carta.custo, usuario);
}