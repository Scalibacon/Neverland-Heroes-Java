//estados do jogador
var game_status = {
		ESPERANDO : 0,
		JOGANDO : 1,
		ESCOLHENDO : 2,
		OBSERVANDO : 3
}

//o jogo, ué
var jogo = {
		tipo : 0,
		turno : 0,
		iniciante : null,
		
		jogador1 : {
			jogador : null,
			baralho : [],
			mao : [],
			campo : {
				front : [null, null, null],
				back : [null, null, null]
			},			
			descarte : [],
			recarga : [],
			efeitos : [],
			estado : null
		},
		
		jogador2 : {
			jogador : null,
			baralho : [],
			mao : [],
			campo : {
				front : [null, null, null],
				back : [null, null, null]
			},
			descarte : [],
			recarga : [],	
			efeitos : [],
			estado : null
		}			
}

//posicao que as cartas devem estar nas lines
//left dentro da div (c/ offset = +135px) - armas x = +62px - y com base em bottom (jogador) /top (oponente)
var card_positions = {
		jogador_backline : [
			{x : 50,              y : 93},
			{x : 50 + 237,        y : 93},
			{x : 50 + 237 + 237,  y : 93}
		],
		jogador_frontline : [
			{x : 50,              y : 190},
			{x : 50 + 237,        y : 190},
			{x : 50 + 237 + 237,  y : 190}
		],
		
		oponente_backline : [
			{x : 50,              y : 93},
			{x : 50 + 237,        y : 93},
			{x : 50 + 237 + 237,  y : 93}
		],
		oponente_frontline : [
			{x : 50,              y : 190},
			{x : 50 + 237,        y : 190},
			{x : 50 + 237 + 237,  y : 190}
		],
		
		jogador_descarte :  {x : 10,          y : 10},
		oponente_descarte : {x : 230 + 10,    y : 10}, 
		
		jogador_recarga :  {x: 10,            y: 10 + (530 / 6) + 10},
		oponente_recarga : {x: 230 + 10,      y: 10 + (530 / 6) + 10},		
}

//pra verificar o que deve ser selecionado
var selecionando = {
		portador : null,
		usuario : null,
		alvo : null,
		line : null,
		opcao : null,
		baralho : null
}

//separa a quantidade de cartas em unidades e dá os atributos do jogo
var ctrlDivId = 2;
function separaCartas(cartas){
	for(var i = 0; i < cartas.length; i++){
		for(var j = 1; j < cartas[i].quantidade; j++){
			var carta = {carta : JSON.parse(JSON.stringify(cartas[i].carta)), quantidade : 1};
			carta = atribuiValores(carta);
			cartas.push(carta);			
		}
		cartas[i] = atribuiValores(cartas[i]);
	}
	return cartas;
}

var ctrlIdDiv = 0;
function atribuiValores(carta){
	carta.carta.dano_recebido = 0;
	carta.carta.mana_gasta = 0;
	carta.carta.critico = 1;
	carta.carta.esquiva = 1;
	carta.carta.protecao = 0;
	carta.quantidade = 1;
	carta.buff = {forca : 0, poder : 0, defesa : 0, resistencia : 0, critico : 0, esquiva : 0};
	carta.arma_buff = {forca : 0, poder : 0, defesa : 0, resistencia : 0, critico : 0, esquiva : 0};
	carta.arma = null;
	carta.efeitos = [];
	carta.usouMagia = 0;
	carta.foiAtacado = 0;
	carta.ataques_disponiveis = 1;
	recarregaMovimento(carta);
	carta.id_div = "ingame-card" + carta.carta.id + "-" + ctrlIdDiv;
	ctrlIdDiv++;
	return carta;
}

function recarregaMovimento(carta){
	if((carta.carta.id == 48 || carta.carta.id == 52 || carta.carta.id == 53)  && carta.efeitos[54] != true){
		carta.movimentos_disponiveis = 2;
	} else {
		carta.movimentos_disponiveis = 1;
	}
}

function buscaAtributo(jogador, line, slot, atributo){
	var carta = retornaCarta(jogador, line, slot);	
	
	var valor;
	switch(atributo){
		case "HP":
			valor = carta.carta.hp - carta.carta.dano_recebido;
			break;
		case "MANA":
			valor = carta.carta.mana - carta.carta.mana_gasta;
			break;
		case "PROT":
			valor = carta.carta.protecao;
			break;
		case "FOR":
			valor = carta.carta.forca + carta.buff.forca + carta.arma_buff.forca;			
			break;
		case "POD":
			valor = carta.carta.poder + carta.buff.poder + carta.arma_buff.poder;
			break;
		case "DEF":
			valor = carta.carta.defesa + carta.buff.defesa + carta.arma_buff.defesa;
			break;
		case "RES":
			valor = carta.carta.resistencia + carta.buff.resistencia + carta.arma_buff.resistencia;
			break;
		case "CRIT":
			valor = carta.carta.critico + carta.buff.critico + carta.arma_buff.critico;
			break;
		case "ESQ":
			valor = carta.carta.esquiva + carta.buff.esquiva + carta.arma_buff.esquiva;
			break;
	}
	
	//********************* Heróis
	if(carta.carta.id == 3 && atributo == "FOR" && carta.efeitos[54] != true){ //tobin
		var temAliado = false;
		for(var i = 0; i < 3; i++){
			if(retornaCarta(jogador, "front", i) != null && retornaCarta(jogador, "front", i) != carta){
				temAliado = true;
			}	
			if(retornaCarta(jogador, "back", i) != null && retornaCarta(jogador, "back", i) != carta){
				temAliado = true;
			}
		}
		if(temAliado){
			valor +=1;
		}			
	} else 
	if(carta.carta.id == 22 && carta.efeitos[54] != true && atributo == "FOR" && buscaAtributo(jogador, line, slot, "HP") < 5){ //barst
		valor += 2;
	}
	
	//celica
	if(atributo == "FOR"){
		var temCelica = false;
		for(var i = 0; i < 3; i++){
			var heroi_celica = retornaCarta(jogador, "front", i);
			if(heroi_celica != null && heroi_celica.carta.id == 34 && heroi_celica.efeitos[54] != true){
				temCelica = true;
			}	
			heroi_celica = retornaCarta(jogador, "back", i);
			if(heroi_celica != null && heroi_celica.carta.id == 34 && heroi_celica.efeitos[54] != true){
				temCelica = true;
			}	
		}
		if(temCelica){
			valor +=1;
		}	
	}
	
	if(valor < 0){
		valor = 0;
	}
	
	return valor;
}

function retornaCarta(jogador, line, slot){
	var carta = null;
	if(line == "front"){
		carta = jogador.campo.front[slot];
	} else {
		carta = jogador.campo.back[slot];
	}
	return carta;
}