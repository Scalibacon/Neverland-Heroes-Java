
var jogador;
function startVsIa(){
	$.ajax({
		url : 'buscaBaralhoServlet',
		type : 'post',
		success : function(data) {
			jogador = JSON.parse(data);
			jogo.jogador1 = jogador.jogador;
			jogo.baralho1 = jogador.baralho;
			
			jogo.jogador2 = oponente;
			jogo.baralho2 = oponente.baralho;
			carregaTelaInicial();
		},
		error : function() {
			alert('Erro ao pegar as suas cartas');
		}
	});	
}

function carregaTelaInicial(){
	document.getElementById('container-choose-game').style.width = "0px";
	document.getElementById('container-choose-game').style.height = "580px";
	
	document.getElementById('info1').innerHTML = "<img src='img/icons/" + jogo.jogador1.icone + ".jpg' class='player-icon' id='icon1'>" +
			jogo.jogador1.usuario + "<br>" +
			"Lvl " + jogo.jogador1.nivel;
	
	document.getElementById('info2').innerHTML = "<img src='img/oponentes/oponente" + jogo.jogador2.id + ".jpg' class='player-icon' id='icon1'>" +
	jogo.jogador2.nome + "<br>" +
	"Lvl " + jogo.jogador2.nivel;
	
	setTimeout(function(){
		document.getElementById('container-choose-game').style.display = "none";
		document.getElementById('game-container').style.opacity = "1";
		document.getElementById('game-container').style.width = "1200px";
		
	},700);
}

var jogo = {
		jogador1 : null,
		baralho1 : [],
		mao1 : [],
		campo1: {
			frente : [],
			tras : []
		},
		descarte1 : [],
		recarga1 : [],
		//--------------
		jogador2 : null,
		baralho2 : [],
		mao2 : [],
		campo2: {
			frente : [],
			tras : []
		},
		descarte2 : [],
		recarga2 : []
}