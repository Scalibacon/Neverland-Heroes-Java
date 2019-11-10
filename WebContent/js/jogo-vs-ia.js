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
				front : [],
				back : []
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
				front : [],
				back : []
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
			carregaTelaInicial(true);
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
		cartas[i].moveu = 0;
		cartas[i].div = null;
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

function startGame(isVsIA){	
	jogo.estado = gameStatus.ESPERANDO;
	
	var delay = 500;	
	
	escolhePrimeiroJogador(isVsIA);
	
	puxarCartasIniciais(jogo.jogador1);
	puxarCartasIniciais(jogo.jogador2);
	
	setTimeout(function(){
		iniciaTurno(jogo.iniciante);		
	}, 1000 + 200);	
	
	if(jogo.iniciante == jogo.jogador1.jogador.id){
		jogo.estado = gameStatus.JOGANDO;
	} else {
		jogo.estado = gameStatus.OBSERVANDO;	
}

function iniciaTurno(jogador){
	if(jogador == jogo.jogador1){
		jogo.estado = gameStatus.JOGANDO;		
	} else {
		jogo.estado = gameStatus.OBSERVANDO;
	}
	
	if(jogo.turno == 0){
		chamarCampeao(jogador);
	}
}
	
function escolhePrimeiroJogador(isVsIA){
	if(isVsIA){
		if(jogo.jogador1.baralho.campeao.carta.rank > jogo.jogador2.baralho.campeao.carta.rank){
			jogo.iniciante = jogo.jogador1;
		} else 
		if(jogo.jogador2.baralho.campeao.carta.rank > jogo.jogador1.baralho.campeao.carta.rank){
			jogo.iniciante = jogo.jogador2;
		} else 
		if(jogo.jogador1.jogador.nivel < jogo.jogador2.jogador.nivel){
			jogo.iniciante = jogo.jogador1;
		} else {
			jogo.iniciante = jogo.jogador2;
		}
	} else {
		alert('contra jogador :(');
	}
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
	chamarHeroi(jogador, jogador.baralho.campeao, "front", true);
}

function chamarHeroi(jogador, heroi, line, isTheChampion){
	if(moverHeroi(jogador, heroi, line)){
		if(!isTheChampion){
			removerCartaDaMao(jogador, heroi);
		}
		efeitoDeInvocacao(heroi);		
	}
}

function removerCartaDaMao(jogador, carta){
	for(var i = 0; i < jogador.mao.length; i++){
		if(jogador.mao[i] == carta){
			if(jogador == jogo.jogador1){
				document.getElementById('inside-card-hand-jogador').removeChild(carta.div);
			}
		}
	}
}

function moverHeroi(jogador, heroi, line){
	var slot = -1;
	if(line == "front"){
		if(jogador.campo.front[1] == null || jogador.campo.front[1] == undefined){
			jogador.campo.front[1] = heroi;
			slot = 1;
		} else if(jogador.campo.front[2] == null || jogador.campo.front[2] == undefined){
			jogador.campo.front[2] = heroi;
			slot = 2;
		} else if(jogador.campo.front[0] == null || jogador.campo.front[0] == undefined){
			jogador.campo.front[0] = heroi;
			slot = 0;
		}
	} else {
		if(jogador.campo.back[1] == null || jogador.campo.back[1] == undefined){
			jogador.campo.back[1] = heroi;
			slot = 1;
		} else if(jogador.campo.back[2] == null || jogador.campo.back[2] == undefined){
			jogador.campo.back[2] = heroi;
			slot = 2;
		} else if(jogador.campo.back[0] == null || jogador.campo.back[0] == undefined){
			jogador.campo.back[0] = heroi;
			slot = 0;
		}
	}
	
	if(slot > -1){
		drawPosicionarHeroi(jogador, heroi, line, slot);
		return true;
	} else {
		return false;
	}
}

function passarTurno(){
	alert('passou o turno');
}

function desistir(){
	alert("desistiu!");
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

function causarDanoMagico(){
	
}

function causarDanoFisico(){
	
}

function retornarPraMao(){
	
}

function equiparHeroi(){
	
}


