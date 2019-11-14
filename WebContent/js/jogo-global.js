//estados do jogador
var gameStatus = {
		ESPERANDO : 0,
		JOGANDO : 1,
		ESCOLHENDO : 2,
		OBSERVANDO : 3
}

//o jogo, ué
var jogo = {
		tipo : 0,
		turno : 0,
		estado : gameStatus.ESPERANDO,
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
			efeitos : []
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
			efeitos : []
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
		opcao : null
}

//separa a quantidade de cartas em unidades e dá os atributos do jogo
function separaCartas(cartas){
	for(var i = 0; i < cartas.length; i++){
		for(var j = 1; j < cartas[i].quantidade; j++){
			var carta = {carta : cartas[i].carta, quantidade : 1};
			cartas.push(carta);			
		}
		atribuiValores(cartas[i]);
	}
	return cartas;
}

function atribuiValores(carta){
	carta.quantidade = 1;
	carta.buffs = [];
	carta.debuff = [];
	carta.arma = null;
	carta.usouMagia = 0;
	carta.ataques_disponiveis = 1;
	carta.movimentos_disponiveis = 1;
	carta.id_div = null;
	return carta;
}