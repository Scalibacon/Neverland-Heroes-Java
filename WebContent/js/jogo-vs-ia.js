var gameStatus = {
		ESPERANDO : 0,
		JOGANDO : 1,
		ESCOLHENDO : 2,
		OBSERVANDO : 3
}

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
				frente : [],
				tras : []
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
				frente : [],
				tras : []
			},
			descarte : [],
			recarga : [],	
			efeitos : []
		}		
		
}

function startVsIa(){
	$.ajax({
		url : 'buscaBaralhoServlet',
		type : 'post',
		success : function(data) {
			var jogador = JSON.parse(data);			
			jogo.jogador1.jogador = jogador.jogador;			
			jogo.jogador1.baralho = {campeao : jogador.campeao, cartas : shuffle(separaCartas(jogador.cartas))};
			
			jogo.jogador2.jogador = oponente;
			jogo.jogador2.baralho = {campeao : oponente.baralho.campeao, cartas : shuffle(separaCartas(oponente.baralho.cartas))};
			
			jogo.tipo = 0;
			jogo.iniciante = jogador.jogador.id;
			carregaTelaInicial();
		},
		error : function() {
			alert('Erro ao pegar as suas cartas');
		}
	});	
}

function separaCartas(cartas){
	for(var i = 0; i < cartas.length; i++){
		for(var j = 1; j < cartas[i].quantidade; j++){
			var carta = {carta : cartas[i].carta, quantidade : 1};
			cartas.push(carta);			
		}
		cartas[i].quantidade = 1;
		cartas[i].buffs = [];
		cartas[i].debuff = [];
		cartas[i].arma = null;
		cartas[i].usouMagia = 0;
		cartas[i].atacou = 0;
	}
	return cartas;
}

function shuffle(cartas) {
	var indexAtual = cartas.length, aux, indexAleatorio;

	// While there remain elements to shuffle...
	while (indexAtual !== 0) {
	    // Pick a remaining element...
	    indexAleatorio = Math.floor(Math.random() * indexAtual);
	    indexAtual -= 1;
	
	    // And swap it with the current element.
	    aux = cartas[indexAtual];
	    cartas[indexAtual] = cartas[indexAleatorio];
	    cartas[indexAleatorio] = aux;
	}
	return cartas;
}

//*************** pseudo interfaces *************

function startGame(){	
	jogo.estado = gameStatus.ESPERANDO;
	
	var delay = 500;	
	
	puxarCartasIniciais(jogo.jogador1);
	puxarCartasIniciais(jogo.jogador2);
	
	setTimeout(function(){
		chamarCampeao(jogo.jogador1);
		chamarCampeao(jogo.jogador2);
	}, 1000 + 200);
	
	
	if(jogo.iniciante == jogo.jogador1.jogador.id){
		jogo.estado = gameStatus.JOGANDO;
	} else {
		jogo.estado = gameStatus.OBSERVANDO;	
}

function puxarCartasIniciais(jogador){
	for(var i = 0; i < 5; i++){
		setTimeout(function(){
			delay = puxarCarta(jogador);
		}, i * 200);
	}};
	return 800;
}

function puxarCarta(jogador){
	if(jogador.baralho.cartas.length > 0){
		var delay;
		var aux;
		jogo.estado = gameStatus.ESPERANDO;	
		
		aux = jogador.baralho.cartas[0];
		jogador.mao.push(aux);
		jogador.baralho.cartas.splice(0,1);
		
		delay = drawPuxarCarta(jogador, aux);
		return delay;
	}
	return 0;
}

function chamarCampeao(jogador){	
	chamarHeroi(jogador, jogador.baralho.campeao, "front");
}

function chamarHeroi(jogador, heroi, line){
	var slot = -1;
	if(line == "front"){
		if(jogador.campo.frente[1] == null || jogador.campo.frente[1] == undefined){
			jogador.campo.frente[1] = heroi;
			slot = 1;
		} else if(jogador.campo.frente[2] == null || jogador.campo.frente[2] == undefined){
			jogador.campo.frente[2] = heroi;
			slot = 2;
		} else if(jogador.campo.frente[0] == null || jogador.campo.frente[0] == undefined){
			jogador.campo.frente[0] = heroi;
			slot = 0;
		}
	} else {
		
	}
	
	if(slot > -1){
		drawPosicionarHeroi(jogador, heroi, line, slot);
	}
}

function escolherUsuario(){
	
}

function escolherAlvo(){
	
}

function destruirHeroi(){
	
}

function usarMagia(){
	
}

function usarPostura(){
	
}

function usarConsumivel(){
	
}

function atacar(){
	
}

function moverHeroi(){
	
}

function causarDanoMagico(){
	
}

function causarDanoFisico(){
	
}

function retornarPraMao(){
	
}

function equiparHeroi(){
	
}


