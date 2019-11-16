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

function buscaFieldAlter(atributo){
	var valor = 0;
	
	return valor;
}

function efeitoMagia(magia, usuario_jogador, usuario_line, usuario_slot){
	if(usuario_line == "front"){
		var usuario = usuario_jogador.campo.front[usuario_slot];
	} else {
		var usuario = usuario_jogador.campo.back[usuario_slot];
	}
	
	switch(magia.carta.id){
		case 12:
			escreveLog('Selecione o alvo...', 'a');
			selecionando.alvo = false;
			interval_selecionando = setInterval(function(){
				if(selecionando.alvo){
					if(alvoValido(magia, usuario, selecionando.alvo)){
						pagarMana(magia, usuario);
						enviarPraRecarga(usuario_jogador, magia);
						escreveLog("Causou um daninho");
					}
					limparEscolha();
				}
			},100);
			
			break;
		case 16:
			pagarMana(magia, usuario);
			puxarCarta(usuario_jogador);
			enviarPraRecarga(usuario_jogador, magia);
			limparEscolha();
			break;
	}
}

function pagarMana(magia, usuario){
	usuario.carta.mana_gasta += magia.carta.custo;
}